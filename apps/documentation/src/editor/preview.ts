import { runtimeJsUrl, runtimeCssUrl } from 'virtual:editor-runtime'
import type { CompiledProject } from './compiler'
import { createEditorToken } from './random'

let runtime: Promise<{ js: string; css: string }> | undefined
async function getRuntime() {
    return runtime ??= Promise.all([runtimeJsUrl, runtimeCssUrl].map(async url => {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Could not load preview runtime.')
        return response.text()
    })).then(([js, css]) => ({ js, css })).catch(error => { runtime = undefined; throw error })
}
const safeScript = (value: string) => value.replace(/</g, '\\u003c')
const safeStyle = (value: string) => value.replace(/<\/style/gi, '<\\/style')

export async function createPreview(project: CompiledProject, theme: 'light' | 'dark', token: string) {
    const { js, css } = await getRuntime()
    const nonce = createEditorToken()
    // Opaque origin plus CSP: no remote code, requests, parent DOM/storage or nested frames.
    const csp = `default-src 'none'; script-src 'nonce-${nonce}' 'unsafe-eval'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; font-src 'none'; frame-src 'none'; worker-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'`
    return `<!doctype html><html data-h0n-theme="${theme}"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="${csp}"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${safeStyle(css)}\nhtml{background:var(--h0n-background)}body{margin:0;background:var(--h0n-background);color:var(--h0n-ui-color-text);font-family:system-ui,sans-serif;box-sizing:border-box;min-height:100vh}#app{container:documentation-preview / inline-size}\n${safeStyle(project.css)}</style></head><body><div id="app"></div><script nonce="${nonce}">window.__H0_EDITOR__=${safeScript(JSON.stringify({ project, theme, token }))};</script><script nonce="${nonce}">${js.replace(/<\/script/gi, '<\\/script')}</script></body></html>`
}
