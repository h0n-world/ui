import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const componentsDirectory = resolve(import.meta.dirname, '../src/components')

function vueFiles(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = resolve(directory, entry.name)
        return entry.isDirectory() ? vueFiles(path) : entry.name.endsWith('.vue') ? [path] : []
    })
}

describe('source-level accessibility and motion contracts', () => {
    it('uses motion tokens instead of fixed shared durations', () => {
        const violations = vueFiles(componentsDirectory).filter((file) => /\b(?:160|180|220)ms\b/.test(readFileSync(file, 'utf8')))
        expect(violations).toEqual([])
    })

    it('does not hard-code public aria labels in templates', () => {
        const violations = vueFiles(componentsDirectory).filter((file) => /\saria-label="[A-Za-z]/.test(readFileSync(file, 'utf8')))
        expect(violations).toEqual([])
    })

    it('keeps locale fallbacks centralized instead of redeclaring English defaults in components', () => {
        const violations = vueFiles(componentsDirectory).filter((file) => /useH0LocaleSection\([^\n]+,\s*\{/.test(readFileSync(file, 'utf8')))
        expect(violations).toEqual([])
    })
})
