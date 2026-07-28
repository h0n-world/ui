<script setup lang="ts">
import { computed, inject } from 'vue'
import { h0ToolbarContextKey } from './Toolbar.context'

defineOptions({ name: 'H0ToolbarSeparator' })

const toolbar = inject(h0ToolbarContextKey)
const toolbarOrientation = computed(() => toolbar?.orientation.value ?? 'horizontal')
const separatorOrientation = computed(() => (toolbarOrientation.value === 'horizontal' ? 'vertical' : 'horizontal'))
</script>

<template>
    <span
        data-h0n-component="toolbar-separator"
        class="h-toolbar-separator"
        :class="`h-toolbar-separator--${separatorOrientation}`"
        role="separator"
        :aria-orientation="separatorOrientation"
    />
</template>

<style scoped>
.h-toolbar-separator {
    align-self: stretch;
    background: var(--h-toolbar-separator-color, var(--h0n-ui-color-border));
    flex: 0 0 auto;
}

.h-toolbar-separator--vertical {
    margin-block: var(--h0n-ui-spacing-xs);
    width: 1px;
}

.h-toolbar-separator--horizontal {
    height: 1px;
    margin-inline: var(--h0n-ui-spacing-xs);
}
</style>
