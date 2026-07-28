import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { h0ComponentManifest } from '../src/manifest'

describe('component manifest gates', () => {
    it('keeps family barrels, root exports, styles, locale metadata and documentation pages synchronized', () => {
        const source = resolve(import.meta.dirname, '../src')
        const root = readFileSync(resolve(source, 'index.ts'), 'utf8')
        const pages = resolve(import.meta.dirname, '../../../apps/documentation/src/content/pages/components')
        const pagePaths = new Set(readdirSync(pages).map((file) => readFileSync(resolve(pages, file), 'utf8').match(/^path:\s*(.+)$/m)?.[1]).filter(Boolean))
        for (const entry of h0ComponentManifest) {
            expect(existsSync(resolve(source, 'components', entry.family, 'index.ts')), entry.family).toBe(true)
            expect(root, entry.name).toContain(entry.name)
            expect(pagePaths.has(`/components/${entry.docsSlug}`), entry.docsSlug).toBe(true)
            expect(entry.styleEntry).toBe(`components/${entry.family}/style.css`)
            expect(entry.documentation).toEqual(expect.arrayContaining(['imports', 'props', 'events', 'slots', 'expose', 'accessibility', 'css', 'performance']))
            expect(entry.axe).toBe(true)
        }
        for (const family of ['EmptyState', 'Field', 'Link', 'ScrollArea', 'Tabs', 'Tooltip']) {
            expect(h0ComponentManifest.find((entry) => entry.family === family)?.localeSection, family).toBeTruthy()
        }
    })
})
