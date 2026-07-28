<script setup lang="ts">
import { H0Toolbar, H0ToolbarGroup, H0ToolbarItem, H0ToolbarSeparator } from '@h0nio/ui'
import { ref } from 'vue'

const lastAction = ref('No action selected')
</script>

<template>
    <div class="toolbar-compound-example">
        <H0Toolbar aria-label="Editor actions">
            <H0ToolbarGroup aria-label="History">
                <H0ToolbarItem value="undo" @select="lastAction = 'Undo'">Undo</H0ToolbarItem>
                <H0ToolbarItem value="redo" @select="lastAction = 'Redo'">Redo</H0ToolbarItem>
            </H0ToolbarGroup>
            <H0ToolbarSeparator />
            <H0ToolbarGroup aria-label="Clipboard">
                <H0ToolbarItem value="copy" @select="lastAction = 'Copy'">Copy</H0ToolbarItem>
                <H0ToolbarItem value="paste" @select="lastAction = 'Paste'">Paste</H0ToolbarItem>
            </H0ToolbarGroup>
        </H0Toolbar>
        <output aria-live="polite">{{ lastAction }}</output>
    </div>
</template>

<style scoped>
.toolbar-compound-example {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: center;
}

.toolbar-compound-example output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}

@container documentation-preview (max-width: 520px) {
    .toolbar-compound-example {
        justify-items: stretch;
    }

    .toolbar-compound-example [data-h0n-component='toolbar'] {
        overflow-x: auto;
    }
}
</style>
