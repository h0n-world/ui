<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import H0Icon from '../Icon/H0Icon.vue'
import type { H0SegmentItem, H0SegmentSize, H0SegmentValue, H0SegmentVariant } from './Segment.types'
import { useH0ControllableState } from '../../composables/useH0ControllableState'

defineOptions({
    name: 'H0Segment'
})

const props = withDefaults(
    defineProps<{
        modelValue?: H0SegmentValue
        defaultValue?: H0SegmentValue
        items: H0SegmentItem[]
        disabled?: boolean
        size?: H0SegmentSize
        variant?: H0SegmentVariant
        iconExpand?: boolean
        ariaLabel?: string
    }>(),
    {
        disabled: false,
        defaultValue: '',
        size: 'md',
        variant: 'default',
        iconExpand: false,
        ariaLabel: 'Segmented control'
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: H0SegmentValue]
    change: [value: H0SegmentValue]
}>()

const rootRef = useTemplateRef<HTMLElement>('rootRef')
const itemRefs = useTemplateRef<HTMLButtonElement[]>('itemRefs')
const labelRefs = useTemplateRef<HTMLElement[]>('labelRefs')
const indicatorStyle = ref<Record<string, string>>({ opacity: '0' })
const expandedWidths = ref<number[]>([])
const state = useH0ControllableState({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue, onUpdate: (value) => emit('update:modelValue', value) })
const currentValue = state.value
const activeIndex = computed(() => props.items.findIndex((item) => item.value === currentValue.value))
const iconExpandDimensions = computed(() => {
    if (props.size === 'sm') {
        return { collapsed: 34, expandedFallback: 116, paddingInline: 10 }
    }

    if (props.size === 'lg') {
        return { collapsed: 46, expandedFallback: 156, paddingInline: 18 }
    }

    return { collapsed: 40, expandedFallback: 136, paddingInline: 14 }
})
const rootStyle = computed<Record<string, string>>(() => {
    if (!props.iconExpand || !props.items.length) {
        return {} as Record<string, string>
    }

    const dimensions = iconExpandDimensions.value
    const itemGaps = Math.max(0, props.items.length - 1)
    const width = getExpandedWidth(activeIndex.value) + dimensions.collapsed * itemGaps + itemGaps * 4 + 10

    return {
        '--h-segment-collapsed-width': `${dimensions.collapsed}px`,
        width: `${width}px`
    }
})
const tabbableIndex = computed(() => {
    if (activeIndex.value >= 0 && !isItemDisabled(props.items[activeIndex.value])) {
        return activeIndex.value
    }

    return props.items.findIndex((item) => !isItemDisabled(item))
})
let layoutResizeObserver: ResizeObserver | undefined

const iconSize = computed(() => {
    if (props.size === 'sm') {
        return 14
    }

    if (props.size === 'lg') {
        return 18
    }

    return 16
})

function isItemDisabled(item: H0SegmentItem) {
    return props.disabled || Boolean(item.disabled)
}

function getExpandedWidth(index: number) {
    return expandedWidths.value[index] ?? iconExpandDimensions.value.expandedFallback
}

function getItemStyle(index: number) {
    if (!props.iconExpand) {
        return undefined
    }

    return {
        '--h-segment-expanded-width': `${getExpandedWidth(index)}px`
    }
}

function measureExpandedWidths() {
    if (!props.iconExpand) {
        expandedWidths.value = []
        return
    }

    const dimensions = iconExpandDimensions.value

    expandedWidths.value = props.items.map((item, index) => {
        const labelWidth = Math.min(labelRefs.value?.[index]?.scrollWidth ?? 0, 224)
        const iconWidth = item.icon ? iconSize.value + 8 : 0

        return Math.max(dimensions.collapsed, Math.ceil(dimensions.paddingInline * 2 + iconWidth + labelWidth))
    })
}

function selectItem(item: H0SegmentItem) {
    if (isItemDisabled(item) || item.value === state.value.value) {
        return
    }

    state.setValue(item.value)
    emit('change', item.value)
}

function getItemTabIndex(item: H0SegmentItem, index: number) {
    if (isItemDisabled(item)) {
        return -1
    }

    return index === tabbableIndex.value ? 0 : -1
}

function findEnabledIndex(startIndex: number, direction: 1 | -1) {
    for (let offset = 1; offset <= props.items.length; offset += 1) {
        const index = (startIndex + offset * direction + props.items.length) % props.items.length

        if (!isItemDisabled(props.items[index])) {
            return index
        }
    }

    return -1
}

async function focusAndSelect(index: number) {
    const item = props.items[index]

    if (!item || isItemDisabled(item)) {
        return
    }

    selectItem(item)
    await nextTick()
    itemRefs.value?.[index]?.focus()
}

