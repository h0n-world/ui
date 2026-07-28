<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, provide, ref, useSlots, watchEffect } from 'vue'
import { defaultH0ToolbarLocale, useH0Locale } from '../../locale'
import type { H0Orientation, H0Size } from '../../types'
import { h0ToolbarContextKey } from './Toolbar.context'
import type { H0ToolbarItemDefinition } from './Toolbar.types'

defineOptions({ name: 'H0Toolbar' })

const props = withDefaults(
    defineProps<{
        items?: readonly H0ToolbarItemDefinition[]
        orientation?: H0Orientation
        size?: H0Size
        loop?: boolean
        fullWidth?: boolean
        ariaLabel?: string
    }>(),
    {
        items: () => [],
        orientation: 'horizontal',
        size: 'md',
        loop: true,
        fullWidth: false,
        ariaLabel: ''
    }
)

const emit = defineEmits<{
    select: [item: H0ToolbarItemDefinition]
}>()

const localeService = useH0Locale()
const text = computed(() => localeService.locale.value.toolbar ?? defaultH0ToolbarLocale)
const root = ref<HTMLElement>()
const activeIndex = ref(0)
const slots = useSlots()

provide(h0ToolbarContextKey, {
    fullWidth: computed(() => props.fullWidth),
    orientation: computed(() => props.orientation),
    size: computed(() => props.size)
})

watchEffect(() => {
    if (props.items.length && slots.default) console.warn('[H0Toolbar] Do not mix items and compound children.')
})

function getEnabledItems() {
    return Array.from(root.value?.querySelectorAll<HTMLButtonElement>('[data-h-toolbar-item]:not(:disabled)') ?? [])
}

function syncTabStops() {
    const buttons = getEnabledItems()
    activeIndex.value = Math.max(0, Math.min(activeIndex.value, Math.max(0, buttons.length - 1)))
    buttons.forEach((button, index) => {
        button.tabIndex = index === activeIndex.value ? 0 : -1
    })
}

function handleFocusIn(event: FocusEvent) {
    const buttons = getEnabledItems()
    const index = buttons.indexOf(event.target as HTMLButtonElement)
    if (index < 0) return

    activeIndex.value = index
    syncTabStops()
}

async function handleKeydown(event: KeyboardEvent) {
    const horizontal = props.orientation === 'horizontal'
    const direction = event.key === (horizontal ? 'ArrowRight' : 'ArrowDown') ? 1 : event.key === (horizontal ? 'ArrowLeft' : 'ArrowUp') ? -1 : 0
    const buttons = getEnabledItems()
    if (!buttons.length) return

    const focusedIndex = buttons.indexOf(event.target as HTMLButtonElement)
    let nextIndex = focusedIndex >= 0 ? focusedIndex : activeIndex.value

    if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = buttons.length - 1
    else if (direction) nextIndex = props.loop ? (nextIndex + direction + buttons.length) % buttons.length : Math.max(0, Math.min(buttons.length - 1, nextIndex + direction))
    else return

    event.preventDefault()
    activeIndex.value = nextIndex
    await nextTick()
    syncTabStops()
    buttons[nextIndex]?.focus()
}

onMounted(syncTabStops)
onUpdated(syncTabStops)
</script>

<template>
    <div
        ref="root"
        data-h0n-component="toolbar"
        class="h-toolbar"
        :class="[`h-toolbar--${orientation}`, `h-toolbar--${size}`, items.length ? 'h-toolbar--data' : 'h-toolbar--compound', fullWidth && 'h-toolbar--full-width']"
        role="toolbar"
        :aria-label="ariaLabel || text.label"
        :aria-orientation="orientation"
        @focusin="handleFocusIn"
        @keydown="handleKeydown"
    >
        <template v-if="items.length">
            <button
                v-for="(item, index) in items"
                :key="item.value"
                data-h-toolbar-item
                class="h-toolbar__item"
                type="button"
                :disabled="item.disabled"
                :aria-pressed="item.pressed == null ? undefined : item.pressed"
                @click="emit('select', item)"
            >
                <slot name="item" :item="item" :index="index">{{ item.label }}</slot>
            </button>
        </template>
        <slot v-else />
    </div>
