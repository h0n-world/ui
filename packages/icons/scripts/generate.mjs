import { mkdir, readFile, readdir, rm, writeFile as writeFileOnce } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { optimize } from 'svgo';

const packageRoot = resolve(import.meta.dirname, '..');
const svgDir = resolve(packageRoot, 'src/svg');
const iconsDir = resolve(packageRoot, 'src/icons');
const publishedSvgDir = resolve(packageRoot, 'svg');
const metadataPath = resolve(packageRoot, 'src/metadata.json');
const namingExceptionsPath = resolve(packageRoot, 'src/naming-exceptions.json');
const checkMode = process.argv.includes('--check');

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
const presentationAttributes = new Set([
  'fill',
  'fill-rule',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'clip-rule',
  'opacity',
]);

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

function prefixLocalIds(svg, name, file) {
  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  if (!unique(ids)) throw new Error(`${file}: SVG ids must be unique.`);

  const references = [
    ...svg.matchAll(/url\(#([^)]+)\)/g),
    ...svg.matchAll(/(?:href|xlink:href)="#([^"]+)"/g),
  ].map((match) => match[1]);
  const missingReferences = references.filter((reference) => !ids.includes(reference));
  if (missingReferences.length > 0) {
    throw new Error(
      `${file}: references missing local ids: ${[...new Set(missingReferences)].join(', ')}.`,
    );
  }

  const replacements = new Map(ids.map((id, index) => [id, `${name}-${index + 1}`]));
  return svg
    .replace(/\bid="([^"]+)"/g, (_match, id) => `id="${replacements.get(id)}"`)
    .replace(/url\(#([^)]+)\)/g, (_match, id) => `url(#${replacements.get(id)})`)
    .replace(/(href|xlink:href)="#([^"]+)"/g, (_match, attribute, id) => {
      return `${attribute}="#${replacements.get(id)}"`;
    });
}

function preserveRootPresentation(attributes, body) {
  const preserved = [...attributes.matchAll(/\s([a-z-]+)="([^"]*)"/g)]
    .filter((match) => presentationAttributes.has(match[1]))
    .map((match) => `${match[1]}=${JSON.stringify(match[2])}`)
    .join(' ');
  return preserved ? `<g ${preserved}>${body}</g>` : body;
}

async function assertContents(path, expected, label) {
  let actual;
  try {
    actual = await readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') throw new Error(`${label} is missing. Run pnpm generate.`);
    throw error;
  }
  if (actual !== expected) throw new Error(`${label} is stale. Run pnpm generate.`);
}

async function assertExactFileNames(directory, expectedNames, suffix, label) {
  const actualNames = (await readdir(directory))
    .filter((file) => file.endsWith(suffix))
    .sort();
  if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
    throw new Error(`${label} contains missing or stale files. Run pnpm generate.`);
  }
}
const files = (await readdir(svgDir)).filter((file) => file.endsWith('.svg')).sort();
const names = files.map((file) => basename(file, '.svg'));
const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
const namingExceptions = JSON.parse(await readFile(namingExceptionsPath, 'utf8'));
const metadataNames = Object.keys(metadata.icons ?? {}).sort();

if (namingExceptions.policy !== 'preserve-source-identifiers') {
  throw new Error(`Unsupported naming policy: ${namingExceptions.policy}.`);
}
for (const [legacyPattern, correctedPattern] of Object.entries(namingExceptions.patterns ?? {})) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(legacyPattern)) {
    throw new Error(`Invalid legacy naming pattern: ${legacyPattern}.`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(correctedPattern)) {
    throw new Error(`Invalid corrected naming pattern: ${correctedPattern}.`);
  }
  const matchingNames = metadataNames.filter((name) => name.includes(legacyPattern));
  if (matchingNames.length === 0) {
    throw new Error(`Naming exception does not match an icon: ${legacyPattern}.`);
  }
  for (const name of matchingNames) {
    metadata.icons[name].tags = [...new Set([...metadata.icons[name].tags, correctedPattern])];
  }
}

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

if (!checkMode) {
  await rm(iconsDir, { recursive: true, force: true });
  await rm(publishedSvgDir, { recursive: true, force: true });
  await mkdir(iconsDir, { recursive: true });
  await mkdir(publishedSvgDir, { recursive: true });
}

