import type { Component } from 'vue'

export type DocumentationExample = {
    component: Component
    key: string
    source: string
}

const exampleComponents = import.meta.glob('../examples/**/*.vue', {
    eager: true,
    import: 'default',
}) as Record<string, Component>

const exampleSources = import.meta.glob('../examples/**/*.vue', {
    eager: true,
    import: 'default',
    query: '?raw',
}) as Record<string, string>

function getExampleKey(file: string) {
    return file.replace('../examples/', '').replace(/\.vue$/, '')
}

const examples = new Map<string, DocumentationExample>()

for (const [file, component] of Object.entries(exampleComponents)) {
    const key = getExampleKey(file)
    const source = exampleSources[file]

    if (!source) {
        throw new Error(`[documentation] Source is missing for example "${key}".`)
    }

    examples.set(key, { component, key, source: source.trim() })
}

export function getDocumentationExample(key: string) {
    return examples.get(key)
}

export const documentationExampleKeys = [...examples.keys()].sort()
