import { readFile, readdir } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const svgNames = (await readdir(resolve(packageRoot, 'src/svg')))
  .filter((file) => file.endsWith('.svg'))
  .map((file) => basename(file, '.svg'))
  .sort();
const moduleNames = (await readdir(resolve(packageRoot, 'src/icons')))
  .filter((file) => file.endsWith('.ts'))
  .map((file) => basename(file, '.ts'))
  .sort();
const metadata = JSON.parse(await readFile(resolve(packageRoot, 'src/metadata.json'), 'utf8'));
const manifest = JSON.parse(await readFile(resolve(packageRoot, 'src/manifest.json'), 'utf8'));

if (JSON.stringify(svgNames) !== JSON.stringify(moduleNames)) {
  throw new Error('Generated icon modules are stale. Run pnpm generate.');
}
if (JSON.stringify(svgNames) !== JSON.stringify(Object.keys(manifest.icons).sort())) {
  throw new Error('Generated manifest is stale. Run pnpm generate.');
}
if (JSON.stringify(metadata) !== JSON.stringify(manifest)) {
  throw new Error('Generated manifest does not match metadata.json. Run pnpm generate.');
}
console.log(
  `Validated ${svgNames.length} icons, ${manifest.styles.length} styles, and ${manifest.categories.length} categories.`,
);
