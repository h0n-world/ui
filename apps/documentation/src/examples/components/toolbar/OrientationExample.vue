<script setup lang="ts">
import { H0Toolbar, type H0ToolbarItemDefinition } from '@h0nio/ui'

const items: H0ToolbarItemDefinition[] = [
    { value: 'move', label: 'Move' },
    { value: 'duplicate', label: 'Duplicate' },
    { value: 'archive', label: 'Archive' },
]
</script>

<template>
    <div class="toolbar-orientation-example">
        <section>
            <span>Horizontal</span>
            <H0Toolbar :items="items" aria-label="Horizontal actions" />
        </section>
        <section>
            <span>Vertical, no loop</span>
            <H0Toolbar :items="items" orientation="vertical" :loop="false" aria-label="Vertical non-looping actions" />
        </section>
    </div>
</template>

<style scoped>
.toolbar-orientation-example {
    align-items: start;
    display: grid;
    gap: var(--h0n-ui-spacing-xl);
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    justify-items: center;
    width: min(640px, 100%);
}

.toolbar-orientation-example section {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: center;
}

.toolbar-orientation-example section > span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}

@container documentation-preview (max-width: 520px) {
    .toolbar-orientation-example {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
