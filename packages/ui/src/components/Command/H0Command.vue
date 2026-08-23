<script setup lang="ts">
import { searchIcon } from '../../icons'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useAttrs, useId, useTemplateRef, watch } from 'vue'
import { useH0ControllableState } from '../../composables'
import { useH0Locale } from '../../locale'
import H0Icon from '../Icon/H0Icon.vue'
import H0OverlayRoot from '../_shared/H0OverlayRoot.vue'
import type { H0CommandEmits, H0CommandItem, H0CommandProps } from './Command.types'

defineOptions({ name: 'H0Command', inheritAttrs: false })

const props = withDefaults(defineProps<H0CommandProps>(), {
    modelValue: undefined,
    defaultValue: false,
    query: undefined,
    defaultQuery: '',
    items: () => [],
    variant: 'surface',
    backdrop: 'opaque',
    size: 'md',
    windowSize: 'md',
    hotkey: '',
    triggerLabel: '',
    placeholder: '',
    emptyText: '',
    ariaLabel: '',
    disabled: false,
    closeOnSelect: true,
    closeOnBackdrop: true,
    closeOnEsc: true,
    resetQueryOnClose: true,
    showFooter: true,
    teleportTo: 'body',
    teleportDisabled: false,
    returnFocus: true,
    lockScroll: true
})

const emit = defineEmits<H0CommandEmits>()
const attrs = useAttrs()
const { locale } = useH0Locale()
const generatedId = useId()
const inputId = `h-command-input-${generatedId}`
const listId = `h-command-list-${generatedId}`
const rootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))
const resolvedTriggerLabel = computed(() => props.triggerLabel || locale.value.command.open)
const resolvedPlaceholder = computed(() => props.placeholder || locale.value.command.placeholder)
const resolvedEmptyText = computed(() => props.emptyText || locale.value.command.empty)
const resolvedAriaLabel = computed(() => props.ariaLabel || locale.value.command.label)
const triggerRef = useTemplateRef<HTMLButtonElement>('triggerRef')
const listRef = useTemplateRef<HTMLElement>('listRef')
const activeIndex = ref(-1)

const openState = useH0ControllableState<boolean>({
    modelValue: () => props.modelValue,
    defaultValue: () => props.defaultValue,
    onUpdate: (value) => emit('update:modelValue', value)
})
const currentValue = openState.value
const queryState = useH0ControllableState<string>({
    modelValue: () => props.query,
    defaultValue: () => props.defaultQuery,
    onUpdate: (value) => emit('update:query', value)
})
const currentQuery = queryState.value

function normalizedSearchValue(item: H0CommandItem) {
    return [item.label, item.description, item.group, ...(item.keywords ?? [])].filter(Boolean).join(' ').toLocaleLowerCase()
}

const filteredItems = computed(() => {
    const needle = currentQuery.value.trim().toLocaleLowerCase()
    return props.items.filter((item) => !needle || normalizedSearchValue(item).includes(needle))
})
const indexedItems = computed(() => filteredItems.value.map((item, index) => ({ item, index })))
const groups = computed(() => {
    const result: Array<{ name: string; entries: Array<{ item: H0CommandItem; index: number }> }> = []
    for (const entry of indexedItems.value) {
        const name = entry.item.group ?? ''
        const group = result.find((candidate) => candidate.name === name)
        if (group) group.entries.push(entry)
        else result.push({ name, entries: [entry] })
    }
    return result
})
const activeItem = computed(() => filteredItems.value[activeIndex.value])
const activeDescendant = computed(() => (activeIndex.value >= 0 ? `${listId}-item-${activeIndex.value}` : undefined))

function firstEnabledIndex() {
    return filteredItems.value.findIndex((item) => !item.disabled)
}

function lastEnabledIndex() {
    for (let index = filteredItems.value.length - 1; index >= 0; index -= 1) {
        if (!filteredItems.value[index]?.disabled) return index
    }
    return -1
}

