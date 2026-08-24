<script setup lang="ts" generic="Value extends H0SelectValue = H0SelectValue">
import { autoUpdate, computePosition, flip, size as floatingSize, offset, shift } from '@floating-ui/dom'
import arrowDownIcon from '@h0nio/icons/alt-arrow-down-stroke'
import unreadIcon from '@h0nio/icons/unread-stroke'
import { computed, inject, nextTick, onBeforeUnmount, ref, useAttrs, useTemplateRef, watch } from 'vue'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { useH0Locale } from '../../locale'
import { h0OverlayContextKey, toH0OverlayZIndex } from '../_shared/Overlay.context'
import { useH0DocumentScrollLock } from '../_shared/useDocumentScrollLock'
import { useFormField } from '../_shared/useFormField'
import { toH0CssSize } from '../_shared/utils'
import H0Icon from '../Icon/H0Icon.vue'
import H0List from '../List/H0List.vue'
import H0ListItem from '../List/H0ListItem.vue'
import H0Spinner from '../Spinner/H0Spinner.vue'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import H0Label from '../Typography/H0Label.vue'
import H0Typography from '../Typography/H0Typography.vue'
import type { H0SelectOption, H0SelectSize, H0SelectValue, H0SelectVariant } from './Select.types'
import { useSelectNavigation } from './useSelectNavigation'

defineOptions({
    name: 'H0Select',
    inheritAttrs: false
})

const props = withDefaults(
    defineProps<{
        modelValue?: Value | Value[] | null
        options?: H0SelectOption<Value>[]
        multiple?: boolean
        maxSelected?: number
        size?: H0SelectSize
        variant?: H0SelectVariant
        label?: string
        placeholder?: string
        disabled?: boolean
        loading?: boolean
        required?: boolean
        error?: string
        hint?: string
        id?: string
        name?: string
        emptyText?: string
        closeOnSelect?: boolean
        listAriaLabel?: string
        defaultValue?: Value | Value[] | null
        virtual?: boolean
        optionHeight?: number
        overscan?: number
        scrollHeight?: number | string
        teleportTo?: string | HTMLElement
        teleportDisabled?: boolean
        lockScroll?: boolean
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        options: () => [],
        multiple: false,
        maxSelected: undefined,
        size: 'md',
        variant: 'surface',
        label: '',
        placeholder: '',
        disabled: false,
        loading: false,
        required: false,
        error: '',
        hint: '',
        id: '',
        name: '',
        emptyText: '',
        closeOnSelect: undefined,
        listAriaLabel: '',
        defaultValue: null,
        virtual: false,
        optionHeight: 44,
        overscan: 5,
        scrollHeight: 320,
        teleportTo: 'body',
        teleportDisabled: false,
        lockScroll: true
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: Value | Value[] | null]
    blur: [event: FocusEvent]
    change: [value: Value | Value[] | null]
    close: []
    focus: [event: FocusEvent]
    open: []
}>()
const attrs = useAttrs()
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))
const overlayContext = inject(h0OverlayContextKey, null)
const selectOverlayStyle = computed(() => {
    if (!overlayContext || props.teleportDisabled) {
        return undefined
    }

    return { zIndex: toH0OverlayZIndex(overlayContext.layer.value, overlayContext.offset.value + 1) }
})
const contextualPopoverStyle = computed(() => {
    if (!overlayContext || props.teleportDisabled) {
        return undefined
    }

    return { zIndex: toH0OverlayZIndex(overlayContext.layer.value, overlayContext.offset.value + 2) }
})

const rootRef = useTemplateRef<HTMLElement>('rootRef')
const triggerRef = useTemplateRef<HTMLButtonElement>('triggerRef')
const popoverRef = useTemplateRef<HTMLElement>('popoverRef')
const popoverStyle = ref<Record<string, string>>({})
const scrollTop = ref(0)
const isPopoverLeaving = ref(false)
const lockedPopoverWidth = ref<number>()
let stopAutoUpdate: (() => void) | undefined
const { locale } = useH0Locale()
const state = useH0ControllableState<Value | Value[] | null>({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue, onUpdate: (value) => emit('update:modelValue', value) })
const currentValue = state.value