function handleItemKeydown(event: KeyboardEvent, index: number) {
    if (props.disabled || !props.items.length) {
        return
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        void focusAndSelect(findEnabledIndex(index, 1))
        return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        void focusAndSelect(findEnabledIndex(index, -1))
        return
    }

    if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault()
        const direction = event.key === 'Home' ? 1 : -1
        const startIndex = event.key === 'Home' ? -1 : 0

        void focusAndSelect(findEnabledIndex(startIndex, direction))
    }
}

function updateIndicator() {
    const root = rootRef.value
    const item = itemRefs.value?.[activeIndex.value]

    if (!root || !item) {
        indicatorStyle.value = { opacity: '0' }
        return
    }

    const rootRect = root.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const rootComputedStyle = window.getComputedStyle(root)
    const borderLeft = Number.parseFloat(rootComputedStyle.borderLeftWidth) || 0
    const borderRight = Number.parseFloat(rootComputedStyle.borderRightWidth) || 0
    const paddingLeft = Number.parseFloat(rootComputedStyle.paddingLeft) || 0
    const paddingRight = Number.parseFloat(rootComputedStyle.paddingRight) || 0
    let indicatorLeft = itemRect.left - rootRect.left - borderLeft
    let indicatorWidth = itemRect.width

    if (props.iconExpand) {
        const gap = Number.parseFloat(rootComputedStyle.columnGap) || 0
        const dimensions = iconExpandDimensions.value
        const expandedWidth = getExpandedWidth(activeIndex.value)
        const totalGap = gap * Math.max(0, props.items.length - 1)
        const desiredItemsWidth = expandedWidth + dimensions.collapsed * Math.max(0, props.items.length - 1)
        const requestedRootWidth = desiredItemsWidth + borderLeft + borderRight + paddingLeft + paddingRight + totalGap
        const availableRootWidth = Math.min(requestedRootWidth, root.parentElement?.getBoundingClientRect().width ?? requestedRootWidth)
        const availableItemsWidth = Math.max(0, availableRootWidth - borderLeft - borderRight - paddingLeft - paddingRight - totalGap)
        const scale = desiredItemsWidth > 0 ? Math.min(1, availableItemsWidth / desiredItemsWidth) : 1

        indicatorLeft = paddingLeft + activeIndex.value * (dimensions.collapsed * scale + gap)
        indicatorWidth = expandedWidth * scale
    }

    if (activeIndex.value === 0) {
        indicatorLeft = paddingLeft
    } else if (activeIndex.value === props.items.length - 1) {
        indicatorLeft = rootRect.width - borderLeft - borderRight - paddingRight - indicatorWidth
    }

    indicatorStyle.value = {
        height: `${itemRect.height}px`,
        opacity: '1',
        transform: `translate3d(${indicatorLeft}px, -50%, 0)`,
        width: `${indicatorWidth}px`
    }
}

watch(
    () => [state.value.value, props.items, props.size, props.iconExpand],
    async () => {
        await nextTick()
        measureExpandedWidths()
        await nextTick()
        updateIndicator()
    },
    { deep: true, flush: 'post' }
)

onMounted(async () => {
    await nextTick()
    measureExpandedWidths()
    await nextTick()
    updateIndicator()
    window.addEventListener('resize', updateIndicator)

    if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
        layoutResizeObserver = new ResizeObserver(updateIndicator)
        layoutResizeObserver.observe(rootRef.value)
        itemRefs.value?.forEach((item) => layoutResizeObserver?.observe(item))
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateIndicator)
    layoutResizeObserver?.disconnect()
})
</script>

<template>
    <div
        ref="rootRef"
        data-h0n-component="segment"
        class="h-segment"
        :class="[`h-segment--${size}`, `h-segment--${variant}`, iconExpand && 'h-segment--icon-expand', disabled && 'h-segment--disabled']"
        :style="rootStyle"
        role="radiogroup"
        :aria-label="ariaLabel"
        :aria-disabled="disabled || undefined"
    >
        <span class="h-segment__indicator" :style="indicatorStyle" aria-hidden="true" />

        <button
            v-for="(item, itemIndex) in items"
            :key="item.value"
            ref="itemRefs"
            class="h-segment__item"
            :class="[currentValue === item.value && 'h-segment__item--active']"
            type="button"
            role="radio"
            :aria-checked="currentValue === item.value"
            :aria-label="item.label"
            :disabled="isItemDisabled(item)"
            :style="getItemStyle(itemIndex)"
            :tabindex="getItemTabIndex(item, itemIndex)"
            @click="selectItem(item)"
            @keydown="handleItemKeydown($event, itemIndex)"
        >
            <span class="h-segment__content">
                <H0Icon v-if="item.icon" class="h-segment__icon" :icon="item.icon" :size="iconSize" />
                <span ref="labelRefs" class="h-segment__label" :class="iconExpand && item.icon && currentValue !== item.value && 'h-segment__label--collapsed'">{{ item.label }}</span>
            </span>
        </button>
    </div>
