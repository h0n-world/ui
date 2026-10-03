import ts from 'typescript'
import {
    createVueLanguagePlugin,
    getDefaultCompilerOptions,
    forEachEmbeddedCode,
    type VueVirtualCode,
    type CodeInformation,
} from '@vue/language-core'
import { SourceMap } from '@volar/source-map'
import { parse } from 'vue/compiler-sfc'
import type { EditorCompletion, EditorDiagnostic, LanguageAssets } from './language-types'

const sourcePath = '/App.vue'
const servicePath = '/App.vue.ts'

export function createEditorLanguageService(assets: LanguageAssets) {
    const options: ts.CompilerOptions = {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        strict: true,
        skipLibCheck: true,
        allowJs: true,
        checkJs: true,
        jsx: ts.JsxEmit.Preserve,
        allowImportingTsExtensions: true,
        noEmit: true,
        types: [],
    }
    const plugin = createVueLanguagePlugin<string>(
        ts,
        options,
        getDefaultCompilerOptions(3.5, 'vue', true, '/vue-types'),
        (id) => id,
    )
    let source = ''
    let version = 0
    let virtualText = ''
    let map = new SourceMap<CodeInformation>([])
    let root: VueVirtualCode | undefined
    const declarations = assets.files
    const snapshotCache = new Map<string, ts.IScriptSnapshot>()
    const resolveModule = (
        name: string,
        containingFile: string,
    ): ts.ResolvedModuleFull | undefined => {
        const file =
            assets.resolutions[containingFile]?.[name] ??
            assets.entries[name] ??
            (containingFile === servicePath && name === './style.css'
                ? '/style.css.d.ts'
                : undefined)
        return file ? { resolvedFileName: file, extension: ts.Extension.Dts } : undefined
    }
    const host: ts.LanguageServiceHost = {
        getCompilationSettings: () => options,
        getScriptFileNames: () => [servicePath, ...Object.keys(declarations), '/style.css.d.ts'],
        getScriptVersion: (name) => (name === servicePath ? String(version) : '0'),
        getScriptSnapshot(name) {
            if (name === servicePath) return ts.ScriptSnapshot.fromString(virtualText)
            const text = name === '/style.css.d.ts' ? 'export {}' : declarations[name]
            if (text === undefined) return
            if (!snapshotCache.has(name))
                snapshotCache.set(name, ts.ScriptSnapshot.fromString(text))
            return snapshotCache.get(name)
        },
        getCurrentDirectory: () => '/',
        getDefaultLibFileName: () => assets.defaultLib,
        fileExists: (name) => name === servicePath || Object.hasOwn(declarations, name),
        readFile: (name) => (name === servicePath ? virtualText : declarations[name]),
        resolveModuleNames: (names, containing) =>
            names.map((name) => resolveModule(name, containing)),
        resolveTypeReferenceDirectives: (names) =>
            names.map((name) => {
                const value = typeof name === 'string' ? name : name.fileName
                const path = value.startsWith('./') ? value.slice(1) : value
                return Object.hasOwn(declarations, path)
                    ? { resolvedFileName: path, primary: true }
                    : undefined
            }),
    }
    const service = ts.createLanguageService(host)
    function update(nextSource: string) {
        if (nextSource === source && version) return
        source = nextSource
        const virtual = plugin.createVirtualCode!(
            sourcePath,
            'vue',
            ts.ScriptSnapshot.fromString(source),
            { getAssociatedScript: () => undefined },
        )
        root = virtual
        const code =
            virtual &&
            [...forEachEmbeddedCode(virtual)].find((code) =>
                /^script_(js|jsx|ts|tsx)$/.test(code.id),
            )
        if (!code) throw new Error('Vue language service could not generate TypeScript.')
        virtualText = code.snapshot.getText(0, code.snapshot.getLength())
        map = new SourceMap(code.mappings)
        version++
    }
    function diagnostics(nextSource: string): EditorDiagnostic[] {
        update(nextSource)
        const result: EditorDiagnostic[] = []
        const parsed = parse(source, { filename: 'App.vue' })
        for (const error of parsed.errors) {
            const location = typeof error === 'object' && 'loc' in error ? error.loc : undefined
            result.push({
                from: location?.start.offset ?? 0,
                to: location?.end.offset ?? 1,
                severity: 'error',
                message: typeof error === 'string' ? error : error.message,
            })
        }
        for (const item of [
            ...service.getSyntacticDiagnostics(servicePath),
            ...service.getSemanticDiagnostics(servicePath),
        ]) {
            if (item.start === undefined) continue
            const mapped = map
                .toSourceRange(item.start, item.start + (item.length ?? 1), true, (data) => {
                    const verification = data.verification
                    return typeof verification === 'object'
                        ? verification.shouldReport?.('ts', item.code) !== false
                        : !!verification
                })
                .next().value
            if (!mapped) continue
            const [from, to] = mapped
            result.push({
                from,
                to: Math.max(from + 1, to),
                severity: item.category === ts.DiagnosticCategory.Warning ? 'warning' : 'error',
                message: `TS${item.code}: ${ts.flattenDiagnosticMessageText(item.messageText, '\n')}`,
            })
        }
        return [...new Map(result.map((item) => [`${item.from}:${item.message}`, item])).values()]
    }
    function completions(nextSource: string, position: number): EditorCompletion[] {
        update(nextSource)
        const result = new Map<string, EditorCompletion>()
        for (const [generated] of map.toGeneratedLocation(position, (data) => !!data.completion)) {
            const entries = service.getCompletionsAtPosition(servicePath, generated, {
                includeCompletionsForModuleExports: false,
                includeCompletionsWithInsertText: false,
            })
            for (const entry of entries?.entries ?? []) {
                if (entry.name.startsWith('__VLS') || entry.name.startsWith('__vue')) continue
                result.set(entry.name, {
                    label: entry.name,
                    type:
                        entry.kind === 'function'
                            ? 'function'
                            : entry.kind === 'method'
                              ? 'method'
                              : entry.kind === 'const'
                                ? 'constant'
                                : entry.kind === 'keyword'
                                  ? 'keyword'
                                  : 'variable',
                    detail: entry.kind,
                })
            }
        }
        return [...result.values()].slice(0, 500)
    }
    return {
        diagnostics,
        completions,
        dispose() {
            service.dispose()
            if (root) plugin.disposeVirtualCode?.(sourcePath, root)
        },
    }
}
