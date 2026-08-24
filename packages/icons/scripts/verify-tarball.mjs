import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const packageRoot = resolve(import.meta.dirname, '..')
const packageJson = JSON.parse(await readFile(resolve(packageRoot, 'package.json'), 'utf8'))
const packageManager = process.env.npm_execpath
if (!packageManager) throw new Error('npm_execpath is required to verify the packed package.')
const packageManagerRunsThroughNode = /\.(?:c?js|mjs)$/i.test(packageManager)

const temporaryRoot = await mkdtemp(join(tmpdir(), 'h0nio-icons-consumer-'))
const archiveName = `${packageJson.name.slice(1).replace('/', '-')}-${packageJson.version}.tgz`
const archivePath = resolve(temporaryRoot, archiveName)
const consumerRoot = resolve(temporaryRoot, 'consumer')

function runPackageManager(args, cwd, stdio = 'inherit') {
    const command = packageManagerRunsThroughNode ? process.execPath : packageManager
    const commandArguments = packageManagerRunsThroughNode ? [packageManager, ...args] : args

    execFileSync(command, commandArguments, {
        cwd,
        stdio,
        maxBuffer: 8 * 1024 * 1024
    })
}

try {
    runPackageManager(['pack', '--pack-destination', temporaryRoot], packageRoot, 'pipe')
    assert.equal(existsSync(archivePath), true, `Expected archive was not created: ${archivePath}`)

    await writeFile(resolve(temporaryRoot, 'consumer-package.json'), `${JSON.stringify({ name: 'h0nio-icons-consumer-fixture', private: true, type: 'module' }, null, 2)}\n`)
    await mkdir(consumerRoot)
    await rename(resolve(temporaryRoot, 'consumer-package.json'), resolve(consumerRoot, 'package.json'))
    runPackageManager(['add', '--offline', '--ignore-scripts', archivePath], consumerRoot)

    const runtimeFixture = `
    import assert from 'node:assert/strict';
    import { existsSync, readFileSync } from 'node:fs';
    import { dirname, resolve } from 'node:path';
    import { fileURLToPath } from 'node:url';
    const root = await import('@h0nio/icons');
    const icon = await import('@h0nio/icons/accessibility-duotone');
    const all = await import('@h0nio/icons/all');
    const packageRoot = dirname(fileURLToPath(import.meta.resolve('@h0nio/icons/package.json')));
    assert.deepEqual(Object.keys(root).sort(), ['iconToDataUri', 'renderIcon']);
    assert.equal(icon.default.name, 'accessibility-duotone');
    assert.equal(all.icons['accessibility-duotone'].name, icon.default.name);
    assert.equal(existsSync(fileURLToPath(import.meta.resolve('@h0nio/icons/svg/accessibility-duotone'))), true);
    assert.equal(existsSync(resolve(packageRoot, 'LICENSE')), true);
    assert.equal(existsSync(resolve(packageRoot, 'LICENSE-THIRD-PARTY')), true);
    assert.equal(readFileSync(resolve(packageRoot, 'LICENSE'), 'utf8').includes('Copyright (c) 2026 H0N World'), true);
    assert.equal(readFileSync(resolve(packageRoot, 'LICENSE-THIRD-PARTY'), 'utf8').includes('Solar Icons Set by 480 Design'), true);
  `
    await writeFile(resolve(consumerRoot, 'runtime.mjs'), runtimeFixture)
    execFileSync(process.execPath, [resolve(consumerRoot, 'runtime.mjs')], {
        cwd: consumerRoot,
        stdio: 'inherit'
    })

    await writeFile(
        resolve(consumerRoot, 'consumer.ts'),
        `import icon from '@h0nio/icons/accessibility-duotone';\nimport { renderIcon, type IconName } from '@h0nio/icons';\nimport raw from '@h0nio/icons/svg/accessibility-duotone';\nconst name: IconName = icon.name as IconName;\nrenderIcon(icon);\nraw.toUpperCase();\nname.toUpperCase();\n`
    )
    await writeFile(
        resolve(consumerRoot, 'tsconfig.json'),
        `${JSON.stringify(
            {
                compilerOptions: {
                    strict: true,
                    module: 'NodeNext',
                    moduleResolution: 'NodeNext',
                    noEmit: true,
                    skipLibCheck: true
                },
                include: ['consumer.ts']
            },
            null,
            2
        )}\n`
    )
    execFileSync(process.execPath, [resolve(packageRoot, 'node_modules/typescript/bin/tsc'), '-p', resolve(consumerRoot, 'tsconfig.json')], { cwd: consumerRoot, stdio: 'inherit' })

    console.log(`PASS installed tarball consumer fixture for ${packageJson.name}@${packageJson.version}.`)
} finally {
    await rm(temporaryRoot, { recursive: true, force: true })
}