const exports = [];
const imports = [];
const registry = [];
const expectedIconModules = new Map();
const expectedSvgFiles = new Map();

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
  const optimized = prefixLocalIds(result.data.replace(/>\s+</g, '><').trim(), name, file);
  const root = optimized.match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>$/);
  const viewBox = root?.[1].match(/\bviewBox="([^"]+)"/)?.[1];
  if (!root || !viewBox) throw new Error(`${file}: optimized SVG must have a viewBox`);

  const body = preserveRootPresentation(root[1], root[2]).replace(/\r\n?/g, '\n');
  const module = `import type { IconDefinition } from '../types.js';\n\nexport const ${identifier}: IconDefinition = ${JSON.stringify({ name, viewBox, body })};\nexport default ${identifier};\n`;
  const svg = `${optimized}\n`;
  expectedIconModules.set(`${name}.ts`, module);
  expectedSvgFiles.set(file, svg);
  if (!checkMode) {
    await writeFile(resolve(iconsDir, `${name}.ts`), module);
    await writeFile(resolve(svgDir, file), svg);
    await writeFile(resolve(publishedSvgDir, file), svg);
  }
  imports.push(`import { ${identifier} } from './icons/${name}.js';`);
  exports.push(`export { ${identifier} } from './icons/${name}.js';`);
  registry.push(`  ${JSON.stringify(name)}: ${identifier},`);
}

const iconNameUnion = names.map((name) => JSON.stringify(name)).join(' | ');
const index = `export { iconToDataUri, renderIcon } from './runtime.js';\nexport type { IconName } from './names.js';\nexport type { IconCategory, IconDefinition, IconMetadata, IconStyle, RenderIconOptions } from './types.js';\n`;
const all = `import type { IconDefinition } from './types.js';\nimport type { IconName } from './names.js';\n${imports.join('\n')}\n\n${exports.join('\n')}\n\nexport const icons: Record<IconName, IconDefinition> = {\n${registry.join('\n')}\n};\n\nexport type { IconName } from './names.js';\nexport type { IconDefinition } from './types.js';\n`;
const namesModule = `export type IconName = ${iconNameUnion};\n`;
const catalog = `import type { IconName } from './names.js';\nimport type { IconMetadata } from './types.js';\n\nexport const iconStyles = ${JSON.stringify(metadata.styles)} as const;\nexport const iconCategories = ${JSON.stringify(metadata.categories)} as const;\n\nexport type CatalogIconName = IconName;\n\nexport const iconCatalog: Record<IconName, IconMetadata> = ${JSON.stringify(metadata.icons)};\n\nexport type { IconName } from './names.js';\nexport type { IconCategory, IconMetadata, IconStyle } from './types.js';\n`;

const generatedEntries = new Map([
  ['src/index.ts', index],
  ['src/all.ts', all],
  ['src/names.ts', namesModule],
  ['src/catalog.ts', catalog],
  ['src/manifest.json', `${JSON.stringify(metadata, null, 2)}\n`],
]);

if (checkMode) {
  await assertExactFileNames(iconsDir, [...expectedIconModules.keys()].sort(), '.ts', 'src/icons');
  await assertExactFileNames(publishedSvgDir, files, '.svg', 'svg');
  for (const [file, expected] of expectedIconModules) {
    await assertContents(resolve(iconsDir, file), expected, `src/icons/${file}`);
  }
  for (const [file, expected] of expectedSvgFiles) {
    await assertContents(resolve(svgDir, file), expected, `src/svg/${file}`);
    await assertContents(resolve(publishedSvgDir, file), expected, `svg/${file}`);
  }
  for (const [file, expected] of generatedEntries) {
    await assertContents(resolve(packageRoot, file), expected, file);
  }
} else {
  for (const [file, expected] of generatedEntries) {
    await writeFile(resolve(packageRoot, file), expected);
  }
}

console.log(
  `${checkMode ? 'Validated' : 'Generated'} ${files.length} icon modules across ${metadata.styles.length} styles and ${metadata.categories.length} categories.`,
);