function open() {
    if (props.disabled || currentValue.value) return
    openState.setValue(true)
    emit('change', true)
    emit('open')
}

function close() {
    if (!currentValue.value) return
    openState.setValue(false)
    emit('change', false)
    emit('close')
}

function toggle() {
    currentValue.value ? close() : open()
}

function focus() {
    triggerRef.value?.focus()
}

function setQuery(value: string) {
    queryState.setValue(value)
    emit('search', value)
}

function handleInput(event: Event) {
    setQuery((event.target as HTMLInputElement).value)
}

async function scrollToActiveItem(index: number) {
    await nextTick()
    if (activeIndex.value !== index) return

    const element = listRef.value?.querySelector<HTMLElement>(`[data-command-index="${index}"]`)
    element?.scrollIntoView?.({ block: 'nearest' })
}

function setActiveIndex(index: number, scrollIntoView = false) {
    activeIndex.value = index
    if (scrollIntoView) void scrollToActiveItem(index)
}

function moveActive(direction: 1 | -1) {
    if (!filteredItems.value.length) return
    let next = activeIndex.value
    for (let step = 0; step < filteredItems.value.length; step += 1) {
        next = (next + direction + filteredItems.value.length) % filteredItems.value.length
        if (!filteredItems.value[next]?.disabled) {
            setActiveIndex(next, true)
            return
        }
    }
}

function selectItem(item: H0CommandItem) {
    if (item.disabled) return
    emit('select', item)
    if (props.closeOnSelect) close()
}

function handleInputKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') moveActive(1)
    else if (event.key === 'ArrowUp') moveActive(-1)
    else if (event.key === 'Home') setActiveIndex(firstEnabledIndex(), true)
    else if (event.key === 'End') setActiveIndex(lastEnabledIndex(), true)
    else if (event.key === 'Enter' && activeItem.value) selectItem(activeItem.value)
    else return
    event.preventDefault()
}

function normalizeHotkeyKey(value: string) {
    if (value === 'space') return ' '
    if (value === 'slash') return '/'
    return value
}

function matchesHotkey(event: KeyboardEvent, hotkey: string) {
    const parts = hotkey.toLocaleLowerCase().split('+').map((part) => part.trim()).filter(Boolean)
    const key = normalizeHotkeyKey(parts.at(-1) ?? '')
    if (!key || event.key.toLocaleLowerCase() !== key) return false
    const usesMod = parts.includes('mod')
    const isMac = typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.platform)
    const expectedCtrl = parts.includes('ctrl') || (usesMod && !isMac)
    const expectedMeta = parts.includes('meta') || (usesMod && isMac)
    const expectedAlt = parts.includes('alt')
    const expectedShift = parts.includes('shift')
    return event.ctrlKey === expectedCtrl && event.metaKey === expectedMeta && event.altKey === expectedAlt && event.shiftKey === expectedShift
}

function handleGlobalKeydown(event: KeyboardEvent) {
    if (!props.hotkey || props.disabled || event.repeat || !matchesHotkey(event, props.hotkey)) return
    const target = event.target
    const isTyping = target instanceof Element && target.matches('input, textarea, select, [contenteditable="true"]')
    const hasModifier = event.ctrlKey || event.metaKey || event.altKey
    if (isTyping && !hasModifier) return
    event.preventDefault()
    toggle()
}

watch(currentValue, (isOpen, wasOpen) => {
    if (isOpen) {
        setActiveIndex(firstEnabledIndex(), true)
    } else if (wasOpen && props.resetQueryOnClose) {
        setQuery('')
    }
}, { immediate: true })

watch(filteredItems, () => {
    setActiveIndex(firstEnabledIndex(), true)
})

onMounted(() => window.addEventListener('keydown', handleGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleGlobalKeydown))

defineExpose({ close, focus, open, setQuery, toggle })
</script>

