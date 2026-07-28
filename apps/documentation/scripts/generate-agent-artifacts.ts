import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { h0ComponentManifest } from '../../../packages/ui/src/manifest.ts'
import { renderAgentArtifacts } from '../src/content/agent/artifacts.ts'
import { componentAgentRecords } from '../src/content/agent/records/index.ts'
import { validateComponentAgentRecords } from '../src/content/agent/schema.ts'

const documentationRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicRoot = join(documentationRoot, 'public')

function listFiles(root: string, extension: string): string[] {
    return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
        const path = join(root, entry.name)
        return entry.isDirectory() ? listFiles(path, extension) : entry.name.endsWith(extension) ? [path] : []
    })
}

function readPagePaths() {
    return listFiles(join(documentationRoot, 'src/content/pages'), '.md').map((file) => {
        const source = readFileSync(file, 'utf8')
        const match = source.match(/^---\r?\n[\s\S]*?^path:\s*([^\r\n]+)$/m)
        if (!match) throw new Error(`[agents] Markdown page "${relative(documentationRoot, file)}" has no path frontmatter.`)
        return (match[1] ?? '').trim().replace(/^['"]|['"]$/g, '')
    })
}

function readExampleKeys() {
    const root = join(documentationRoot, 'src/examples')
    return listFiles(root, '.vue').map((file) => relative(root, file).replaceAll('\\', '/').replace(/\.vue$/, ''))
}

function readLibraryVersion() {
    const packageJson = JSON.parse(readFileSync(join(documentationRoot, '../../packages/ui/package.json'), 'utf8')) as { version?: string }
    if (!packageJson.version) throw new Error('[agents] @h0nio/ui package version is missing.')
    return packageJson.version
}

export function generateAgentArtifacts(mode: '--write' | '--check') {
    validateComponentAgentRecords(componentAgentRecords, {
        manifest: h0ComponentManifest,
        pagePaths: readPagePaths(),
        exampleKeys: readExampleKeys(),
    })

    const artifacts = renderAgentArtifacts(componentAgentRecords, h0ComponentManifest, readLibraryVersion())
    const stale: string[] = []

    for (const artifact of artifacts) {
        const target = join(publicRoot, artifact.path)
        if (mode === '--write') {
            mkdirSync(dirname(target), { recursive: true })
            writeFileSync(target, artifact.content, 'utf8')
            continue
        }

        if (!existsSync(target) || readFileSync(target, 'utf8') !== artifact.content) stale.push(artifact.path)
    }

    if (stale.length) throw new Error(`[agents] Generated artifacts are stale or missing: ${stale.join(', ')}. Run pnpm --filter @h0n/ui-documentation agents:generate.`)
    return artifacts
}

const mode = process.argv[2]
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
    if (mode !== '--write' && mode !== '--check') throw new Error('[agents] Expected --write or --check.')
    const artifacts = generateAgentArtifacts(mode)
    process.stdout.write(`[agents] ${mode === '--write' ? 'Generated' : 'Verified'} ${artifacts.length} artifacts.\n`)
}
