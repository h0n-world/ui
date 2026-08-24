import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
    assertPathInside,
    resolveImportSource,
    sourceArgument,
} from '../scripts/import-source.mjs'

describe('maintenance import source', () => {
    it('accepts inline, separated, and environment source configuration', () => {
        expect(sourceArgument(['--source=icons'], {})).toBe('icons')
        expect(sourceArgument(['--source', 'assets'], {})).toBe('assets')
        expect(sourceArgument([], { H0N_ICONS_SOURCE_DIR: 'environment-icons' })).toBe(
            'environment-icons',
        )
    })

    it('requires an explicit available directory', async () => {
        await expect(resolveImportSource({ args: [], environment: {} })).rejects.toThrow(
            'Missing icon source directory',
        )
        await expect(
            resolveImportSource({ args: ['--source', import.meta.dirname], environment: {} }),
        ).resolves.toBe(resolve(import.meta.dirname))
    })

    it('rejects maintenance targets outside the intended directory', () => {
        expect(() => assertPathInside(import.meta.dirname, resolve(import.meta.dirname, 'fixture.svg')))
            .not.toThrow()
        expect(() => assertPathInside(import.meta.dirname, resolve(import.meta.dirname, '../outside.svg')))
            .toThrow('Unsafe target path')
    })
})
