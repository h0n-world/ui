import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const target = resolve(packageRoot, 'svg');
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(resolve(packageRoot, 'src/svg'), target, { recursive: true });
