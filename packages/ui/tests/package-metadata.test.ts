import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const packageRoot = resolve(import.meta.dirname, '..')
const workspaceRoot = resolve(packageRoot, '../..')
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8')) as {
    name: string
    version: string
    description?: string
    keywords?: string[]
    license?: string
    author?: { name?: string; url?: string }
    repository?: { type?: string; url?: string; directory?: string }
    homepage?: string
    bugs?: { url?: string }
    files?: string[]
    main?: string
    module?: string
    types?: string
    style?: string
    sideEffects?: string[]
    exports?: Record<string, string | Record<string, string>>
    publishConfig?: { access?: string }
    scripts?: Record<string, string>
    dependencies?: Record<string, string>
    peerDependencies?: Record<string, string>
    private?: boolean
}

describe('@h0nio/ui package metadata', () => {
    it('declares its public npm identity and MIT license', () => {
        expect(packageJson).toMatchObject({
            name: '@h0nio/ui',
            version: '1.2.0',
            license: 'MIT',
            author: {
                name: 'H0N World',
                url: 'https://github.com/h0n-world'
            },
            repository: {
                type: 'git',
                url: 'git+https://github.com/h0n-world/ui.git',
                directory: 'packages/ui'
            },
            homepage: 'https://ui.h0n.io',
            bugs: { url: 'https://github.com/h0n-world/ui/issues' },
            publishConfig: { access: 'public' }
        })
        expect(packageJson.private).not.toBe(true)
        expect(packageJson.description).toBeTruthy()
        expect(packageJson.keywords).toEqual(expect.arrayContaining(['vue', 'component-library', 'design-system', 'typescript', 'accessibility']))
        const license = readFileSync(resolve(packageRoot, 'LICENSE'), 'utf8')
        expect(license).toContain('MIT License')
        expect(license).toContain('Copyright (c) 2026 H0N World')
        expect(readFileSync(resolve(packageRoot, 'README.md'), 'utf8')).toContain('# H0N UI')
    })

    it('publishes only intentional artifacts and marks CSS as side-effectful', () => {
        expect(packageJson.files).toEqual(['dist', 'README.md', 'LICENSE'])
        expect(packageJson.sideEffects).toEqual(['**/*.css'])
        expect(packageJson.main).toBe('./dist/h0n-ui.umd.cjs')
        expect(packageJson.module).toBe('./dist/h0n-ui.js')
        expect(packageJson.types).toBe('./dist/index.d.ts')
        expect(packageJson.style).toBe('./dist/h0n-ui.css')
        expect(packageJson.scripts).toMatchObject({
            prepublishOnly: 'pnpm run test && pnpm run build',
            'verify:package': 'node scripts/verify-package-contents.mjs'
        })
        expect(packageJson.scripts?.build).toContain('verify-package-contents.mjs')
    })

    it('keeps the supported export map and runtime dependency boundary explicit', () => {
        expect(packageJson.exports).toMatchObject({
            '.': {
                types: './dist/index.d.ts',
                import: './dist/h0n-ui.js',
                require: './dist/h0n-ui.umd.cjs',
                default: './dist/h0n-ui.js'
            },
            './style.css': {
                types: './dist/style.css.d.ts',
                default: './dist/h0n-ui.css'
            },
            './components/*': {
                types: './dist/components/*/index.d.ts',
                import: './dist/components/*/index.js',
                default: './dist/components/*/index.js'
            },
            './components/*/style.css': {
                types: './dist/style.css.d.ts',
                default: './dist/components/*/style.css'
            },
            './composables': {
                types: './dist/composables/index.d.ts',
                import: './dist/composables/index.js',
                default: './dist/composables/index.js'
            },
            './locale': {
                types: './dist/locale.d.ts',
                import: './dist/locale.js',
                default: './dist/locale.js'
            },
            './theme': {
                types: './dist/theme.d.ts',
                import: './dist/theme.js',
                default: './dist/theme.js'
            },
            './manifest': {
                types: './dist/manifest.d.ts',
                import: './dist/manifest.js',
                default: './dist/manifest.js'
            },
            './icons': {
                types: './dist/icons/index.d.ts',
                import: './dist/icons/index.js',
                default: './dist/icons/index.js'
            },
            './package.json': './package.json'
        })
        expect(packageJson.dependencies).toEqual({ '@floating-ui/dom': '^1.8.0' })
        expect(packageJson.peerDependencies).toEqual({ vue: '^3.5.0' })
    })

    it('keeps repository CI and public policies aligned with the package identity', () => {
        const workflow = readFileSync(resolve(workspaceRoot, '.github/workflows/ui-quality.yml'), 'utf8')

        expect(workflow).toContain('pnpm --filter @h0nio/ui typecheck')
        expect(workflow).toContain('pnpm --filter @h0nio/ui test')
        expect(workflow).toContain('pnpm --filter @h0nio/ui build')
        expect(workflow).not.toMatch(/@h0n\/ui(?:\s|$)/)

        for (const policy of ['CONTRIBUTING.md', 'SECURITY.md', 'RELEASING.md']) {
            expect(readFileSync(resolve(workspaceRoot, policy), 'utf8').trim()).not.toBe('')
        }
    })
})