const isInteractive = computed(() => !props.disabled && !props.loading)
const shouldCloseOnSelect = computed(() => props.closeOnSelect ?? !props.multiple)
const selectedValues = computed<Value[]>(() => {
    if (props.multiple) {
        return Array.isArray(state.value.value) ? state.value.value : state.value.value == null ? [] : [state.value.value]
    }

    return state.value.value == null || Array.isArray(state.value.value) ? [] : [state.value.value]
})
const resolvedPlaceholder = computed(() => props.placeholder || locale.value.select.placeholder)
const resolvedEmptyText = computed(() => props.emptyText || locale.value.select.empty)
const resolvedListAriaLabel = computed(() => props.listAriaLabel || locale.value.select.listLabel)
const resolvedScrollHeight = computed(() => toH0CssSize(props.scrollHeight))
const virtualWindow = computed(() => {
    if (!props.virtual) return { start: 0, end: props.options.length }
    const height = typeof props.scrollHeight === 'number' ? props.scrollHeight : Number.parseFloat(props.scrollHeight) || 320
    const start = Math.max(0, Math.floor(scrollTop.value / props.optionHeight) - props.overscan)
    const end = Math.min(props.options.length, Math.ceil((scrollTop.value + height) / props.optionHeight) + props.overscan)
    return { start, end }
})
const visibleOptions = computed(() =>
    props.options.slice(virtualWindow.value.start, virtualWindow.value.end).map((option, visibleIndex) => ({ option, index: virtualWindow.value.start + visibleIndex, visibleIndex }))
)
const virtualTop = computed(() => virtualWindow.value.start * props.optionHeight)
const virtualBottom = computed(() => Math.max(0, (props.options.length - virtualWindow.value.end) * props.optionHeight))

const {
    controlId: selectId,
    fieldContext,
    hasMessage,
    messageId,
    resolvedDisabled,
    resolvedHint,
    resolvedLabel,
    resolvedName,
    resolvedRequired,
    setFormValue,
    visibleError
} = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error,
    hint: () => props.hint,
    idPrefix: 'h-select',
    getValue: () => (props.multiple ? selectedValues.value : (selectedValues.value[0] ?? null)),
    focus: () => triggerRef.value?.focus(),
    reset: () => {
        const value = props.multiple ? (Array.isArray(props.defaultValue) ? props.defaultValue : []) : Array.isArray(props.defaultValue) ? (props.defaultValue[0] ?? null) : props.defaultValue
        state.setValue(value)
        emit('change', value)
        return value
    }
})
const listId = computed(() => `${selectId.value}-list`)
const selectedOptions = computed(() => props.options.filter((option) => selectedValues.value.includes(option.value)))
const displayValue = computed(() => selectedOptions.value.map((option) => option.label).join(', '))
const normalizedMaxSelected = computed(() => {
    if (!props.multiple || props.maxSelected == null) {
        return undefined
    }

    return Math.max(0, Math.floor(props.maxSelected))
})
const selectionLimitReached = computed(() => normalizedMaxSelected.value != null && selectedValues.value.length >= normalizedMaxSelected.value)
const { activeIndex, closeSelect, handleTriggerKeydown, isOpen, setActiveIndex, toggleSelect } = useSelectNavigation({
    interactive: isInteractive,
    isOptionDisabled,
    isSelected,
    onClose: () => emit('close'),
    onOpen: () => emit('open'),
    onSelect: selectOption,
    options: () => props.options
})
const activeOptionId = computed(() => (isOpen.value && activeIndex.value >= 0 ? getOptionId(activeIndex.value) : undefined))

function isSelected(option: H0SelectOption<Value>) {
    return selectedValues.value.includes(option.value)
}

function isOptionDisabled(option: H0SelectOption<Value>) {
    return Boolean(option.disabled || (!isSelected(option) && selectionLimitReached.value))
}

function getOptionId(index: number) {
    return `${listId.value}-option-${index}`
}

function selectOption(option: H0SelectOption<Value>) {
    if (!isInteractive.value || isOptionDisabled(option)) {
        return
    }

    let nextValue: Value | Value[] | null

    if (props.multiple) {
        if (!isSelected(option) && selectionLimitReached.value) {
            return
        }

        nextValue = isSelected(option) ? selectedValues.value.filter((value) => value !== option.value) : [...selectedValues.value, option.value]
    } else {
        nextValue = option.value
    }

    state.setValue(nextValue)
    emit('change', nextValue)
    setFormValue(nextValue)

    if (shouldCloseOnSelect.value) {
        closeSelect()
    }
}

