import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8'))
const pnpmCli = process.env.npm_execpath

if (!pnpmCli) {
    throw new Error('Cannot verify the package archive outside a pnpm lifecycle: npm_execpath is missing.')
}

const pack = spawnSync(
    process.execPath,
    [pnpmCli, 'pack', '--dry-run', '--json'],
    {
        cwd: packageRoot,
        encoding: 'utf8',
        env: process.env
    }
)

if (pack.status !== 0) {
    throw new Error(`pnpm pack --dry-run failed:\n${pack.stderr || pack.stdout}`)
}

const result = JSON.parse(pack.stdout)
const publishedFiles = new Set(result.files.map(({ path }) => path.replaceAll('\\', '/')))

function assert(condition, message) {
    if (!condition) throw new Error(message)
}

function collectExportTargets(value, targets) {
    if (typeof value === 'string') {
        targets.add(value)
        return
    }

    for (const nested of Object.values(value)) {
        collectExportTargets(nested, targets)
    }
}

const componentFamilies = readdirSync(resolve(packageRoot, 'src/components'), {
    withFileTypes: true
})
    .filter(
        (entry) =>
            entry.isDirectory() &&
            !entry.name.startsWith('_') &&
            existsSync(resolve(packageRoot, 'src/components', entry.name, 'index.ts'))
    )
    .map((entry) => entry.name)
    .sort()

const individualComposables = readdirSync(resolve(packageRoot, 'src/composables'), {
    withFileTypes: true
})
    .filter((entry) => entry.isFile() && entry.name !== 'index.ts' && entry.name.endsWith('.ts'))
    .map((entry) => entry.name.slice(0, -3))
    .sort()

const exportTargets = new Set()

for (const [subpath, value] of Object.entries(packageJson.exports)) {
    const replacements = subpath.startsWith('./components/')
        ? componentFamilies
        : subpath === './composables/*'
          ? individualComposables
          : [undefined]

    for (const replacement of replacements) {
        const targets = new Set()
        collectExportTargets(value, targets)

        for (const target of targets) {
            exportTargets.add(replacement ? target.replaceAll('*', replacement) : target)
        }
    }
}

const requiredFiles = new Set([
    'LICENSE',
    'README.md',
    'package.json',
    packageJson.main,
    packageJson.module,
    packageJson.types,
    packageJson.style,
    ...exportTargets
].map((path) => path.replace(/^\.\//, '')))

const missingFiles = [...requiredFiles].filter((path) => !publishedFiles.has(path))
const unexpectedTopLevelFiles = [...publishedFiles].filter(
    (path) =>
        !path.startsWith('dist/') &&
        path !== 'LICENSE' &&
        path !== 'README.md' &&
        path !== 'package.json'
)
const forbiddenFiles = [...publishedFiles].filter(
    (path) =>
        path.startsWith('src/') ||
        path.startsWith('scripts/') ||
        path.startsWith('tests/') ||
        path.startsWith('test-dts/') ||
        path.startsWith('test-consumer/') ||
        path.startsWith('contracts/') ||
        path.endsWith('.map')
)

assert(result.name === packageJson.name, `Packed name is ${result.name}; expected ${packageJson.name}.`)
assert(
    result.version === packageJson.version,
    `Packed version is ${result.version}; expected ${packageJson.version}.`
)
assert(missingFiles.length === 0, `Published archive is missing: ${missingFiles.join(', ')}`)
assert(
    unexpectedTopLevelFiles.length === 0,
    `Published archive contains unexpected top-level files: ${unexpectedTopLevelFiles.join(', ')}`
)
assert(
    forbiddenFiles.length === 0,
    `Published archive contains private source or test files: ${forbiddenFiles.join(', ')}`
)

console.log(
    `PASS ${result.filename}: ${publishedFiles.size} files, ${componentFamilies.length} component subpaths, ${individualComposables.length} individual composables`
)
