<script setup lang="ts">
import { computed, inject } from 'vue'
import { h0TabsKey, panelId, tabId } from './Tabs.context'
import type { H0TabValue } from './Tabs.types'

defineOptions({
    name: 'H0Tab'
})

const props = withDefaults(
    defineProps<{
        value: H0TabValue
        disabled?: boolean
    }>(),
    {
        disabled: false
    }
)

const context = inject(h0TabsKey)!
const selected = computed(() => context.active.value === props.value)

function activate() {
    if (!props.disabled) context.set(props.value, true)
}

function focus() {
    if (context.activation === 'automatic') activate()
}
</script>

<template>
    <button
        data-h0n-component="tab"
        class="h-tab"
        role="tab"
        type="button"
        :id="tabId(context.baseId, value)"
        :aria-controls="panelId(context.baseId, value)"
        :aria-selected="selected"
        :disabled="disabled"
        :tabindex="selected ? 0 : -1"
        @click="activate"
        @focus="focus"
    >
        <slot />
    </button>
</template>

<style scoped lang="scss">
.h-tab {
    background: transparent;
    border: 0;
    color: var(--h0n-ui-color-muted);
    cursor: pointer;
    font: inherit;
    font-weight: var(--h0n-ui-font-weight-medium);
    min-block-size: var(--h0n-ui-control-height-sm);
    padding: var(--h0n-ui-spacing-sm) var(--h0n-ui-spacing-md);
    position: relative;
    transition: color var(--h0n-ui-duration-fast) ease;

    &[aria-selected='true'] {
        color: var(--h0n-ui-color-text);
    }

    &:focus-visible {
        border-radius: var(--h0n-ui-radius-sm);
        box-shadow: var(--h0n-ui-focus-ring);
        outline: none;
        z-index: 2;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: var(--h0n-ui-disabled-opacity);
    }
}
</style>
