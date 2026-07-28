import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transform } from 'esbuild'
import { build } from 'vite'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const packageDirectory = resolve(scriptDirectory, '..')
const fixtureDirectory = resolve(packageDirectory, 'test-consumer')
const outputDirectory = resolve(fixtureDirectory, 'dist')

const chunkDirectory = resolve(packageDirectory, 'dist/_chunks')
const localeChunkNames = (await readdir(chunkDirectory)).filter((file) => file.startsWith('locale-') && file.endsWith('.js'))
if (localeChunkNames.length !== 1) throw new Error(`Expected one locale chunk, found ${localeChunkNames.length}`)
const localeChunk = await readFile(resolve(chunkDirectory, localeChunkNames[0]), 'utf8')
await transform(`import { h } from 'vue'\n${localeChunk}`, { format: 'esm', target: 'es2022' })

await rm(outputDirectory, { force: true, recursive: true })

for (const fixture of ['root-button', 'subpath-button', 'subpath-icons', 'subpath-datatable', 'subpath-numberinput', 'subpath-passwordinput', 'subpath-fileupload', 'full-css', 'full-and-button-css', 'button-css', 'select-css', 'overlay-css', 'datatable-css', 'layout-css', 'tooltip-css', 'tabs-css', 'field-css', 'scrollarea-css', 'integration-app']) {
    const fixtureOutputDirectory = resolve(outputDirectory, fixture)

    await build({
        configFile: false,
        logLevel: 'warn',
        root: fixtureDirectory,
        build: {
            emptyOutDir: true,
            minify: 'oxc',
            lib: {
                entry: resolve(fixtureDirectory, `${fixture}.ts`),
                fileName: 'bundle',
                formats: ['es']
            },
            outDir: fixtureOutputDirectory,
            rollupOptions: {
                external: ['vue', '@floating-ui/dom']
            }
        }
    })

    const bundlePath = resolve(fixtureOutputDirectory, 'bundle.js')
    const bundle = await readFile(bundlePath, 'utf8')
    const productionBundle = await transform(bundle, { format: 'esm', minify: true, target: 'es2022' })

    await writeFile(bundlePath, productionBundle.code)
}
