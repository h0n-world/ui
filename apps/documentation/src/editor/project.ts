export type EditorFilename = 'App.vue' | 'style.css'
export type EditorFiles = Record<EditorFilename, string>
export const draftKey = 'h0n-documentation-editor:v2'
export const legacyDraftKey = 'h0n-documentation-editor:v1'
export const maxProjectSize = 300_000
export const starterFiles: EditorFiles = {
    'App.vue': `<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Card } from '@h0nio/ui'

const count = ref(0)
</script>

<template>
  <main class="demo">
    <H0Card>
      <template #header>Your component playground</template>
      <template #description>Vue + H0N UI, ready to compose.</template>
      <p aria-live="polite">You clicked {{ count }} times.</p>
      <H0Button @click="count++">Add one</H0Button>
    </H0Card>
  </main>
</template>`,
  'style.css': `body {
  background: var(--h0n-background);
  padding: 1rem;
}

.demo {
  max-width: 520px;
  margin: 32px auto;
  padding: 20px;
}
`,
}

export function validateProject(value: unknown): EditorFiles {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new Error('Invalid project file.')
    const entries = Object.entries(value)
    if (
        entries.length !== 2 ||
        !Object.hasOwn(value, 'App.vue') ||
        !Object.hasOwn(value, 'style.css')
    ) {
        throw new Error(
            'This editor accepts exactly App.vue and style.css. Legacy multi-file projects are preserved separately; export or adapt their code before importing.',
        )
    }
    for (const [name, source] of entries) {
        if (typeof source !== 'string') throw new Error(`Invalid file: ${name}`)
    }
    if (JSON.stringify(value).length > maxProjectSize)
        throw new Error('Project exceeds the 300 KB limit.')
    return {
        'App.vue': (value as EditorFiles)['App.vue'],
        'style.css': (value as EditorFiles)['style.css'],
    }
}

export function resolveImport(specifier: string, _files: EditorFiles): string {
    if (['vue', '@h0nio/ui', '@h0nio/ui/icons'].includes(specifier)) return specifier
    if (specifier === './style.css') return 'style.css'
    throw new Error(
        `Import "${specifier}" is unavailable. Use vue, @h0nio/ui or @h0nio/ui/icons. style.css is included automatically.`,
    )
}
