import { afterEach, expect, it, vi } from 'vitest'
import { createEditorToken } from '../src/editor/random'

afterEach(() => vi.unstubAllGlobals())

it('uses randomUUID when available', () => {
    vi.stubGlobal('crypto', { randomUUID: () => '12345678-1234-1234-1234-123456789abc' })
    expect(createEditorToken()).toBe('12345678123412341234123456789abc')
})

it('uses all 16 random bytes when randomUUID is unavailable', () => {
    const getRandomValues = vi.fn((bytes: Uint8Array) => {
        bytes.set(Array.from({ length: 16 }, (_, index) => index * 17))
        return bytes
    })
    vi.stubGlobal('crypto', { getRandomValues })
    expect(createEditorToken()).toBe('00112233445566778899aabbccddeeff')
    expect(getRandomValues).toHaveBeenCalledOnce()
})

it('does not substitute insecure randomness for tokens and CSP nonces', () => {
    vi.stubGlobal('crypto', undefined)
    expect(() => createEditorToken()).toThrow('Secure random generation is unavailable')
})