function handleDocumentPointerDown(event: PointerEvent) {
    if (!isOpen.value || !rootRef.value) {
        return
    }

    const target = event.target as Node

    if (!rootRef.value.contains(target) && !popoverRef.value?.contains(target)) {
        closeSelect()
    }
}

function handleDocumentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeSelect()
    }
}

async function updatePopoverPosition() {
    if (!isOpen.value || !triggerRef.value || !popoverRef.value) {
        return
    }
    const result = await computePosition(triggerRef.value, popoverRef.value, {
        placement: 'bottom-start',
        strategy: 'fixed',
        middleware: [
            offset(6),
            flip({ padding: 8 }),
            shift({ padding: 8 }),
            floatingSize({
                padding: 8,
                apply({ availableHeight, availableWidth, rects, elements }) {
                    const maximumWidth = Math.max(0, availableWidth)
                    if (lockedPopoverWidth.value == null) {
                        const measuredWidth = elements.floating.getBoundingClientRect().width
                        lockedPopoverWidth.value = Math.min(maximumWidth, Math.max(rects.reference.width, measuredWidth))
                    }

                    Object.assign(elements.floating.style, {
                        maxHeight: `${Math.max(0, Math.min(availableHeight, Number.parseFloat(resolvedScrollHeight.value ?? '') || 320))}px`,
                        maxWidth: `${maximumWidth}px`,
                        width: `${Math.min(maximumWidth, lockedPopoverWidth.value)}px`
                    })
                }
            })
        ]
    })
    popoverStyle.value = {
        left: `${result.x}px`,
        top: `${result.y}px`,
        '--h-select-popover-transform-origin': result.placement.startsWith('top') ? 'bottom center' : 'top center'
    }
}

function removeOpenListeners() {
    document.removeEventListener('pointerdown', handleDocumentPointerDown)
    document.removeEventListener('keydown', handleDocumentKeydown)
    stopAutoUpdate?.()
    stopAutoUpdate = undefined
}

watch(isOpen, async (open) => {
    if (!open) {
        isPopoverLeaving.value = true
        removeOpenListeners()
        return
    }

    lockedPopoverWidth.value = undefined
    isPopoverLeaving.value = false
    await nextTick()

    if (isOpen.value) {
        stopAutoUpdate = autoUpdate(triggerRef.value!, popoverRef.value!, updatePopoverPosition)
        document.addEventListener('pointerdown', handleDocumentPointerDown)
        document.addEventListener('keydown', handleDocumentKeydown)
    }
})

const selectScrollLockActive = computed(() => isOpen.value || isPopoverLeaving.value)
useH0DocumentScrollLock(selectScrollLockActive, {
    enabled: () => props.lockScroll,
    ownerDocument: () => rootRef.value?.ownerDocument ?? (typeof document === 'undefined' ? undefined : document)
})

function finishPopoverLeave() {
    isPopoverLeaving.value = false
}

onBeforeUnmount(() => {
    removeOpenListeners()
})

watch(activeIndex, (index) => {
    if (!props.virtual || index < 0 || !popoverRef.value) return
    const top = index * props.optionHeight
    const bottom = top + props.optionHeight
    if (top < popoverRef.value.scrollTop) popoverRef.value.scrollTop = top
    else if (bottom > popoverRef.value.scrollTop + popoverRef.value.clientHeight) popoverRef.value.scrollTop = bottom - popoverRef.value.clientHeight
})
</script>

