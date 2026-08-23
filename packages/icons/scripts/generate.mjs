import { mkdir, readFile, readdir, rm, writeFile as writeFileOnce } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { optimize } from 'svgo';

const packageRoot = resolve(import.meta.dirname, '..');
const svgDir = resolve(packageRoot, 'src/svg');
const iconsDir = resolve(packageRoot, 'src/icons');
const metadataPath = resolve(packageRoot, 'src/metadata.json');

const pascalCase = (value) =>
  value
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');

const exportIdentifier = (name) => {
  const identifier = `${pascalCase(name)}Icon`;
  return /^\d/.test(identifier) ? `Number${identifier}` : identifier;
};

const unique = (values) => new Set(values).size === values.length;
const retryableWriteErrors = new Set(['UNKNOWN', 'EBUSY', 'EPERM']);

async function writeFile(path, data) {
  const attempts = 8;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      await writeFileOnce(path, data);
      return;
    } catch (error) {
      if (!retryableWriteErrors.has(error.code) || attempt === attempts - 1) throw error;
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 25 * 2 ** attempt));
    }
  }
}
const files = (await readdir(svgDir)).filter((file) => file.endsWith('.svg')).sort();
const names = files.map((file) => basename(file, '.svg'));
const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
const metadataNames = Object.keys(metadata.icons ?? {}).sort();

const missing = names.filter((name) => !metadataNames.includes(name));
const unknown = metadataNames.filter((name) => !names.includes(name));

if (missing.length > 0 || unknown.length > 0) {
  throw new Error(
    `Icon metadata mismatch. Missing: ${missing.join(', ') || 'none'}. Unknown: ${
      unknown.join(', ') || 'none'
    }.`,
  );
}

if (!Array.isArray(metadata.styles) || !unique(metadata.styles)) {
  throw new Error('Metadata styles must be a unique array.');
}
if (!Array.isArray(metadata.categories) || !unique(metadata.categories)) {
  throw new Error('Metadata categories must be a unique array.');
}

for (const name of names) {
  const entry = metadata.icons[name];
  if (!metadata.styles.includes(entry.style)) {
    throw new Error(`${name}: unknown style "${entry.style}".`);
  }
  if (
    !Array.isArray(entry.categories) ||
    entry.categories.length === 0 ||
    !unique(entry.categories)
  ) {
    throw new Error(`${name}: categories must be a non-empty unique array.`);
  }
  if (entry.categories.some((category) => !metadata.categories.includes(category))) {
    throw new Error(`${name}: contains an unknown category.`);
  }
  if (!Array.isArray(entry.tags) || !unique(entry.tags)) {
    throw new Error(`${name}: tags must be a unique array.`);
  }
  if (entry.tags.some((tag) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag))) {
    throw new Error(`${name}: tags must use lowercase kebab-case.`);
  }
}

await rm(iconsDir, { recursive: true, force: true });
await mkdir(iconsDir, { recursive: true });

const exports = [];
const imports = [];
const registry = [];

for (const file of files) {
  const name = basename(file, '.svg');
  const identifier = exportIdentifier(name);
  const source = await readFile(resolve(svgDir, file), 'utf8');
  const result = optimize(source, {
    path: file,
    multipass: true,
    plugins: [
      'preset-default',
      'removeDimensions',
      { name: 'removeAttrs', params: { attrs: 'svg:(width|height)' } },
    ],
  });
  const optimized = result.data.replace(/>\s+</g, '><').trim();
  const root = optimized.match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>$/);
  const viewBox = root?.[1].match(/\bviewBox="([^"]+)"/)?.[1];
  if (!root || !viewBox) throw new Error(`${file}: optimized SVG must have a viewBox`);

  const module = `import type { IconDefinition } from '../types.js';\n\nexport const ${identifier} = ${JSON.stringify({ name, viewBox, body: root[2] })} as const satisfies IconDefinition;\nexport default ${identifier};\n`;
  await writeFile(resolve(iconsDir, `${name}.ts`), module);
  await writeFile(resolve(svgDir, file), `${optimized}\n`);
  imports.push(`import { ${identifier} } from './icons/${name}.js';`);
  exports.push(`export { ${identifier} } from './icons/${name}.js';`);
  registry.push(`  ${JSON.stringify(name)}: ${identifier},`);
}

const iconNameUnion = names.map((name) => JSON.stringify(name)).join(' | ');
const index = `import type { IconDefinition } from './types.js';\n${imports.join('\n')}\n\nexport { iconToDataUri, renderIcon } from './runtime.js';\nexport type { IconCategory, IconDefinition, IconMetadata, IconStyle, RenderIconOptions } from './types.js';\n${exports.join('\n')}\n\nexport type IconName = ${iconNameUnion};\n\nexport const icons: Record<IconName, IconDefinition> = {\n${registry.join('\n')}\n};\n`;
const catalog = `import type { IconMetadata } from './types.js';\n\nexport const iconStyles = ${JSON.stringify(metadata.styles)} as const;\nexport const iconCategories = ${JSON.stringify(metadata.categories)} as const;\n\nexport type CatalogIconName = ${iconNameUnion};\n\nexport const iconCatalog: Record<CatalogIconName, IconMetadata> = ${JSON.stringify(metadata.icons)};\n\nexport type { IconCategory, IconMetadata, IconStyle } from './types.js';\n`;

await writeFile(resolve(packageRoot, 'src/index.ts'), index);
await writeFile(resolve(packageRoot, 'src/catalog.ts'), catalog);
await writeFile(
  resolve(packageRoot, 'src/manifest.json'),
  `${JSON.stringify(metadata, null, 2)}\n`,
);

console.log(
  `Generated ${files.length} icon modules across ${metadata.styles.length} styles and ${metadata.categories.length} categories.`,
);
