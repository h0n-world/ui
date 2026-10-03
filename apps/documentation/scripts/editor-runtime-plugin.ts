import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import vue from '@vitejs/plugin-vue'
import { build, type Plugin, type ResolvedConfig } from 'vite'

const require = createRequire(import.meta.url)
const vueRequire = createRequire(require.resolve('vue/package.json'))
export const editorCompilerPath = fileURLToPath(new URL('./dist/compiler-sfc.esm-browser.js',
    `file:///${vueRequire.resolve('@vue/compiler-sfc/package.json').replaceAll('\\', '/')}`))

/** One self-contained runtime: opaque-origin frames cannot import app chunks. */
export function editorRuntimePlugin(): Plugin {
    let config: ResolvedConfig
    let pending: Promise<{ js: string; css: string }> | undefined
    let jsRef: string
    let cssRef: string
    const bundle = () => pending ??= (async () => {
        const result = await build({
            configFile: false, root: config.root, publicDir: false,
            plugins: [vue()], resolve: { alias: config.resolve.alias, dedupe: ['vue'] },
            define: { 'process.env.NODE_ENV': JSON.stringify('production') },
            logLevel: 'warn',
            build: {
                write: false, minify: true, cssCodeSplit: false,
                lib: { entry: fileURLToPath(new URL('../src/editor/runtime.ts', import.meta.url)),
                    name: 'H0EditorRuntime', formats: ['iife'] },
            },
        })
        const results = Array.isArray(result) ? result : [result]
        const output = results.flatMap(item => {
            if (!('output' in item)) throw new Error('Unexpected editor runtime build')
            return item.output
        })
        const js = output.filter(item => item.type === 'chunk').map(item => item.code).join('\n')
        const css = output.filter(item => item.type === 'asset' && item.fileName.endsWith('.css'))
            .map(item => item.type === 'asset' ? String(item.source) : '').join('\n')
        return { js, css }
    })()
    return {
        name: 'documentation-editor-runtime',
        configResolved(value) { config = value },
        resolveId(id) { if (id === 'virtual:editor-runtime') return '\0editor-runtime' },
        async buildStart() {
            if (config.command !== 'build') return
            const runtime = await bundle()
            jsRef = this.emitFile({ type: 'asset', name: 'editor-runtime.js', source: runtime.js })
            cssRef = this.emitFile({ type: 'asset', name: 'editor-runtime.css', source: runtime.css })
        },
        load(id) {
            if (id !== '\0editor-runtime') return
            if (config.command === 'serve') return `export const runtimeJsUrl = ${JSON.stringify(`${config.base}__editor/runtime.js`)}; export const runtimeCssUrl = ${JSON.stringify(`${config.base}__editor/runtime.css`)};`
            return `export const runtimeJsUrl = import.meta.ROLLUP_FILE_URL_${jsRef}; export const runtimeCssUrl = import.meta.ROLLUP_FILE_URL_${cssRef};`
        },
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const path = req.url?.split('?')[0]
                if (path !== `${config.base}__editor/runtime.js` && path !== `${config.base}__editor/runtime.css`) return next()
                try {
                    const runtime = await bundle()
                    res.setHeader('Content-Type', path.endsWith('.js') ? 'text/javascript' : 'text/css')
                    res.end(path.endsWith('.js') ? runtime.js : runtime.css)
                } catch (error) { next(error) }
            })
            server.watcher.on('change', path => { if (path.includes('/packages/') || path.includes('\\packages\\') || path.endsWith('runtime.ts')) pending = undefined })
        },
    }
}