<template>
    <div
        ref="rootRef"
        v-bind="mergedRootAttrs"
        data-h0n-component="select"
        class="h-select"
        :class="[
            `h-select--${props.size}`,
            `h-select--${props.variant}`,
            isOpen && 'h-select--open',
            (isOpen || isPopoverLeaving) && 'h-select--elevated',
            visibleError && 'h-select--error',
            resolvedDisabled && 'h-select--disabled',
            loading && 'h-select--loading'
        ]"
    >
        <H0Label v-if="!fieldContext && (resolvedLabel || $slots.label)" class="h-select__label" :html-for="selectId" :required="resolvedRequired">
            <slot name="label">{{ resolvedLabel }}</slot>
        </H0Label>

        <button
            ref="triggerRef"
            v-bind="props.controlAttrs"
            :id="selectId"
            class="h-select__trigger"
            type="button"
            role="combobox"
            :aria-controls="listId"
            :aria-label="resolvedLabel || resolvedPlaceholder"
            :aria-disabled="resolvedDisabled || loading"
            :aria-expanded="isOpen"
            :aria-haspopup="'listbox'"
            :aria-invalid="Boolean(visibleError)"
            :aria-required="resolvedRequired"
            :aria-describedby="hasMessage ? messageId : undefined"
            :aria-errormessage="visibleError ? messageId : undefined"
            :aria-activedescendant="activeOptionId"
            :disabled="resolvedDisabled || loading"
            @blur="emit('blur', $event)"
            @click="toggleSelect"
            @focus="emit('focus', $event)"
            @keydown="handleTriggerKeydown"
        >
            <span class="h-select__value" :class="!displayValue && 'h-select__value--placeholder'">
                <slot name="value" :selected-options="selectedOptions" :value="currentValue">
                    {{ displayValue || resolvedPlaceholder }}
                </slot>
            </span>

            <span class="h-select__indicator" aria-hidden="true">
                <H0Spinner v-if="loading" size="16px" />
                <H0Icon v-else :icon="arrowDownIcon" :size="16" />
            </span>
        </button>

        <template v-if="resolvedName">
            <input v-for="selectedValue in selectedValues" :key="String(selectedValue)" type="hidden" :name="resolvedName" :value="String(selectedValue)" />
        </template>

        <Teleport :to="teleportTo" :disabled="teleportDisabled">
            <Transition name="h-select-overlay">
                <button
                    v-if="isOpen"
                    data-h0n-component="select-overlay"
                    class="h-select__overlay"
                    type="button"
                    :aria-label="locale.common.close"
                    :style="selectOverlayStyle"
                    @click="closeSelect"
                ></button>
            </Transition>

            <Transition name="h-select-popover" @after-leave="finishPopoverLeave" @leave-cancelled="finishPopoverLeave">
                <div
                    v-if="isOpen"
                    :id="listId"
                    ref="popoverRef"
                    data-h0n-component="select-popover"
                    class="h-select__popover"
                    role="listbox"
                    :aria-label="resolvedListAriaLabel"
                    :aria-multiselectable="multiple || undefined"
                    :style="[popoverStyle, contextualPopoverStyle]"
                    @scroll="scrollTop = ($event.currentTarget as HTMLElement).scrollTop"
                >
                    <H0List v-if="options.length" :divided="false">
                        <div v-if="virtualTop" class="h-select__virtual-spacer" :style="{ height: `${virtualTop}px` }" aria-hidden="true" />
                        <H0ListItem
                            v-for="entry in visibleOptions"
                            :key="entry.option.value"
                            :id="getOptionId(entry.index)"
                            class="h-select__option"
                            :style="virtual ? { height: `${optionHeight}px`, overflow: 'hidden' } : undefined"
                            :active="isSelected(entry.option) || entry.index === activeIndex"
                            :aria-selected="isSelected(entry.option)"
                            :aria-disabled="isOptionDisabled(entry.option) || undefined"
                            :disabled="isOptionDisabled(entry.option)"
                            role="option"
                            size="sm"
                            border-radius="var(--h0n-ui-radius-xl)"
                            @click="selectOption(entry.option)"
                            @pointermove="setActiveIndex(entry.index)"
                        >
                            <template v-if="$slots['option-start'] || entry.option.icon" #start>
                                <slot name="option-start" :option="entry.option" :selected="isSelected(entry.option)" :index="entry.index" :visible-index="entry.visibleIndex">
                                    <H0Icon v-if="entry.option.icon" :icon="entry.option.icon" :size="18" />
                                </slot>
                            </template>

                            <slot name="option" :option="entry.option" :selected="isSelected(entry.option)" :index="entry.index" :visible-index="entry.visibleIndex">
                                <span class="h-select__option-copy">
                                    <H0Typography class="h-select__option-label" as="span" variant="body-sm" :weight="500">{{ entry.option.label }}</H0Typography>
                                    <H0Description v-if="entry.option.description" class="h-select__option-description" as="span" variant="body-xs">{{ entry.option.description }}</H0Description>
                                </span>
                            </slot>

                            <template v-if="isSelected(entry.option)" #end>
                                <H0Icon :icon="unreadIcon" :size="22" />
                            </template>
                        </H0ListItem>
                        <div v-if="virtualBottom" class="h-select__virtual-spacer" :style="{ height: `${virtualBottom}px` }" aria-hidden="true" />
                    </H0List>

                    <H0Description v-else class="h-select__empty" as="div">
                        <slot name="empty">{{ resolvedEmptyText }}</slot>
                    </H0Description>
                </div>
            </Transition>
        </Teleport>

        <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId" as="span" class="h-select__message" role="alert">{{ visibleError }}</H0ErrorMessage>
        <H0Description v-else-if="!fieldContext && resolvedHint" :id="messageId" as="span" class="h-select__message">{{ resolvedHint }}</H0Description>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-select {
    @include mixins.h0n-input-root;

    position: relative;

    &--surface {
        @include mixins.h0n-input-variant('surface');
    }

    &--secondary {
        @include mixins.h0n-input-variant('secondary');
    }

    &__trigger {
        align-items: center;
        background: var(--h0n-input-control-background);
        border: 1px solid transparent;
        border-radius: var(--h0n-ui-radius-lg);
        color: var(--h0n-ui-color-text);
        cursor: pointer;
        display: flex;
        font: inherit;
        gap: 10px;
        min-width: 0;
        text-align: left;
        transition: background-color var(--h0n-ui-duration-fast) ease;
        width: 100%;
    }

    &__trigger:focus-visible {
        outline: none;
    }

    &__value {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-medium);
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__value--placeholder {
        color: var(--h0n-ui-color-muted);
        font-weight: var(--h0n-ui-font-weight-regular);
    }

    &__indicator {
        align-items: center;
        color: var(--h0n-ui-color-muted);
        display: inline-flex;
        flex: 0 0 auto;
        justify-content: center;
        transition: transform var(--h0n-ui-duration-fast) ease;
    }

    &__popover {
        --h-select-popover-min-width: 240px;

        background: var(--h0n-ui-color-surface);
        border: none;
        border-radius: var(--h0n-ui-radius-xl);
        font-family: var(--h0n-ui-font-family);
        min-width: min(var(--h-select-popover-min-width), calc(100vw - var(--h0n-ui-overlay-inset) * 2));
        overflow: auto;
        padding: 4px;
        position: fixed;
        width: max-content;
        z-index: var(--h0n-ui-layer-popover);
    }

    &__overlay {
        background: var(--h0n-ui-color-backdrop);
        border: 0;
        cursor: default;
        inset: 0;
        padding: 0;
        position: fixed;
        z-index: calc(var(--h0n-ui-layer-popover) - 1);
    }

    &-overlay-enter-active,
    &-overlay-leave-active {
        transition: opacity var(--h0n-ui-duration-fast) ease;
    }

    &-overlay-enter-from,
    &-overlay-leave-to {
        opacity: 0;
    }

    &-overlay-enter-to,
    &-overlay-leave-from {
        opacity: 1;
    }

    &-popover-enter-active,
    &-popover-leave-active {
        transform-origin: var(--h-select-popover-transform-origin);
        transition:
            opacity var(--h0n-ui-duration-fast) ease,
            transform var(--h0n-ui-duration-fast) ease;
    }

    &-popover-enter-from,
    &-popover-leave-to {
        opacity: 0;
        transform: scale(0.9);
    }

    &-popover-enter-to,
    &-popover-leave-from {
        opacity: 1;
        transform: scale(1);
    }

    &__option {
        scroll-margin: 8px;
    }

    &__option-copy {
        display: grid;
        gap: 2px;
        min-width: 0;
    }

    &__option-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__option-description {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__empty {
        padding: 14px 16px;
    }

    &--open &__indicator {
        transform: rotate(180deg);
    }

    &--elevated {
        z-index: var(--h0n-ui-layer-popover);
    }

    &--elevated &__trigger {
        position: relative;
        z-index: var(--h0n-ui-layer-popover);
    }

    &--sm &__trigger {
        @include mixins.h0n-input-control-size('sm');
    }

    &--md &__trigger {
        @include mixins.h0n-input-control-size('md');
    }

    &--lg &__trigger {
        @include mixins.h0n-input-control-size('lg');
    }

    &--error &__trigger {
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--h0n-ui-color-danger) 52%, transparent);
    }

    &--error &__message {
        color: var(--h0n-ui-color-danger);
    }

    &--disabled,
    &--loading {
        opacity: 0.55;
    }

    @media (hover: hover) and (pointer: fine) {
        &__trigger:hover:not(:disabled) {
            background: var(--h0n-ui-color-surface-hover);
        }
    }
}
</style>
