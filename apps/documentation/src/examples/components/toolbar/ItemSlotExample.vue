<script setup lang="ts">
import { H0Toolbar, type H0ToolbarItemDefinition } from '@h0nio/ui'

const items: H0ToolbarItemDefinition[] = [
    { value: 'cut', label: 'Cut' },
    { value: 'copy', label: 'Copy' },
    { value: 'paste', label: 'Paste' },
]

const shortcuts = ['Ctrl+X', 'Ctrl+C', 'Ctrl+V']
</script>

<template>
    <H0Toolbar :items="items" aria-label="Clipboard actions">
        <template #item="{ item, index }">
            <span>{{ item.label }}</span>
            <kbd>{{ shortcuts[index] }}</kbd>
        </template>
    </H0Toolbar>
</template>

<style scoped>
span {
    margin-inline-end: var(--h0n-ui-spacing-xs);
}

kbd {
    color: var(--h0n-ui-color-muted);
    font: inherit;
    font-size: var(--h0n-ui-typography-body-xs-size);
}
</style>
