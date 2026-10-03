<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useH0Theme } from '@h0nio/ui'
import { Compartment, EditorState } from '@codemirror/state'
import {
    EditorView,
    keymap,
    lineNumbers,
    highlightActiveLine,
    highlightActiveLineGutter,
    drawSelection,
} from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import {
    HighlightStyle,
    syntaxHighlighting,
    bracketMatching,
    indentOnInput,
} from '@codemirror/language'
import { tags as tokenTags } from '@lezer/highlight'
import {
    autocompletion,
    completionKeymap,
    closeBrackets,
    closeBracketsKeymap,
    type CompletionContext,
} from '@codemirror/autocomplete'
import { css, cssCompletionSource } from '@codemirror/lang-css'
import { html, htmlCompletionSourceWith, type TagSpec } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { lintGutter, setDiagnostics, type Diagnostic } from '@codemirror/lint'
import { componentAgentRecords } from '@/content/agent/records'
import { createLanguageClient } from './language-client'
import type { EditorDiagnostic } from './language-types'
import type { EditorFilename } from './project'

const props = defineProps<{ modelValue: string; filename: EditorFilename; appSource: string }>()
const emit = defineEmits<{
    'update:modelValue': [value: string]
    run: []
    diagnostics: [items: EditorDiagnostic[]]
    'check-status': [value: string]
}>()
const container = ref<HTMLDivElement>()
const theme = useH0Theme()
let view: EditorView | undefined
let client: ReturnType<typeof createLanguageClient> | undefined
let timer: ReturnType<typeof setTimeout> | undefined
let checkRevision = 0
let destroyed = false
const states = new Map<EditorFilename, EditorState>()
let currentFilename: EditorFilename = props.filename
let currentDiagnostics: EditorDiagnostic[] = []
const highlighting = new Compartment()
function highlightTheme() {
    const dark = theme.resolvedTheme.value === 'dark'
    return syntaxHighlighting(
        HighlightStyle.define([
            { tag: tokenTags.keyword, color: dark ? '#c792ea' : '#7c3aed' },
            {
                tag: [tokenTags.string, tokenTags.attributeValue],
                color: dark ? '#c3e88d' : '#2c6833',
            },
            { tag: [tokenTags.tagName, tokenTags.typeName], color: dark ? '#82aaff' : '#1d4ed8' },
            { tag: tokenTags.attributeName, color: dark ? '#ffcb6b' : '#805700' },
            { tag: [tokenTags.number, tokenTags.bool], color: dark ? '#f78c6c' : '#a23700' },
            { tag: tokenTags.comment, color: dark ? '#a1a1aa' : '#64748b', fontStyle: 'italic' },
            {
                tag: tokenTags.definition(tokenTags.variableName),
                color: dark ? '#89ddff' : '#0e7490',
            },
        ]),
    )
}

const kebab = (value: string) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
const tags: Record<string, TagSpec> = Object.fromEntries(
    componentAgentRecords.map((record) => [
        record.component,
        {
            attrs: Object.fromEntries(
                record.api.props
                    .flatMap((prop) => {
                        const type =
                            record.api.types
                                .find((item) => item.name === prop.type)
                                ?.fields.map((item) => item.type)
                                .join(' ') ?? prop.type
                        const values = [...type.matchAll(/'([^']+)'/g)].map((match) => match[1])
                        return [
                            [kebab(prop.name), values.length ? values : null],
                            [`:${kebab(prop.name)}`, null],
                        ]
                    })
                    .concat(record.api.events.map((event) => [`@${event.name}`, null])),
            ),
        },
    ]),
)
const htmlComplete = htmlCompletionSourceWith({
    extraTags: tags,
    extraGlobalAttributes: {
        'v-if': null,
        'v-for': null,
        'v-model': null,
        'v-show': null,
        ':class': null,
        ':style': null,
        '@click': null,
    },
})