</template>

<style scoped>
.h-toolbar {
    --h-toolbar-background: var(--h0n-ui-button-secondary);
    --h-toolbar-color: var(--h0n-ui-button-secondary-contrast);
    --h-toolbar-hover-background: var(--h0n-ui-button-secondary-hover);
    --h-toolbar-pressed-background: var(--h0n-ui-button-primary-soft);
    --h-toolbar-pressed-color: var(--h0n-ui-button-primary-soft-contrast);
    --h-toolbar-control-height: var(--h0n-ui-control-height-md);
    --h-toolbar-font-size: var(--h0n-ui-button-md-font-size);
    --h-toolbar-inline-padding: var(--h0n-ui-spacing-md);
    --h-toolbar-separator-color: color-mix(in srgb, var(--h-toolbar-color) 18%, transparent);

    align-items: center;
    color: var(--h-toolbar-color);
    display: inline-flex;
    font-family: var(--h0n-ui-font-family);
    max-width: 100%;
    min-width: 0;
    vertical-align: middle;
}

.h-toolbar--sm {
    --h-toolbar-control-height: var(--h0n-ui-control-height-sm);
    --h-toolbar-font-size: var(--h0n-ui-button-sm-font-size);
    --h-toolbar-inline-padding: var(--h0n-ui-spacing-sm);
}

.h-toolbar--lg {
    --h-toolbar-control-height: var(--h0n-ui-control-height-lg);
    --h-toolbar-font-size: var(--h0n-ui-button-lg-font-size);
    --h-toolbar-inline-padding: var(--h0n-ui-spacing-lg);
}

.h-toolbar--data {
    background: var(--h-toolbar-background);
    border-radius: var(--h0n-ui-radius-xl);
    gap: 0;
    overflow: hidden;
}

.h-toolbar--compound {
    gap: var(--h0n-ui-spacing-sm);
}

.h-toolbar--vertical {
    align-items: stretch;
    flex-direction: column;
}

.h-toolbar--full-width {
    display: flex;
    width: 100%;
}

.h-toolbar__item {
    align-items: center;
    align-self: stretch;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    flex: 0 1 auto;
    font: inherit;
    font-size: var(--h-toolbar-font-size);
    font-weight: var(--h0n-ui-font-weight-medium);
    gap: var(--h0n-ui-spacing-xs);
    justify-content: center;
    min-block-size: var(--h-toolbar-control-height);
    min-width: 0;
    padding-inline: var(--h-toolbar-inline-padding);
    position: relative;
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        color var(--h0n-ui-duration-fast) ease;
    white-space: nowrap;
}

.h-toolbar__item + .h-toolbar__item::before {
    background: var(--h-toolbar-separator-color);
    block-size: 52%;
    content: '';
    inset-inline-start: 0;
    pointer-events: none;
    position: absolute;
    top: 24%;
    width: 1px;
}

.h-toolbar--vertical .h-toolbar__item + .h-toolbar__item::before {
    block-size: 1px;
    height: 1px;
    inset-block-start: 0;
    inset-inline-start: 24%;
    top: 0;
    width: 52%;
}

.h-toolbar__item[aria-pressed='true'] {
    background: var(--h-toolbar-pressed-background);
    color: var(--h-toolbar-pressed-color);
}

.h-toolbar__item:focus-visible {
    box-shadow: inset 0 0 0 2px var(--h0n-ui-color-focus);
    outline: none;
    z-index: 1;
}

.h-toolbar__item:disabled {
    cursor: not-allowed;
    opacity: 0.48;
}

.h-toolbar--full-width > .h-toolbar__item {
    flex: 1 1 0;
}

.h-toolbar--vertical > .h-toolbar__item {
    width: 100%;
}

@media (hover: hover) and (pointer: fine) {
    .h-toolbar__item:hover:not(:disabled):not([aria-pressed='true']) {
        background: var(--h-toolbar-hover-background);
    }
}
</style>
