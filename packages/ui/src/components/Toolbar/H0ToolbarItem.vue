<script setup lang="ts">
import { computed, inject } from 'vue'
import { h0ToolbarContextKey } from './Toolbar.context'

defineOptions({ name: 'H0ToolbarItem' })

withDefaults(
    defineProps<{
        disabled?: boolean
        pressed?: boolean
        value?: string | number
    }>(),
    {
        disabled: false,
        pressed: undefined,
        value: ''
    }
)

defineEmits<{
    select: [value: string | number]
}>()

const toolbar = inject(h0ToolbarContextKey)
const orientation = computed(() => toolbar?.orientation.value ?? 'horizontal')
const size = computed(() => toolbar?.size.value ?? 'md')
const fullWidth = computed(() => toolbar?.fullWidth.value ?? false)
</script>

<template>
    <button
        data-h0n-component="toolbar-item"
        data-h-toolbar-item
        type="button"
        class="h-toolbar-item"
        :class="[`h-toolbar-item--${orientation}`, `h-toolbar-item--${size}`, fullWidth && 'h-toolbar-item--full-width']"
        :disabled="disabled"
        :aria-pressed="pressed"
        @click="$emit('select', value)"
    >
        <slot />
    </button>
</template>

<style scoped>
.h-toolbar-item {
    align-items: center;
    align-self: stretch;
    background: var(--h-toolbar-background, var(--h0n-ui-button-secondary));
    border: 0;
    border-radius: var(--h0n-ui-radius-xl);
    color: var(--h-toolbar-color, var(--h0n-ui-button-secondary-contrast));
    cursor: pointer;
    display: inline-flex;
    flex: 0 1 auto;
    font-family: var(--h0n-ui-font-family);
    font-size: var(--h-toolbar-font-size, var(--h0n-ui-button-md-font-size));
    font-weight: var(--h0n-ui-font-weight-medium);
    gap: var(--h0n-ui-spacing-xs);
    justify-content: center;
    min-block-size: var(--h-toolbar-control-height, var(--h0n-ui-control-height-md));
    min-width: 0;
    padding-inline: var(--h-toolbar-inline-padding, var(--h0n-ui-spacing-md));
    position: relative;
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        color var(--h0n-ui-duration-fast) ease;
    white-space: nowrap;
}

.h-toolbar-item--sm {
    font-size: var(--h-toolbar-font-size, var(--h0n-ui-button-sm-font-size));
    min-block-size: var(--h-toolbar-control-height, var(--h0n-ui-control-height-sm));
    padding-inline: var(--h-toolbar-inline-padding, var(--h0n-ui-spacing-sm));
}

.h-toolbar-item--lg {
    font-size: var(--h-toolbar-font-size, var(--h0n-ui-button-lg-font-size));
    min-block-size: var(--h-toolbar-control-height, var(--h0n-ui-control-height-lg));
    padding-inline: var(--h-toolbar-inline-padding, var(--h0n-ui-spacing-lg));
}

.h-toolbar-item + .h-toolbar-item {
    border-radius: 0;
}

.h-toolbar-item + .h-toolbar-item::before {
    background: var(--h-toolbar-separator-color, var(--h0n-ui-color-border));
    block-size: 52%;
    content: '';
    inset-inline-start: 0;
    pointer-events: none;
    position: absolute;
    top: 24%;
    width: 1px;
}

.h-toolbar-item--vertical + .h-toolbar-item--vertical::before {
    block-size: 1px;
    height: 1px;
    inset-block-start: 0;
    inset-inline-start: 24%;
    top: 0;
    width: 52%;
}

.h-toolbar-item[aria-pressed='true'] {
    background: var(--h-toolbar-pressed-background, var(--h0n-ui-button-primary-soft));
    color: var(--h-toolbar-pressed-color, var(--h0n-ui-button-primary-soft-contrast));
}

.h-toolbar-item:focus-visible {
    box-shadow: inset 0 0 0 2px var(--h0n-ui-color-focus);
    outline: none;
    z-index: 1;
}

.h-toolbar-item:disabled {
    cursor: not-allowed;
    opacity: 0.48;
}

.h-toolbar-item--full-width {
    flex: 1 1 0;
}

.h-toolbar-item--vertical {
    width: 100%;
}

@media (hover: hover) and (pointer: fine) {
    .h-toolbar-item:hover:not(:disabled):not([aria-pressed='true']) {
        background: var(--h-toolbar-hover-background, var(--h0n-ui-button-secondary-hover));
    }
}
</style>
