import * as Vue from 'vue'
import * as UI from '@h0nio/ui'
import * as Icons from '@h0nio/ui/icons'
import '@h0nio/ui/style.css'
import type { CompiledProject } from './compiler'

declare global {
    interface Window { __H0_EDITOR__: { project: CompiledProject; token: string; theme: 'light' | 'dark' } }
}

const { project, token, theme } = window.__H0_EDITOR__
const report = (kind: string, message: string) => parent.postMessage({ channel: 'h0-editor', token, kind, message }, '*')
const describe = (value: unknown) => {
    try { return value instanceof Error ? value.message : typeof value === 'string' ? value : JSON.stringify(value) ?? String(value) }
    catch { return String(value) }
}
window.addEventListener('error', event => report('error', event.message))
window.addEventListener('unhandledrejection', event => report('error', describe(event.reason)))
for (const method of ['log', 'warn', 'error'] as const) {
    const original = console[method].bind(console)
    console[method] = (...args: unknown[]) => { original(...args); report(method, args.map(describe).join(' ')) }
}

const dependencies: Record<string, unknown> = {
    vue: { ...Vue, __esModule: true }, '@h0nio/ui': { ...UI, __esModule: true },
    '@h0nio/ui/icons': { ...Icons, __esModule: true },
}
const cache: Record<string, { exports: Record<string, unknown> }> = Object.create(null)
function load(name: string): unknown {
    if (Object.hasOwn(dependencies, name)) return dependencies[name]
    if (Object.hasOwn(cache, name)) return cache[name].exports
    if (!Object.hasOwn(project.modules, name)) throw new Error(`Module unavailable: ${name}`)
    const module = { exports: {} }
    cache[name] = module
    new Function('require', 'module', 'exports', project.modules[name])(
        (specifier: string) => {
            const resolved = project.imports[specifier]
            if (!resolved) throw new Error(`Import unavailable: ${specifier}`)
            return load(resolved)
        }, module, module.exports,
    )
    return module.exports
}

try {
    const root = load('App.vue') as { default: Vue.Component }
    const app = Vue.createApp(root.default)
    app.use(UI.default, { theme, animation: 'low', density: 'default' })
    app.config.errorHandler = error => report('error', describe(error))
    app.mount('#app')
    report('ready', 'Preview ready')
} catch (error) { report('error', describe(error)) }
