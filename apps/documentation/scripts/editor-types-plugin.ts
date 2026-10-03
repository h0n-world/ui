import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import ts from 'typescript'
import type { Plugin, ResolvedConfig } from 'vite'
import type { LanguageAssets } from '../src/editor/language-types'

const require = createRequire(import.meta.url)
const normalize = (path: string) => path.replaceAll('\\', '/')

/** Generate fresh workspace declarations, then serialize only their type closure. */
export async function buildEditorTypes(root: string): Promise<LanguageAssets> {
    const cache = resolve(root, '.cache/editor-types')
    await promisify(execFile)(
        process.execPath,
        [
            require.resolve('vue-tsc/bin/vue-tsc.js'),
            '-p',
            resolve(root, '../../packages/ui/tsconfig.json'),
            '--emitDeclarationOnly',
            '--declarationDir',
            cache,
            '--outDir',
            cache,
        ],
        { maxBuffer: 4_000_000 },
    )
    const options: ts.CompilerOptions = {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        strict: true,
        skipLibCheck: true,
        types: [],
    }
    const containing = join(root, '__editor_types__.ts')
    const entry = (name: string) => {
        const result = ts.resolveModuleName(name, containing, options, ts.sys).resolvedModule
        if (!result) throw new Error(`Editor declarations unavailable: ${name}`)
        return result.resolvedFileName
    }
    const entries = {
        vue: entry('vue'),
        '@h0nio/ui': join(cache, 'index.d.ts'),
        '@h0nio/ui/icons': join(cache, 'icons/index.d.ts'),
        '@vue/runtime-core': '',
    }
    // runtime-core is a transitive Vue dependency; resolve it from Vue if not linked at the app root.
    const vueRequire = createRequire(require.resolve('vue/package.json'))
    entries['@vue/runtime-core'] = join(
        dirname(vueRequire.resolve('@vue/runtime-core/package.json')),
        'dist/runtime-core.d.ts',
    )
    const helper = join(
        dirname(require.resolve('@vue/language-core/package.json')),
        'types/template-helpers.d.ts',
    )
    const program = ts.createProgram([...Object.values(entries), helper], options)
    const sources = program.getSourceFiles()
    const fileIds = new Map(
        sources.map((file, index) => [
            normalize(file.fileName),
            /\/typescript\/lib\/lib\.[^/]+\.d\.ts$/.test(normalize(file.fileName))
                ? `/typescript/${file.fileName.split(/[\\/]/).at(-1)}`
                : normalize(file.fileName) === normalize(helper)
                  ? '/vue-types/template-helpers.d.ts'
                  : `/declarations/${index}.d.ts`,
        ]),
    )
    const files: Record<string, string> = {}
    const resolutions: LanguageAssets['resolutions'] = {}
    for (const file of sources) {
        const id = fileIds.get(normalize(file.fileName))!
        files[id] = file.text
        resolutions[id] = {}
        for (const imported of ts.preProcessFile(file.text, true, true).importedFiles) {
            const resolved = ts.resolveModuleName(
                imported.fileName,
                file.fileName,
                options,
                ts.sys,
            ).resolvedModule
            const target = resolved && fileIds.get(normalize(resolved.resolvedFileName))
            if (target) resolutions[id][imported.fileName] = target
        }
    }
    const mappedEntries = Object.fromEntries(
        Object.entries(entries).map(([name, path]) => [name, fileIds.get(normalize(path))!]),
    )
    if (Object.values(mappedEntries).some((path) => !path))
        throw new Error('Incomplete editor declaration bundle')
    const uiModule = program.getSourceFile(entries['@h0nio/ui'])
    const checker = program.getTypeChecker()
    const symbol = uiModule && checker.getSymbolAtLocation(uiModule)
    const components = symbol
        ? checker
              .getExportsOfModule(symbol)
              .filter(
                  (item) =>
                      /^H0[A-Z]/.test(item.name) &&
                      (item.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(item) : item)
                          .flags & ts.SymbolFlags.Value,
              )
              .map((item) => item.name)
        : []
    // Library controls deliberately forward native DOM events instead of declaring emits.
    files['/h0n-global.d.ts'] =
        `import type { HTMLAttributes } from 'vue'; import '@vue/runtime-core'; type NativeEvents = Pick<HTMLAttributes, Extract<keyof HTMLAttributes, \`on\${string}\`>>; declare module '@vue/runtime-core' { interface ComponentCustomProps extends NativeEvents {} interface GlobalComponents { ${components.map((name) => `${name}: typeof import('@h0nio/ui')['${name}'];`).join('\n')} } } export {};`
    resolutions['/h0n-global.d.ts'] = {
        vue: mappedEntries.vue,
        '@vue/runtime-core': mappedEntries['@vue/runtime-core'],
        '@h0nio/ui': mappedEntries['@h0nio/ui'],
    }
    return {
        files,
        resolutions,
        entries: mappedEntries,
        defaultLib: '/typescript/lib.es2020.full.d.ts',
    }
}

export function editorTypesPlugin(): Plugin {
    let config: ResolvedConfig
    let pending: Promise<LanguageAssets> | undefined
    let asset: string
    const bundle = () =>
        (pending ??= buildEditorTypes(config.root).catch((error) => {
            pending = undefined
            throw error
        }))
    return {
        name: 'documentation-editor-types',
        configResolved(value) {
            config = value
        },
        resolveId(id) {
            if (id === 'virtual:editor-types') return '\0editor-types'
        },
        async buildStart() {
            if (config.command === 'build')
                asset = this.emitFile({
                    type: 'asset',
                    name: 'editor-types.json',
                    source: JSON.stringify(await bundle()),
                })
        },
        load(id) {
            if (id !== '\0editor-types') return
            return config.command === 'serve'
                ? `export default ${JSON.stringify(`${config.base}__editor/types.json`)};`
                : `export default import.meta.ROLLUP_FILE_URL_${asset};`
        },
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (req.url?.split('?')[0] !== `${config.base}__editor/types.json`) return next()
                try {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(await bundle()))
                } catch (error) {
                    next(error)
                }
            })
            server.watcher.on('change', (path) => {
                if (
                    normalize(path).includes('/packages/ui/src/') ||
                    normalize(path).includes('/packages/icons/src/')
                )
                    pending = undefined
            })
        },
    }
}