function inBlock(source: string, position: number, tag: string) {
    const start = source.lastIndexOf(`<${tag}`, position)
    return (
        start >= 0 &&
        source.indexOf('>', start) < position &&
        source.lastIndexOf(`</${tag}>`, position) < start
    )
}
async function typeCompletions(context: CompletionContext) {
    if (props.filename !== 'App.vue' || !client) return null
    const source = context.state.doc.toString()
    const before = source.slice(0, context.pos)
    const script = inBlock(source, context.pos, 'script')
    const expression =
        before.lastIndexOf('{{') > before.lastIndexOf('}}') ||
        /(?:[:@][\w-]+|v-[\w-]+)="[^"]*$/.test(before)
    if (!script && !expression) return null
    const word = context.matchBefore(/[\w$]*/)
    if (!word || (!context.explicit && !word.text && before.at(-1) !== '.')) return null
    try {
        const options = await client.complete(source, context.pos)
        if (context.aborted) return null
        return { from: word.from, options, validFor: /^[\w$]*$/ }
    } catch {
        return null
    }
}
function htmlCompletions(context: CompletionContext) {
    if (props.filename !== 'App.vue') return null
    const source = context.state.doc.toString()
    if (inBlock(source, context.pos, 'script') || inBlock(source, context.pos, 'style')) return null
    return htmlComplete(context)
}
function styleCompletions(context: CompletionContext) {
    if (
        props.filename !== 'style.css' &&
        !inBlock(context.state.doc.toString(), context.pos, 'style')
    )
        return null
    return cssCompletionSource(context)
}
function applyDiagnostics() {
    if (!view) return
    const length = view.state.doc.length
    const diagnostics: Diagnostic[] =
        currentFilename === 'App.vue'
            ? currentDiagnostics.map((item) => ({
                  ...item,
                  from: Math.min(item.from, length),
                  to: Math.min(item.to, length),
              }))
            : []
    view.dispatch(setDiagnostics(view.state, diagnostics))
}
async function check(source: string) {
    const revision = ++checkRevision
    emit('check-status', 'Checking TypeScript…')
    try {
        const items = await client!.check(source)
        if (destroyed || revision !== checkRevision) return
        currentDiagnostics = items
        emit('diagnostics', items)
        emit(
            'check-status',
            items.length ? `${items.length} type or syntax issues` : 'TypeScript checked',
        )
        applyDiagnostics()
    } catch (error) {
        if (destroyed || revision !== checkRevision) return
        currentDiagnostics = []
        emit('diagnostics', [])
        emit(
            'check-status',
            `Type checking unavailable: ${error instanceof Error ? error.message : String(error)}`,
        )
        applyDiagnostics()
    }
}
function scheduleCheck(source: string) {
    ++checkRevision
    clearTimeout(timer)
    timer = setTimeout(() => void check(source), 450)
}
function createState(filename: EditorFilename, source: string) {
    return EditorState.create({
        doc: source,
        extensions: [
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightActiveLine(),
            drawSelection(),
            history(),
            indentOnInput(),
            bracketMatching(),
            closeBrackets(),
            highlighting.of(highlightTheme()),
            lintGutter(),
            filename === 'style.css'
                ? css()
                : html({
                      selfClosingTags: true,
                      nestedLanguages: [
                          {
                              tag: 'script',
                              attrs: (attrs) => attrs.lang === 'ts',
                              parser: javascript({ typescript: true }).language.parser,
                          },
                      ],
                  }),
            autocompletion({ override: [htmlCompletions, typeCompletions, styleCompletions] }),
            keymap.of([
                {
                    key: 'Mod-Enter',
                    run: () => {
                        emit('run')
                        return true
                    },
                },
                ...completionKeymap,
                ...closeBracketsKeymap,
                ...defaultKeymap,
                ...historyKeymap,
                indentWithTab,
            ]),
            EditorView.contentAttributes.of({
                'aria-label': `Source code for ${filename}`,
                'aria-multiline': 'true',
                spellcheck: 'false',
            }),
            EditorState.tabSize.of(2),
            EditorView.updateListener.of((update) => {
                if (!update.docChanged) return
                const source = update.state.doc.toString()
                emit('update:modelValue', source)
                if (currentFilename === 'App.vue') scheduleCheck(source)
            }),
            EditorView.theme(
                {
                    '&': {
                        height: '520px',
                        fontSize: '13px',
                        background: 'var(--h0n-ui-color-background)',
                        color: 'var(--h0n-ui-color-text)',
                    },
                    '.cm-scroller': {
                        overflow: 'auto',
                        fontFamily: 'ui-monospace,Consolas,monospace',
                        lineHeight: '1.7',
                    },
                    '.cm-gutters': {
                        background: 'var(--h0n-ui-color-secondary)',
                        color: 'var(--h0n-ui-color-text-secondary)',
                        borderRight: '1px solid var(--h0n-ui-color-border)',
                    },
                    '.cm-activeLine,.cm-activeLineGutter': {
                        background: 'var(--h0n-ui-color-surface-hover)',
                    },
                    '.cm-content': { caretColor: 'var(--h0n-ui-color-text)', padding: '12px 0' },
                    '.cm-line': { padding: '0 12px' },
                    '.cm-tooltip': {
                        background: 'var(--h0n-ui-color-background)',
                        color: 'var(--h0n-ui-color-text)',
                        borderColor: 'var(--h0n-ui-color-border)',
                    },
                    '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
                        background: 'var(--h0n-ui-color-primary)',
                        color: 'var(--h0n-ui-color-primary-foreground)',
                    },
                    '.cm-cursor': { borderLeftColor: 'var(--h0n-ui-color-text)' },
                    '&.cm-focused': {
                        outline: '2px solid var(--h0n-ui-color-primary)',
                        outlineOffset: '-2px',
                    },
                },
                { dark: theme.resolvedTheme.value === 'dark' },
            ),
        ],
    })
}
watch(
    () => [props.filename, props.modelValue] as const,
    ([filename, source]) => {
        if (!view) return
        if (filename !== currentFilename) {
            states.set(currentFilename, view.state)
            currentFilename = filename
            let state = states.get(filename) ?? createState(filename, source)
            if (state.doc.toString() !== source)
                state = state.update({
                    changes: { from: 0, to: state.doc.length, insert: source },
                }).state
            view.setState(state)
            applyDiagnostics()
        } else if (view.state.doc.toString() !== source) {
            view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: source } })
        }
        if (filename === 'App.vue') scheduleCheck(source)
    },
)
onMounted(() => {
    client = createLanguageClient()
    view = new EditorView({
        state: createState(props.filename, props.modelValue),
        parent: container.value,
    })
    void check(props.appSource)
})
watch(() => props.appSource, scheduleCheck)
watch(theme.resolvedTheme, () => {
    states.clear()
    view?.dispatch({ effects: highlighting.reconfigure(highlightTheme()) })
})
onBeforeUnmount(() => {
    destroyed = true
    ++checkRevision
    clearTimeout(timer)
    view?.destroy()
    client?.dispose()
    states.clear()
})
defineExpose({
    focusDiagnostic(position: number) {
        if (!view) return
        const from = Math.min(position, view.state.doc.length)
        view.dispatch({
            selection: { anchor: from },
            effects: EditorView.scrollIntoView(from, { y: 'center' }),
        })
        view.focus()
    },
})
</script>

<template><div ref="container" class="code-editor" /></template>
<style scoped>
.code-editor {
    min-width: 0;
    flex: 1;
    overflow: hidden;
}
@media (max-width: 900px) {
    .code-editor :deep(.cm-editor) {
        height: 380px !important;
    }
}
</style>
