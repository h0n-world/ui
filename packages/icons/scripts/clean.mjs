import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const distDir = resolve(packageRoot, 'dist');

if (dirname(distDir) !== packageRoot || !distDir.endsWith('dist')) {
  throw new Error(`Refusing to clean unexpected path: ${distDir}`);
}

await rm(distDir, { recursive: true, force: true });

