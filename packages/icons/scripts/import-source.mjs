import { access, stat } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';

export function sourceArgument(
  args = process.argv.slice(2),
  environment = process.env,
) {
  const inline = args.find((argument) => argument.startsWith('--source='));
  const index = args.indexOf('--source');
  const value = inline?.slice('--source='.length) || (index >= 0 ? args[index + 1] : undefined);
  return value || environment.H0N_ICONS_SOURCE_DIR;
}

export async function resolveImportSource(options = {}) {
  const value = sourceArgument(options.args, options.environment);
  if (!value) {
    throw new Error(
      'Missing icon source directory. Pass --source <path> or set H0N_ICONS_SOURCE_DIR.',
    );
  }

  const directory = resolve(value);
  try {
    await access(directory);
    if (!(await stat(directory)).isDirectory()) throw new Error('path is not a directory');
  } catch (error) {
    throw new Error(`Icon source directory is unavailable: ${directory} (${error.message}).`);
  }
  return directory;
}

export function assertPathInside(directory, target, label = 'target') {
  const relativePath = relative(directory, target);
  if (relativePath.startsWith('..') || isAbsolute(relativePath)) {
    throw new Error(`Unsafe ${label} path outside ${directory}: ${target}`);
  }
}
