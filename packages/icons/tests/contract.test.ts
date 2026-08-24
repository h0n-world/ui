import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { iconCatalog, iconCategories, iconStyles } from '../src/catalog.js'

const packageRoot = resolve(import.meta.dirname, '..')
const svgNames = readdirSync(resolve(packageRoot, 'src/svg'))
    .filter((file) => file.endsWith('.svg'))
    .map((file) => file.slice(0, -4))
    .sort()

describe('generated icon contract', () => {
    it('keeps names and metadata synchronized', () => {
        expect(Object.keys(iconCatalog).sort()).toEqual(svgNames)
        expect(new Set(svgNames).size).toBe(svgNames.length)
    })

    it('uses declared styles, categories, and normalized tags', () => {
        for (const [name, metadata] of Object.entries(iconCatalog)) {
            expect(iconStyles).toContain(metadata.style)
            expect(metadata.categories.length, name).toBeGreaterThan(0)
            expect(new Set(metadata.categories).size, name).toBe(metadata.categories.length)
            for (const category of metadata.categories) expect(iconCategories).toContain(category)
            expect(new Set(metadata.tags).size, name).toBe(metadata.tags.length)
            for (const tag of metadata.tags) expect(tag, name).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        }
    })

    it('generates definitions with an explicit non-literal public type', () => {
        const source = readFileSync(resolve(packageRoot, 'src/icons/accessibility-duotone.ts'), 'utf8')
        expect(source).toContain(': IconDefinition =')
        expect(source).not.toContain('as const satisfies IconDefinition')
    })

    it('keeps historical names searchable by corrected spelling', () => {
        expect(iconCatalog['magnifer'].tags).toContain('magnifier')
        expect(iconCatalog['archive-down-minimlistic'].tags).toContain('minimalistic')
        expect(iconCatalog['siderbar'].tags).toContain('sidebar')
    })
})
