import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import snapshot from '../contracts/public-contract.snapshot.json'
import { h0ComponentManifest } from '../src/manifest'

const source = resolve(import.meta.dirname, '../src')
const repositoryRoot = resolve(import.meta.dirname, '../../..')
const normalize = (value: string) => value.replace(/\r\n/g, '\n')
const hash = (value: string) => createHash('sha256').update(normalize(value)).digest('hex')
const repositoryPath = (file: string) => relative(repositoryRoot, file).replaceAll('\\', '/')
const comparePaths = (left: string, right: string) => left < right ? -1 : left > right ? 1 : 0
function walk(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)])
}

describe('1.x public contract freeze', () => {
    it('matches the reviewed root and component API snapshots', () => {
        const publicFamilies = [...new Set(h0ComponentManifest.map((entry) => entry.family))].sort()
        const componentContracts = publicFamilies
            .flatMap((family) => walk(join(source, 'components', family)))
            .filter((file) => /\.(types\.ts|vue)$/.test(file))
            .map((file) => ({ file, path: repositoryPath(file) }))
            .sort((left, right) => comparePaths(left.path, right.path))
            .map(({ file, path }) => `// ${path}\n${readFileSync(file, 'utf8')}`)
            .join('\n')
        expect(hash(readFileSync(join(source, 'index.ts'), 'utf8'))).toBe(snapshot.rootEntrySha256)
        expect(hash(readFileSync(join(source, 'types.ts'), 'utf8'))).toBe(snapshot.sharedTypesSha256)
        expect(hash(componentContracts)).toBe(snapshot.componentContractsSha256)
    })

    it('matches the reviewed stable CSS variable snapshot', () => {
        const styles = walk(source).filter((file) => /\.(scss|vue)$/.test(file)).sort().map((file) => readFileSync(file, 'utf8')).join('\n')
        const variables = [...new Set([...styles.matchAll(/--h0n-ui-[\w-]+/g)].map((match) => match[0]))].sort()
        expect(variables).toHaveLength(snapshot.stableCssVariableCount)
        expect(hash(variables.join('\n'))).toBe(snapshot.stableCssVariablesSha256)
    })
})