<template>
    <span v-bind="rootAttrs" data-h0n-component="command" class="h-command">
        <slot name="trigger" :open="open" :close="close" :toggle="toggle" :is-open="currentValue" :disabled="disabled">
            <button
                v-bind="triggerAttrs"
                ref="triggerRef"
                class="h-command__trigger"
                :class="[`h-command__trigger--${variant}`, `h-command__trigger--${size}`]"
                type="button"
                :disabled="disabled"
                :aria-expanded="currentValue"
                aria-haspopup="dialog"
                @click="toggle"
            >
                <H0Icon :icon="searchIcon" :size="16" :stroke-width="1.8" aria-hidden="true" />
                <span>{{ resolvedTriggerLabel }}</span>
                <kbd v-if="hotkey" class="h-command__shortcut">{{ hotkey }}</kbd>
            </button>
        </slot>

        <H0OverlayRoot
            :model-value="currentValue"
            :backdrop="backdrop"
            :close-on-backdrop="closeOnBackdrop"
            :close-on-esc="closeOnEsc"
            :teleport-to="teleportTo"
            :teleport-disabled="teleportDisabled"
            :initial-focus="`#${inputId}`"
            :return-focus="returnFocus"
            :lock-scroll="lockScroll"
            @request-close="close"
        >
            <template #default="{ panelRef }">
                <div class="h-command__positioner">
                    <section
                        :ref="panelRef"
                        class="h-command__panel"
                        :class="`h-command__panel--${windowSize}`"
                        role="dialog"
                        aria-modal="true"
                        :aria-label="resolvedAriaLabel"
                    >
                        <header v-if="$slots.header" class="h-command__header">
                            <slot name="header" :query="currentQuery" :close="close" />
                        </header>
                        <div class="h-command__search">
                            <H0Icon class="h-command__search-icon" :icon="searchIcon" :size="18" :stroke-width="1.8" aria-hidden="true" />
                            <input
                                :id="inputId"
                                class="h-command__input"
                                type="search"
                                autocomplete="off"
                                role="combobox"
                                :value="currentQuery"
                                :placeholder="resolvedPlaceholder"
                                :aria-label="resolvedPlaceholder"
                                :aria-controls="listId"
                                :aria-activedescendant="activeDescendant"
                                aria-autocomplete="list"
                                aria-expanded="true"
                                @input="handleInput"
                                @keydown="handleInputKeydown"
                            />
                            <kbd class="h-command__key">Esc</kbd>
                        </div>

                        <div :id="listId" ref="listRef" class="h-command__list" role="listbox" :aria-label="locale.command.results">
                            <template v-if="filteredItems.length">
                                <section
                                    v-for="(group, groupIndex) in groups"
                                    :key="group.name || groupIndex"
                                    class="h-command__group"
                                    role="group"
                                    :aria-labelledby="group.name ? `${listId}-group-${groupIndex}` : undefined"
                                >
                                    <div v-if="group.name" :id="`${listId}-group-${groupIndex}`" class="h-command__group-label">
                                        <slot name="group-label" :group="group.name">{{ group.name }}</slot>
                                    </div>
                                    <button
                                        v-for="entry in group.entries"
                                        :id="`${listId}-item-${entry.index}`"
                                        :key="String(entry.item.value)"
                                        class="h-command__item"
                                        :class="entry.index === activeIndex && 'h-command__item--active'"
                                        type="button"
                                        role="option"
                                        tabindex="-1"
                                        :disabled="entry.item.disabled"
                                        :aria-selected="entry.index === activeIndex"
                                        :data-command-index="entry.index"
                                        @click="selectItem(entry.item)"
                                        @pointermove="!entry.item.disabled && setActiveIndex(entry.index)"
                                    >
                                        <slot name="item" :item="entry.item" :active="entry.index === activeIndex" :query="currentQuery">
                                            <span v-if="entry.item.icon || $slots['item-start']" class="h-command__item-start">
                                                <slot name="item-start" :item="entry.item" :active="entry.index === activeIndex">
                                                    <H0Icon v-if="entry.item.icon" :icon="entry.item.icon" :size="18" :stroke-width="1.8" />
                                                </slot>
                                            </span>
                                            <span class="h-command__item-copy">
                                                <span class="h-command__item-label">{{ entry.item.label }}</span>
                                                <span v-if="entry.item.description" class="h-command__item-description">{{ entry.item.description }}</span>
                                            </span>
                                            <span v-if="entry.item.shortcut || $slots['item-end']" class="h-command__item-end">
                                                <slot name="item-end" :item="entry.item" :active="entry.index === activeIndex">
                                                    <kbd v-if="entry.item.shortcut" class="h-command__key">{{ entry.item.shortcut }}</kbd>
                                                </slot>
                                            </span>
                                        </slot>
                                    </button>
                                </section>
                            </template>
                            <div v-else class="h-command__empty" role="status">
                                <slot name="empty" :query="currentQuery">{{ resolvedEmptyText }}</slot>
                            </div>
                        </div>

                        <footer v-if="showFooter || $slots.footer" class="h-command__footer">
                            <slot name="footer" :active-item="activeItem" :close="close">
                                <span><kbd class="h-command__key">↑</kbd><kbd class="h-command__key">↓</kbd> {{ locale.command.navigate }}</span>
                                <span><kbd class="h-command__key">↵</kbd> {{ locale.command.select }}</span>
                            </slot>
                        </footer>
                    </section>
                </div>
            </template>
        </H0OverlayRoot>
    </span>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-command {
    display: inline-flex;
    font-family: var(--h0n-ui-font-family);

    &__trigger {
        align-items: center;
        border: 1px solid transparent;
        border-radius: var(--h0n-ui-radius-lg);
        color: var(--h0n-ui-color-text);
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-medium);
        gap: 8px;
        transition:
            background-color var(--h0n-ui-duration-fast) ease,
            border-color var(--h0n-ui-duration-fast) ease,
            box-shadow var(--h0n-ui-duration-fast) ease;

        @include mixins.h0n-focus-visible;
    }

    &__trigger--surface {
        background: var(--h0n-ui-color-surface);
    }
    &__trigger--secondary {
        background: var(--h0n-ui-color-secondary);
    }
    &__trigger--ghost {
        background: transparent;
    }
    &__trigger--outline {
        background: transparent;
        border-color: var(--h0n-ui-color-border);
    }
    &__trigger--sm {
        @include mixins.h0n-input-control-size('sm');
    }
    &__trigger--md {
        @include mixins.h0n-input-control-size('md');
    }
    &__trigger--lg {
        @include mixins.h0n-input-control-size('lg');
    }
    &__trigger:disabled {
        cursor: not-allowed;
        opacity: var(--h0n-ui-disabled-opacity);
    }

    &__shortcut {
        margin-inline-start: 8px;
    }

    &__positioner {
        display: grid;
        inset: 0;
        padding: 16px;
        place-items: start center;
        pointer-events: none;
        position: absolute;
    }

    &__panel {
        background: var(--h0n-ui-color-surface);
        border: 1px solid var(--h0n-ui-color-border);
        border-radius: var(--h0n-ui-radius-xxl);
        box-shadow: var(--h0n-ui-shadow-lg);
        color: var(--h0n-ui-color-text);
        display: flex;
        flex-direction: column;
        height: min(var(--h-command-window-height), calc(100dvh - 32px));
        margin-top: min(12vh, 112px);
        max-height: calc(100dvh - 32px);
        overflow: hidden;
        pointer-events: auto;
        width: min(var(--h-command-window-width), calc(100vw - 32px));
    }
    &__panel--sm {
        --h-command-window-width: 384px;
        --h-command-window-height: 300px;
    }
    &__panel--md {
        --h-command-window-width: 512px;
        --h-command-window-height: 356px;
    }
    &__panel--lg {
        --h-command-window-width: 576px;
        --h-command-window-height: 390px;
    }

    &__header {
        flex: 0 0 auto;
    }

    &__search {
        align-items: center;
        border-bottom: 1px solid var(--h0n-ui-color-border);
        display: grid;
        gap: 10px;
        grid-template-columns: auto minmax(0, 1fr) auto;
        min-height: 58px;
        padding: 8px 14px;
        flex: 0 0 auto;
    }
    &__search-icon {
        color: var(--h0n-ui-color-muted);
    }
    &__input {
        appearance: none;
        background: transparent;
        border: 0;
        color: var(--h0n-ui-color-text);
        font: inherit;
        font-size: var(--h0n-ui-typography-body-size);
        min-width: 0;
        outline: none;
        padding: 0;
        width: 100%;
    }
    &__input::placeholder {
        color: var(--h0n-ui-color-muted);
        opacity: 1;
    }
    &__input::-webkit-search-cancel-button {
        appearance: none;
    }

    &__list {
        flex: 1 1 auto;
        min-height: 0;
        overflow: auto;
        padding: 8px;
        scrollbar-gutter: stable;
    }
    &__group + &__group {
        margin-top: 8px;
    }
    &__group-label {
        color: var(--h0n-ui-color-muted);
        font-size: var(--h0n-ui-typography-body-xs-size);
        font-weight: var(--h0n-ui-font-weight-medium);
        padding: 4px 6px 6px;
    }
    &__item {
        align-items: center;
        background: transparent;
        border: 0;
        border-radius: var(--h0n-ui-radius-lg);
        color: var(--h0n-ui-color-text);
        cursor: pointer;
        display: flex;
        font: inherit;
        gap: 10px;
        min-height: 42px;
        padding: 8px 10px;
        text-align: left;
        width: 100%;
    }
    &__item--active {
        background: var(--h0n-ui-color-surface-hover);
    }
    &__item:disabled {
        cursor: not-allowed;
        opacity: var(--h0n-ui-disabled-opacity);
    }
    &__item-start,
    &__item-end {
        align-items: center;
        color: var(--h0n-ui-color-muted);
        display: inline-flex;
        flex: 0 0 auto;
    }
    &__item-copy {
        display: grid;
        flex: 1 1 auto;
        gap: 2px;
        min-width: 0;
    }
    &__item-label {
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-semibold);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &__item-description {
        color: var(--h0n-ui-color-muted);
        font-size: var(--h0n-ui-typography-body-xs-size);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &__empty {
        color: var(--h0n-ui-color-muted);
        padding: 36px 16px;
        text-align: center;
    }
    &__footer {
        align-items: center;
        background: var(--h0n-ui-color-secondary);
        border-top: 1px solid var(--h0n-ui-color-border);
        color: var(--h0n-ui-color-muted);
        display: flex;
        font-size: var(--h0n-ui-typography-body-xs-size);
        flex: 0 0 auto;
        gap: 16px;
        min-height: 36px;
        padding: 6px 10px;
    }
    &__footer > span {
        align-items: center;
        display: inline-flex;
        gap: 5px;
    }
    &__key,
    &__shortcut {
        background: var(--h0n-ui-color-secondary);
        border: 1px solid var(--h0n-ui-color-border);
        border-radius: var(--h0n-ui-radius-sm);
        color: var(--h0n-ui-color-muted);
        font: 500 var(--h0n-ui-typography-body-xs-size)/1 var(--h0n-ui-font-family);
        padding: 4px 6px;
        white-space: nowrap;
    }

    @media (hover: hover) and (pointer: fine) {
        &__trigger:hover:not(:disabled),
        &__item:hover:not(:disabled) {
            background: var(--h0n-ui-color-surface-hover);
        }
    }

    @media (max-height: 520px) {
        &__panel {
            margin-top: 0;
        }
    }
}

:global(.h-overlay-enter-active .h-command__panel),
:global(.h-overlay-leave-active .h-command__panel) {
    transition:
        opacity var(--h0n-ui-duration-normal) ease,
        transform var(--h0n-ui-duration-normal) ease;
}
:global(.h-overlay-enter-from .h-command__panel),
:global(.h-overlay-leave-to .h-command__panel) {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
}
</style>
