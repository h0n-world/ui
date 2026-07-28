<script setup lang="ts">
import { computed, inject } from 'vue'
import { h0ToolbarContextKey } from './Toolbar.context'

defineOptions({ name: 'H0ToolbarGroup' })

withDefaults(
    defineProps<{
        ariaLabel?: string
    }>(),
    {
        ariaLabel: '',
    },
)

const toolbar = inject(h0ToolbarContextKey)
const orientation = computed(() => toolbar?.orientation.value ?? 'horizontal')
const fullWidth = computed(() => toolbar?.fullWidth.value ?? false)
</script>

<template>
    <div
        data-h0n-component="toolbar-group"
        class="h-toolbar-group"
        :class="[`h-toolbar-group--${orientation}`, fullWidth && 'h-toolbar-group--full-width']"
        role="group"
        :aria-label="ariaLabel || undefined"
    >
        <slot />
    </div>
</template>

<style scoped>
.h-toolbar-group {
    align-items: stretch;
    background: var(--h-toolbar-background, var(--h0n-ui-button-secondary));
    border-radius: var(--h0n-ui-radius-xl);
    color: var(--h-toolbar-color, var(--h0n-ui-button-secondary-contrast));
    display: inline-flex;
    isolation: isolate;
    min-width: 0;
    overflow: hidden;
}

.h-toolbar-group--vertical {
    flex-direction: column;
}

.h-toolbar-group--full-width {
    display: flex;
    flex: 1 1 0;
}

.h-toolbar-group--vertical.h-toolbar-group--full-width {
    width: 100%;
}
</style>
