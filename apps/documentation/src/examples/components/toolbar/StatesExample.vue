<script setup lang="ts">
import { H0Toolbar, type H0ToolbarItemDefinition } from '@h0nio/ui'

const items: H0ToolbarItemDefinition[] = [
    { value: 'undo', label: 'Undo' },
    { value: 'redo', label: 'Redo', disabled: true },
    { value: 'history', label: 'History' },
]
</script>

<template>
    <div class="toolbar-states-example">
        <H0Toolbar :items="items" aria-label="Document history" />
        <span>Redo is unavailable; arrow navigation skips it.</span>
    </div>
</template>

<style scoped>
.toolbar-states-example {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: center;
    text-align: center;
}

.toolbar-states-example span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