</template>

<style scoped lang="scss">
.h-segment {
    --h-segment-background: var(--h0n-ui-color-surface);
    --h-segment-border: transparent;
    --h-segment-indicator: var(--h0n-ui-color-secondary);
    --h-segment-active-color: var(--h0n-ui-color-text);
    --h-segment-height: 36px;
    --h-segment-font-size: var(--h0n-ui-typography-body-sm-size);
    --h-segment-padding-inline: 14px;

    background: var(--h-segment-background);
    border: 1px solid var(--h-segment-border);
    border-radius: var(--h0n-ui-radius-xl);
    display: inline-flex;
    gap: 4px;
    max-width: 100%;
    min-width: 0;
    padding: 4px;
    position: relative;
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        border-color var(--h0n-ui-duration-fast) ease,
        width var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1);

    &__indicator {
        background: var(--h-segment-indicator);
        border-radius: var(--h0n-ui-radius-lg);
        left: 0;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transition:
            background-color var(--h0n-ui-duration-fast) ease,
            height var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1),
            opacity var(--h0n-ui-duration-fast) ease,
            transform var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1),
            width var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform, width;
        z-index: 0;
    }

    &__item {
        align-items: center;
        background: transparent;
        border: 0;
        border-radius: var(--h0n-ui-radius-lg);
        color: var(--h0n-ui-color-muted);
        cursor: pointer;
        display: flex;
        flex: 1 1 auto;
        font-family: var(--h0n-ui-font-family);
        font-size: var(--h-segment-font-size);
        font-weight: var(--h0n-ui-font-weight-medium);
        justify-content: center;
        min-height: var(--h-segment-height);
        min-width: 0;
        padding: 0 var(--h-segment-padding-inline);
        position: relative;
        transition:
            color var(--h0n-ui-duration-fast) ease,
            opacity var(--h0n-ui-duration-fast) ease;
        white-space: nowrap;
        z-index: 1;

        &--active {
            color: var(--h-segment-active-color);
        }

        &:focus-visible {
            box-shadow: var(--h0n-ui-focus-ring);
            outline: none;
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.55;
        }
    }

    &__content {
        align-items: center;
        display: flex;
        justify-content: center;
        line-height: 1;
        min-width: 0;
    }

    &__icon {
        flex: 0 0 auto;
    }

    &__label {
        display: inline-block;
        max-width: 14rem;
        opacity: 1;
        overflow: hidden;
        transition:
            max-width var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1),
            margin var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1),
            opacity var(--h0n-ui-duration-fast) ease,
            transform var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1);
        vertical-align: middle;
    }

    &__icon + &__label {
        margin-inline-start: 8px;
    }

    &__icon + &__label--collapsed {
        margin-inline-start: 0;
        max-width: 0;
        opacity: 0;
        transform: translateX(-4px);
    }

    &--sm {
        --h-segment-height: 30px;
        --h-segment-padding-inline: 10px;
    }

    &--lg {
        --h-segment-height: 42px;
        --h-segment-font-size: var(--h0n-ui-typography-body-size);
        --h-segment-padding-inline: 18px;
    }

    &--secondary {
        --h-segment-background: var(--h0n-ui-color-secondary);
        --h-segment-indicator: var(--h0n-ui-color-surface);
    }

    &--outline {
        --h-segment-background: transparent;
        --h-segment-border: var(--h0n-ui-color-border);
        --h-segment-indicator: var(--h0n-ui-color-secondary);
    }

    &--ghost {
        --h-segment-background: transparent;
        --h-segment-indicator: var(--h0n-ui-color-primary);
        --h-segment-active-color: var(--h0n-ui-color-primary-contrast);
    }

    &--icon-expand &__item {
        flex: 0 1 var(--h-segment-collapsed-width);
        overflow: hidden;
        transition:
            color var(--h0n-ui-duration-fast) ease,
            flex-basis var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1),
            opacity var(--h0n-ui-duration-fast) ease,
            width var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1);
        width: var(--h-segment-collapsed-width);
    }

    &--icon-expand &__item--active {
        flex-basis: var(--h-segment-expanded-width);
        width: var(--h-segment-expanded-width);
    }

    &--disabled {
        opacity: 0.55;
    }

    &--disabled &__item:disabled {
        opacity: 1;
    }
}
</style>
