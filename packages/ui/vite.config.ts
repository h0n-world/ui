import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'

function injectCssIntoEsBundle(): Plugin {
    return {
        name: 'h0n-ui-inject-css-into-es-bundle',
        generateBundle(options, bundle) {
            if (options.format !== 'es') {
                return
            }

            for (const assetOrChunk of Object.values(bundle)) {
                if (assetOrChunk.type === 'chunk') {
                    assetOrChunk.code = assetOrChunk.code.replace(/\/\/#(?:end)?region[^\n]*\n/g, '')
                }
            }

            const entryChunk = Object.values(bundle).find((assetOrChunk) => assetOrChunk.type === 'chunk' && assetOrChunk.isEntry && assetOrChunk.fileName === 'h0n-ui.js')

            if (!entryChunk || entryChunk.type !== 'chunk' || entryChunk.code.includes("import './h0n-ui.css'")) {
                return
            }

            entryChunk.code = "import './h0n-ui.css';\n" + entryChunk.code
        }
    }
}

function emitComponentStyleEntries(): Plugin {
    return {
        name: 'h0n-ui-component-style-entries',
        generateBundle(options, bundle) {
            if (options.format !== 'es') return

            const assets = new Map(Object.entries(bundle).filter(([, item]) => item.type === 'asset').map(([fileName, item]) => [fileName, item]))
            const chunks = new Map(Object.entries(bundle).filter(([, item]) => item.type === 'chunk').map(([fileName, item]) => [fileName, item]))

            function collectCss(chunk: Extract<(typeof bundle)[string], { type: 'chunk' }>, visited = new Set<string>()) {
                const css = new Set<string>(((chunk as typeof chunk & { viteMetadata?: { importedCss?: Set<string> } }).viteMetadata?.importedCss ?? new Set<string>()))
                for (const importedFile of chunk.imports) {
                    if (visited.has(importedFile)) continue
                    visited.add(importedFile)
                    const importedChunk = chunks.get(importedFile)
                    if (importedChunk?.type === 'chunk') collectCss(importedChunk, visited).forEach((fileName) => css.add(fileName))
                }
                return css
            }

            const rootEntry = Object.values(bundle).find((item) => item.type === 'chunk' && item.isEntry && item.name === 'h0n-ui')
            const fullStyle = assets.get('h0n-ui.css')
            const layerOrder = '@layer h0n.tokens, h0n.base, h0n.components;'
            const wrapStyles = (base: string, components: string) => `${layerOrder}\n@layer h0n.tokens {\n${base.replace(layerOrder, '')}\n}\n@layer h0n.base {\n:where([data-h0n-component]) { font-family: inherit; }\n}\n@layer h0n.components {\n${components}\n}`
            const baseStyle = fullStyle?.type === 'asset' ? String(fullStyle.source) : ''
            if (rootEntry?.type === 'chunk' && fullStyle?.type === 'asset') {
                const componentStyles = Array.from(collectCss(rootEntry)).filter((fileName) => fileName !== 'h0n-ui.css').map((fileName) => assets.get(fileName)?.source ?? '').join('\n')
                fullStyle.source = wrapStyles(baseStyle, componentStyles)
            }

            for (const item of Object.values(bundle)) {
                if (item.type !== 'chunk' || !item.isEntry || !item.name.startsWith('components/')) continue
                const importedCss = Array.from(collectCss(item))
                const componentStyles = importedCss.filter((fileName) => fileName !== 'h0n-ui.css').map((fileName) => assets.get(fileName)?.source ?? '').join('\n')
                const source = wrapStyles(baseStyle, componentStyles)
                if (!source) continue
                const componentName = item.name.split('/')[1]
                this.emitFile({ type: 'asset', fileName: `components/${componentName}/style.css`, source })
            }
        }
    }
}

const componentsDirectory = resolve(__dirname, 'src/components')
const componentEntries = Object.fromEntries(
    readdirSync(componentsDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name !== '_shared' && existsSync(resolve(componentsDirectory, entry.name, 'index.ts')))
        .map((entry) => [`components/${entry.name}/index`, resolve(componentsDirectory, entry.name, 'index.ts')])
)

const esEntries = {
    'h0n-ui': resolve(__dirname, 'src/entry.ts'),
    locale: resolve(__dirname, 'src/locale.ts'),
    theme: resolve(__dirname, 'src/theme.ts'),
    manifest: resolve(__dirname, 'src/manifest.ts'),
    'icons/index': resolve(__dirname, 'src/icons/index.ts'),
    'composables/index': resolve(__dirname, 'src/composables/index.ts'),
    ...Object.fromEntries(
        readdirSync(resolve(__dirname, 'src/composables'))
            .filter((file) => file.startsWith('useH0') && file.endsWith('.ts'))
            .map((file) => [`composables/${file.slice(0, -3)}`, resolve(__dirname, 'src/composables', file)])
    ),
    ...componentEntries
}

export default defineConfig(({ mode }) => {
    const isUmdBuild = mode === 'umd'

    return {
        plugins: [vue(), injectCssIntoEsBundle(), emitComponentStyleEntries()],
        build: {
            cssCodeSplit: !isUmdBuild,
            emptyOutDir: isUmdBuild,
            minify: 'terser',
            terserOptions: {
                compress: {
                    passes: 3,
                    keep_fargs: false,
                    drop_console: true,
                    pure_getters: true,
                    unsafe: true,
                    unsafe_arrows: true,
                    unsafe_methods: true,
                    unsafe_symbols: true
                },
                // `h` is Vue's render helper. Some consumer dev transforms inject
                // it into linked/file dependencies, so using the same top-level
                // name in a pre-minified chunk produces a duplicate declaration.
                mangle: {
                    reserved: ['h']
                },
                format: {
                    comments: false
                }
            },
            lib: isUmdBuild
                ? {
                      entry: resolve(__dirname, 'src/entry.ts'),
                      name: 'H0Nui',
                      fileName: 'h0n-ui',
                      formats: ['umd']
                  }
                : {
                      entry: esEntries,
                      formats: ['es']
                  },
            rollupOptions: {
                external: isUmdBuild ? ['vue'] : ['vue', '@floating-ui/dom'],
                output: isUmdBuild
                    ? {
                          exports: 'named',
                          globals: { vue: 'Vue' }
                      }
                    : {
                          assetFileNames: (asset) => (asset.name?.endsWith('.css') ? '[name][extname]' : 'assets/[name]-[hash][extname]'),
                          chunkFileNames: '_chunks/[name]-[hash].js',
                          entryFileNames: '[name].js',
                          exports: 'named'
                      }
            }
        }
    }
})
