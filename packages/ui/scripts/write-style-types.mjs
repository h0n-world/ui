import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const styleTypesPath = resolve(scriptDir, '../dist/style.css.d.ts')
const content = 'declare const css: string\nexport default css\n'

await mkdir(dirname(styleTypesPath), { recursive: true })
await writeFile(styleTypesPath, content)
