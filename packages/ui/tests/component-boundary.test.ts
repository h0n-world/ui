import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const sourceRoot = resolve(process.cwd(), 'src')
const publicEntryPath = resolve(sourceRoot, 'index.ts')

describe('public component boundaries', () => {
    it('marks every public component root with data-h0n-component', () => {
        const publicEntry = readFileSync(publicEntryPath, 'utf8')
        const familyPaths = [...new Set([...publicEntry.matchAll(/from '(\.\/components\/[^']+)'/g)].map((match) => match[1]).filter((path) => !path.includes('/_shared')))]
        const componentPaths = familyPaths.flatMap((familyPath) => {
            const familyEntry = readFileSync(resolve(sourceRoot, familyPath.slice(2), 'index.ts'), 'utf8')
            return [...familyEntry.matchAll(/from '(\.\/[^']+\.vue)'/g)].map((match) => `${familyPath}/${match[1].slice(2)}`)
        })

        expect(componentPaths.length).toBeGreaterThan(0)

        for (const componentPath of componentPaths) {
            const source = readFileSync(resolve(sourceRoot, componentPath.slice(2)), 'utf8')
            expect(source, `${componentPath} must define a component boundary`).toContain('data-h0n-component=')
        }
    })

    it('marks every independently teleported surface', () => {
        const select = readFileSync(resolve(sourceRoot, 'components/Select/H0Select.vue'), 'utf8')
        const toasts = readFileSync(resolve(sourceRoot, 'components/Toast/H0Toasts.vue'), 'utf8')
        const overlay = readFileSync(resolve(sourceRoot, 'components/_shared/H0OverlayRoot.vue'), 'utf8')

        expect(select).toContain('data-h0n-component="select-popover"')
        expect(select).toContain('data-h0n-component="select-overlay"')
        expect(toasts).toContain('data-h0n-component="toasts"')
        expect(overlay).toContain('data-h0n-component="overlay-root"')
    })
})
