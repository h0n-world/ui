import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const packageDirectory = resolve(scriptDirectory, '..')
const kibibyte = 1024
const budgets = [
    { file: 'dist/h0n-ui.js', raw: 8 * kibibyte, gzip: 3 * kibibyte },
    { file: 'dist/h0n-ui.umd.cjs', raw: 360 * kibibyte, gzip: 90 * kibibyte },
    { file: 'dist/h0n-ui.css', raw: 225 * kibibyte, gzip: 32 * kibibyte },
    { file: 'test-consumer/dist/root-button/bundle.js', raw: 20 * kibibyte, gzip: 7 * kibibyte },
    { file: 'test-consumer/dist/subpath-button/bundle.js', raw: 20 * kibibyte, gzip: 7 * kibibyte },
    { file: 'test-consumer/dist/subpath-icons/bundle.js', raw: 4 * kibibyte, gzip: 2 * kibibyte },
    { file: 'test-consumer/dist/icon-source/bundle.js', raw: 12 * kibibyte, gzip: 5 * kibibyte },
    { file: 'test-consumer/dist/subpath-datatable/bundle.js', gzip: 19 * kibibyte },
    { file: 'test-consumer/dist/subpath-numberinput/bundle.js', gzip: 8 * kibibyte },
    { file: 'test-consumer/dist/subpath-passwordinput/bundle.js', gzip: 8 * kibibyte },
    { file: 'test-consumer/dist/subpath-fileupload/bundle.js', gzip: 14 * kibibyte },
    { file: 'test-consumer/dist/layout-css/bundle.css', gzip: 5 * kibibyte },
    { file: 'test-consumer/dist/integration-app/bundle.js', gzip: 75 * kibibyte },
    { file: 'test-consumer/dist/integration-app/bundle.css', gzip: 24 * kibibyte },
    { file: 'dist/composables/index.js', gzip: 6 * kibibyte }
]

async function getJavaScriptFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    const files = await Promise.all(
        entries.map((entry) => {
            const path = resolve(directory, entry.name)

            return entry.isDirectory() ? getJavaScriptFiles(path) : path.endsWith('.js') ? [path] : []
        })
    )

    return files.flat()
}

let failed = false

for (const budget of budgets) {
    const content = await readFile(resolve(packageDirectory, budget.file))
    const rawSize = content.byteLength
    const gzipSize = gzipSync(content).byteLength
    const withinBudget = (budget.raw === undefined || rawSize <= budget.raw) && gzipSize <= budget.gzip

    failed ||= !withinBudget
    console.log(`${withinBudget ? 'PASS' : 'FAIL'} ${budget.file}: ${(rawSize / kibibyte).toFixed(2)} KiB raw, ${(gzipSize / kibibyte).toFixed(2)} KiB gzip`)
}

const esFiles = await getJavaScriptFiles(resolve(packageDirectory, 'dist'))
const esContents = await Promise.all(esFiles.map((file) => readFile(file)))
const esRawSize = esContents.reduce((total, content) => total + content.byteLength, 0)
const esGzipSize = esContents.reduce((total, content) => total + gzipSync(content).byteLength, 0)
// The graph includes all public component entry points. Keep a small allowance for
// SearchField and the Radio family while preserving a strict aggregate ceiling.
const esWithinBudget = esRawSize <= 390 * kibibyte && esGzipSize <= 145 * kibibyte

failed ||= !esWithinBudget
console.log(`${esWithinBudget ? 'PASS' : 'FAIL'} dist ES graph (${esFiles.length} files): ${(esRawSize / kibibyte).toFixed(2)} KiB raw, ${(esGzipSize / kibibyte).toFixed(2)} KiB summed gzip`)

const componentDirectories = await readdir(resolve(packageDirectory, 'dist/components'), { withFileTypes: true })
for (const directory of componentDirectories.filter((entry) => entry.isDirectory())) {
    const stylePath = resolve(packageDirectory, 'dist/components', directory.name, 'style.css')
    if (!existsSync(stylePath)) continue
    const style = await readFile(stylePath)
    const gzipSize = gzipSync(style).byteLength
    const withinBudget = gzipSize <= 10 * kibibyte
    failed ||= !withinBudget
    console.log(`${withinBudget ? 'PASS' : 'FAIL'} components/${directory.name}/style.css: ${(gzipSize / kibibyte).toFixed(2)} KiB gzip`)
}

if (failed) {
    process.exitCode = 1
}
