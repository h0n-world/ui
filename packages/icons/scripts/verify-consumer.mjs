import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
execFileSync(
  process.execPath,
  [resolve(packageRoot, 'node_modules/typescript/bin/tsc'), '-p', resolve(packageRoot, 'test-consumer/tsconfig.json')],
  { stdio: 'inherit' },
);

const root = await import('@h0nio/icons');
const runtime = await import('@h0nio/icons/runtime');
const catalog = await import('@h0nio/icons/catalog');
const all = await import('@h0nio/icons/all');
const selected = await import('@h0nio/icons/accessibility-duotone');
const rawSvgUrl = import.meta.resolve('@h0nio/icons/svg/accessibility-duotone');

assert.deepEqual(Object.keys(root).sort(), ['iconToDataUri', 'renderIcon']);
assert.equal(root.renderIcon, runtime.renderIcon);
assert.equal(selected.default.name, 'accessibility-duotone');
assert.equal(all.icons['accessibility-duotone'], selected.default);
assert.equal(Object.keys(all.icons).length, Object.keys(catalog.iconCatalog).length);
assert.equal(existsSync(fileURLToPath(rawSvgUrl)), true);
assert.match(root.renderIcon(selected.default), /^<svg\b/);
assert.match(root.iconToDataUri(selected.default), /^data:image\/svg\+xml,/);

console.log(
  `PASS consumer exports and TypeScript fixture: lightweight root, individual icon, catalog, all registry, and raw SVG (${Object.keys(all.icons).length} icons).`,
);
