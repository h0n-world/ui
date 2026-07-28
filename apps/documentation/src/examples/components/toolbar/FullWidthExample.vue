<script setup lang="ts">
import { H0Toolbar, H0ToolbarGroup, H0ToolbarItem, type H0ToolbarItemDefinition } from '@h0nio/ui'

const formatting: H0ToolbarItemDefinition[] = [
    { value: 'bold', label: 'Bold', pressed: true },
    { value: 'italic', label: 'Italic' },
    { value: 'underline', label: 'Underline' },
]
</script>

<template>
    <div class="toolbar-full-width-example">
        <H0Toolbar full-width :items="formatting" aria-label="Text formatting" />
        <H0Toolbar full-width aria-label="Document actions">
            <H0ToolbarGroup aria-label="History actions">
                <H0ToolbarItem value="undo">Undo</H0ToolbarItem>
                <H0ToolbarItem value="redo">Redo</H0ToolbarItem>
            </H0ToolbarGroup>
            <H0ToolbarGroup aria-label="Sharing actions">
                <H0ToolbarItem value="comment">Comment</H0ToolbarItem>
                <H0ToolbarItem value="share">Share</H0ToolbarItem>
                <H0ToolbarItem value="export">Export</H0ToolbarItem>
            </H0ToolbarGroup>
        </H0Toolbar>
    </div>
</template>

<style scoped>
.toolbar-full-width-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    margin-inline: auto;
    width: min(560px, 100%);
}
</style>
