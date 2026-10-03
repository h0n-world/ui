/** Tokens and CSP nonces must stay unpredictable, including on local HTTP origins. */
export function createEditorToken(): string {
    if (typeof globalThis.crypto?.randomUUID === 'function') {
        return globalThis.crypto.randomUUID().replaceAll('-', '')
    }
    if (typeof globalThis.crypto?.getRandomValues === 'function') {
        const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16))
        return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
    }
    throw new Error('Secure random generation is unavailable in this browser.')
}
