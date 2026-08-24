import { access, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, relative, resolve } from 'node:path';
import { assertPathInside, resolveImportSource } from './import-source.mjs';

const packageRoot = resolve(import.meta.dirname, '..');
const sourceDir = await resolveImportSource();
const svgDir = resolve(packageRoot, 'src/svg');
const metadataPath = resolve(packageRoot, 'src/metadata.json');

const categoryByDirectory = {
  Arrows: 'actions',
  'Arrows Action': 'actions',
  Astronomy: 'astronomy',
  'Building, Infrastructure': 'infrastructure',
  'Business, Statistic': 'analytics',
  Call: 'communication',
  'Design, Tools': 'design',
  'Electronic, Devices': 'devices',
  'Essentional, UI': 'interface',
  'Faces, Emotions, Stickers': 'social',
  Files: 'data',
  Folders: 'data',
  'Food, Kitchen': 'food',
  Hands: 'social',
  'Home, Furniture': 'home',
  Like: 'social',
  List: 'productivity',
  'Map & Location': 'maps',
  Medicine: 'medical',
  'Messages, Conversation': 'communication',
  Money: 'finance',
  'Nature, Travel': 'travel',
  'Network, IT, Programming': 'development',
  Notes: 'productivity',
  Notifications: 'notifications',
  School: 'education',
  Search: 'interface',
  Security: 'security',
  'Settings, Fine Tuning': 'settings',
  'Shopping, Ecommerce': 'commerce',
  Sports: 'sports',
  'Text Formatting': 'text-editing',
  Time: 'time',
  'Transport, Parts, Service': 'transport',
  Users: 'users',
  'Video, Audio, Sound': 'media',
  Weather: 'weather',
};

const slugify = (value) =>
  value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function collectSvgFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectSvgFiles(path)));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.svg')) files.push(path);
  }
  return files.sort();
}

const sourceFiles = await collectSvgFiles(sourceDir);
const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
const sourceItems = sourceFiles.map((sourcePath) => {
  const sourceName = basename(sourcePath, '.svg');
  const baseName = slugify(sourceName);
  const directory = basename(dirname(sourcePath));
  const category = categoryByDirectory[directory];
  if (!category) throw new Error(`${relative(sourceDir, sourcePath)}: unmapped source directory.`);
  return { sourcePath, sourceName, baseName, category };
});

const duplicateBaseNames = new Set(
  sourceItems
    .map(({ baseName }) => baseName)
    .filter((name, index, names) => names.indexOf(name) !== index),
);
const imports = sourceItems.map((item) => ({
  ...item,
  name: duplicateBaseNames.has(item.baseName)
    ? `${item.category}-${item.baseName}-stroke`
    : `${item.baseName}-stroke`,
}));
const duplicateTargets = imports
  .map(({ name }) => name)
  .filter((name, index, names) => names.indexOf(name) !== index);
if (duplicateTargets.length > 0) {
  throw new Error(`Duplicate target names: ${[...new Set(duplicateTargets)].join(', ')}.`);
}

for (const category of new Set(Object.values(categoryByDirectory))) {
  if (!metadata.categories.includes(category)) metadata.categories.push(category);
}
metadata.categories.sort();

const migrated = [];
for (const item of imports) {
  let svg = await readFile(item.sourcePath, 'utf8');
  const root = svg.match(/^\s*<svg\b([^>]*)>/i);
  if (!root || !/\bviewBox="[^"]+"/i.test(root[1])) {
    throw new Error(`${relative(sourceDir, item.sourcePath)}: SVG must have a viewBox.`);
  }

  const normalizedRoot = root[0].replace(/\s+(?:width|height)="[^"]*"/gi, '');
  svg = svg
    .replace(root[0], normalizedRoot)
    .replace(/(fill|stroke)="(?!none|currentColor)[^"]+"/gi, '$1="currentColor"')
    .trim();

  await writeFile(resolve(svgDir, `${item.name}.svg`), `${svg}\n`);
  metadata.icons[item.name] = {
    style: 'stroke',
    categories: [item.category],
    tags: [...new Set(slugify(item.sourceName).split('-'))],
  };

  if (!duplicateBaseNames.has(item.baseName) && metadata.icons[item.baseName]?.style === 'stroke') {
    const legacyPath = resolve(svgDir, `${item.baseName}.svg`);
    assertPathInside(svgDir, legacyPath, 'legacy');
    try {
      await access(legacyPath);
      await rm(legacyPath);
      migrated.push(`${item.baseName} -> ${item.name}`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    delete metadata.icons[item.baseName];
  }
}

metadata.icons = Object.fromEntries(
  Object.entries(metadata.icons).sort(([left], [right]) => left.localeCompare(right)),
);
await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);

console.log(`Imported ${imports.length} stroke SVG icons.`);
console.log(
  `Disambiguated ${duplicateBaseNames.size} duplicate base names with category prefixes.`,
);
console.log(`Migrated ${migrated.length} legacy stroke names: ${migrated.join(', ') || 'none'}.`);
