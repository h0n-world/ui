import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

execFileSync(process.execPath, [resolve(import.meta.dirname, 'generate.mjs'), '--check'], {
  stdio: 'inherit',
});
