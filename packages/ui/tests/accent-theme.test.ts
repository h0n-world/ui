import { afterEach, describe, expect, it, vi } from 'vitest'
import { createH0ThemeService } from '../src/theme'

afterEach(() => {
    vi.unstubAllGlobals()
    localStorage.clear()
})

describe('accent palettes', () => {
    it('defaults to the existing palette and isolates appearance targets', () => {
        const firstTarget = document.createElement('div')
        const secondTarget = document.createElement('div')
        const first = createH0ThemeService({ target: firstTarget })
        const second = createH0ThemeService({ target: secondTarget, accent: 'telegram', theme: 'dark' })
        expect(first.accent.value).toBe('default')
        expect(firstTarget.dataset.h0nAccent).toBe('default')
        first.setAccent('uber')
        first.setTheme('dark')
        expect(firstTarget.dataset.h0nAccent).toBe('uber')
        expect(firstTarget.dataset.h0nTheme).toBe('dark')
        expect(second.accent.value).toBe('telegram')
        expect(secondTarget.dataset.h0nAccent).toBe('telegram')
        first.setAccent('default')
        expect(firstTarget.dataset.h0nAccent).toBe('default')
        first.dispose()
        second.dispose()
    })

    it('persists accent separately from the existing theme key when opted in', () => {
        const target = document.createElement('div')
        const first = createH0ThemeService({ target, storageKey: 'appearance' })
        first.setAccent('uber')
        first.setTheme('dark')
        expect(localStorage.getItem('appearance')).toBe('dark')
        expect(localStorage.getItem('appearance:accent')).toBe('uber')
        first.dispose()
        const restored = createH0ThemeService({ target, storageKey: 'appearance', accent: 'telegram' })
        expect(restored.accent.value).toBe('uber')
        expect(restored.theme.value).toBe('dark')
        restored.dispose()
    })

    it('ignores invalid saved accents and does not persist by default', () => {
        localStorage.setItem('appearance:accent', 'unknown')
        const configured = createH0ThemeService({ target: document.createElement('div'), storageKey: 'appearance', accent: 'telegram' })
        expect(configured.accent.value).toBe('telegram')
        configured.dispose()
        const transient = createH0ThemeService({ target: document.createElement('div'), accent: 'uber' })
        transient.setAccent('default')
        expect(localStorage.getItem('appearance:accent')).toBe('unknown')
        expect(localStorage.length).toBe(1)
        transient.dispose()
    })

    it('keeps the accent across system changes and removes its media listener', () => {
        const media = new EventTarget() as EventTarget & { matches: boolean }
        media.matches = false
        const remove = vi.spyOn(media, 'removeEventListener')
        vi.stubGlobal('window', { matchMedia: () => media })
        const target = document.createElement('div')
        const service = createH0ThemeService({ target, theme: 'system', accent: 'uber' })
        const event = new Event('change')
        Object.defineProperty(event, 'matches', { value: true })
        media.dispatchEvent(event)
        expect(service.resolvedTheme.value).toBe('dark')
        expect(target.dataset.h0nTheme).toBe('dark')
        expect(target.dataset.h0nAccent).toBe('uber')
        service.dispose()
        expect(remove).toHaveBeenCalledWith('change', expect.any(Function))
    })

    it('works with denied storage and without browser globals', () => {
        const target = document.createElement('div')
        vi.stubGlobal('localStorage', {
            getItem() { throw new Error('denied') },
            setItem() { throw new Error('denied') },
        })
        const service = createH0ThemeService({ target, storageKey: 'appearance', accent: 'telegram' })
        service.setAccent('uber')
        service.setTheme('dark')
        expect(target.dataset.h0nAccent).toBe('uber')
        service.dispose()
        vi.stubGlobal('localStorage', undefined)
        vi.stubGlobal('window', undefined)
        vi.stubGlobal('document', undefined)
        const server = createH0ThemeService({ accent: 'telegram', theme: 'system' })
        server.setAccent('uber')
        expect(server.accent.value).toBe('uber')
        expect(server.resolvedTheme.value).toBe('light')
        server.dispose()
    })
})
