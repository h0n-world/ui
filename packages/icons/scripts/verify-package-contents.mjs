import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8'));

function collectFiles(directory, relativeDirectory, files) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relativePath = join(relativeDirectory, entry.name).replaceAll('\\', '/');
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) collectFiles(absolutePath, relativePath, files);
    else if (entry.isFile()) files.add(relativePath);
  }
}

const requiredNoticeFiles = ['LICENSE', 'LICENSE-THIRD-PARTY'];
const publishedFiles = new Set(['README.md', 'package.json', ...requiredNoticeFiles]);
for (const directory of packageJson.files) {
  const absolutePath = resolve(packageRoot, directory);
  if (statSync(absolutePath).isDirectory()) collectFiles(absolutePath, directory, publishedFiles);
  else publishedFiles.add(directory.replaceAll('\\', '/'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function collectExportTargets(value, targets) {
  if (typeof value === 'string') {
    targets.add(value);
    return;
  }

  for (const nested of Object.values(value)) collectExportTargets(nested, targets);
}

function namesIn(directory, suffix) {
  return readdirSync(resolve(packageRoot, directory))
    .filter((file) => file.endsWith(suffix))
    .map((file) => file.slice(0, -suffix.length))
    .sort();
}

function assertSameNames(actual, expected, label) {
  const missing = expected.filter((name) => !actual.includes(name));
  const stale = actual.filter((name) => !expected.includes(name));
  assert(missing.length === 0, `${label} is missing: ${missing.join(', ')}`);
  assert(stale.length === 0, `${label} contains stale entries: ${stale.join(', ')}`);
}

const iconNames = namesIn('src/icons', '.ts');
const builtJsNames = namesIn('dist/icons', '.js');
const builtDeclarationNames = namesIn('dist/icons', '.d.ts');
const publishedSvgNames = namesIn('svg', '.svg');

assertSameNames(builtJsNames, iconNames, 'Built icon JavaScript');
assertSameNames(builtDeclarationNames, iconNames, 'Built icon declarations');
assertSameNames(publishedSvgNames, iconNames, 'Published SVG directory');

const exportTargets = new Set();

for (const [subpath, value] of Object.entries(packageJson.exports)) {
  const replacements = subpath === './*' || subpath === './svg/*' ? iconNames : [undefined];

  for (const replacement of replacements) {
    const targets = new Set();
    collectExportTargets(value, targets);
    for (const target of targets) {
      exportTargets.add(replacement ? target.replaceAll('*', replacement) : target);
    }
  }
}

const requiredFiles = new Set(
  [
    'README.md',
    'package.json',
    ...requiredNoticeFiles,
    packageJson.module,
    packageJson.types,
    ...exportTargets,
  ].map((path) => path.replace(/^\.\//, '')),
);
const missingFiles = [...requiredFiles].filter((path) => !publishedFiles.has(path));
const allowedTopLevel = new Set([
  'LICENSE',
  'LICENSE-THIRD-PARTY',
  'README.md',
  'package.json',
]);
const unexpectedTopLevelFiles = [...publishedFiles].filter(
  (path) => !path.startsWith('dist/') && !path.startsWith('svg/') && !allowedTopLevel.has(path),
);
const forbiddenFiles = [...publishedFiles].filter(
  (path) =>
    path.startsWith('src/') ||
    path.startsWith('scripts/') ||
    path.startsWith('tests/') ||
    path.startsWith('test-') ||
    path.endsWith('.tgz') ||
    path.endsWith('.map'),
);
const unpackedBytes = [...publishedFiles].reduce((total, path) => {
  const absolutePath = resolve(packageRoot, path);
  return total + (existsSync(absolutePath) ? statSync(absolutePath).size : 0);
}, 0);
const maxPublishedFiles = 11_500;
const maxUnpackedBytes = 11_000_000;
const declarationWithLiteralBody = [...publishedFiles]
  .filter((path) => /^dist\/icons\/.*\.d\.ts$/.test(path))
  .find((path) => /<(?:svg|path|g)\b/.test(readFileSync(resolve(packageRoot, path), 'utf8')));

assert(packageJson.name === '@h0nio/icons', `Unexpected package name: ${packageJson.name}.`);
assert(packageJson.version !== '0.0.0', 'Package version must not remain 0.0.0.');
assert(
  packageJson.license === 'MIT AND CC-BY-4.0',
  `Unexpected package license expression: ${packageJson.license}.`,
);
assert(
  JSON.stringify(packageJson.files) ===
    JSON.stringify(['dist', 'svg', 'LICENSE', 'LICENSE-THIRD-PARTY']),
  `Unexpected package files whitelist: ${packageJson.files.join(', ')}.`,
);
assert(missingFiles.length === 0, `Published archive is missing: ${missingFiles.join(', ')}`);
assert(
  unexpectedTopLevelFiles.length === 0,
  `Published archive contains unexpected top-level files: ${unexpectedTopLevelFiles.join(', ')}`,
);
assert(
  forbiddenFiles.length === 0,
  `Published archive contains private source, tests, maps, or temporary files: ${forbiddenFiles.join(', ')}`,
);
assert(
  !declarationWithLiteralBody,
  `Icon declaration contains a literal SVG body: ${declarationWithLiteralBody}.`,
);
assert(
  publishedFiles.size <= maxPublishedFiles,
  `Published archive has ${publishedFiles.size} files; budget is ${maxPublishedFiles}.`,
);
assert(
  unpackedBytes <= maxUnpackedBytes,
  `Published archive is ${unpackedBytes} bytes unpacked; budget is ${maxUnpackedBytes}.`,
);

const rootEntry = readFileSync(resolve(packageRoot, 'dist/index.js'), 'utf8');
assert(
  !rootEntry.includes("from './icons/") && !rootEntry.includes('const icons ='),
  'Root entry must remain lightweight; move eager definitions to @h0nio/icons/all.',
);

console.log(
  `PASS ${packageJson.name}@${packageJson.version}: ${publishedFiles.size} files, ${unpackedBytes} bytes unpacked, ${iconNames.length} icon subpaths.`,
);
