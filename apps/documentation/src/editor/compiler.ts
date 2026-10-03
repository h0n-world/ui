import { parse, compileScript, compileTemplate, compileStyle } from 'vue/compiler-sfc'
import ts from 'typescript'
import { resolveImport, validateProject, type EditorFiles } from './project'

export interface CompiledProject { modules: Record<string, string>; imports: Record<string, string>; css: string }

export function compileProject(input: EditorFiles): CompiledProject {
    const files = validateProject(input)
    const modules: Record<string, string> = {}
    const imports: Record<string, string> = {}
    const styles: string[] = []
    for (const [filename, source] of Object.entries(files)) {
        try {
            if (filename.endsWith('.css')) {
                styles.push(source)
                modules[filename] = ''
                continue
            }
            let code = source
            if (filename.endsWith('.vue')) {
                const { descriptor, errors } = parse(source, { filename })
                if (errors.length) throw errors[0]
                if (descriptor.customBlocks.length) throw new Error('Custom blocks are unavailable.')
                for (const block of [descriptor.script, descriptor.scriptSetup, descriptor.template, ...descriptor.styles]) {
                    if (block?.src) throw new Error('External SFC blocks are unavailable. Use local imports.')
                }
                if (descriptor.template?.lang && descriptor.template.lang !== 'html') throw new Error('Only HTML templates are supported.')
                if ([descriptor.script, descriptor.scriptSetup].some(block => block?.lang && !['ts', 'js'].includes(block.lang))) throw new Error('Only TypeScript and JavaScript scripts are supported.')
                const id = `data-v-editor-${filename.replace(/\W/g, '-')}`
                const script = descriptor.script || descriptor.scriptSetup
                    ? compileScript(descriptor, { id, genDefaultAs: '__component' }) : undefined
                const template = compileTemplate({
                    source: descriptor.template?.content ?? '', filename, id,
                    scoped: descriptor.styles.some(style => style.scoped),
                    compilerOptions: { bindingMetadata: script?.bindings, isTS: true },
                    transformAssetUrls: false,
                })
                if (template.errors.length) throw template.errors[0]
                code = `${script?.content ?? 'const __component = {}'}\n${template.code}\n__component.render = render;\n__component.__scopeId = ${JSON.stringify(id)};\nexport default __component;`
                for (const style of descriptor.styles) {
                    if (style.lang && style.lang !== 'css') throw new Error('Only CSS is supported; SCSS preprocessors are unavailable.')
                    if (style.module) throw new Error('CSS modules are unavailable; use scoped CSS.')
                    const result = compileStyle({ source: style.content, filename, id, scoped: style.scoped })
                    if (result.errors.length) throw result.errors[0]
                    styles.push(result.code)
                }
            }
            const ast = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
            const visit = (node: ts.Node) => {
                if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
                    const specifier = node.moduleSpecifier
                    if (specifier && ts.isStringLiteral(specifier)) imports[specifier.text] = resolveImport(specifier.text, files)
                }
                if (ts.isImportEqualsDeclaration(node)) throw new Error('Use ES import syntax.')
                if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) throw new Error('Dynamic imports are unavailable.')
                ts.forEachChild(node, visit)
            }
            visit(ast)
            const output = ts.transpileModule(code, {
                fileName: filename.replace(/\.vue$/, '.ts'), reportDiagnostics: true,
                compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
            })
            const errors = output.diagnostics?.filter(item => item.category === ts.DiagnosticCategory.Error)
            if (errors?.length) throw new Error(ts.flattenDiagnosticMessageText(errors[0].messageText, '\n'))
            modules[filename] = output.outputText
        } catch (error) { throw new Error(`${filename}: ${error instanceof Error ? error.message : String(error)}`) }
    }
    return { modules, imports, css: styles.join('\n') }
}
