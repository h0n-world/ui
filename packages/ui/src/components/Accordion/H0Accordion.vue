<script setup lang="ts">
import { arrowDownIcon } from '../../icons'
import { computed, ref, useId, watch } from 'vue'
import H0Icon from '../Icon/H0Icon.vue'
import H0Description from '../Typography/H0Description.vue'
import H0Typography from '../Typography/H0Typography.vue'
import type { H0AccordionItem } from './Accordion.types'

defineOptions({
    name: 'H0Accordion'
})

const props = withDefaults(
    defineProps<{
        items: H0AccordionItem[]
        id?: string
        multiple?: boolean
        defaultOpen?: number[]
    }>(),
    {
        multiple: false,
        defaultOpen: () => []
    }
)

const openItems = ref(new Set(props.multiple ? props.defaultOpen : props.defaultOpen.slice(0, 1)))
const generatedId = useId()
const accordionId = computed(() => props.id || `h-accordion-${generatedId}`)

const normalizedItems = computed(() =>
    props.items.map((item) => ({
        ...item,
        title: item.title ?? item.question ?? '',
        content: item.content ?? item.answer ?? ''
    }))
)

watch(
    () => props.items.length,
    (itemsLength) => {
        openItems.value = new Set([...openItems.value].filter((index) => index < itemsLength))
    }
)

watch(
    () => props.multiple,
    (multiple) => {
        if (!multiple && openItems.value.size > 1) {
            openItems.value = new Set([[...openItems.value][0]])
        }
    }
)

function isOpen(index: number) {
    return openItems.value.has(index)
}

function toggleItem(index: number, disabled?: boolean) {
    if (disabled) {
        return
    }

    const nextOpenItems = props.multiple ? new Set(openItems.value) : new Set<number>()

    if (openItems.value.has(index)) {
        nextOpenItems.delete(index)
    } else {
        nextOpenItems.add(index)
    }

    openItems.value = nextOpenItems
}

function getHeaderId(index: number) {
    return `${accordionId.value}-header-${index}`
}

function getPanelId(index: number) {
    return `${accordionId.value}-panel-${index}`
}
</script>

<template>
    <div data-h0n-component="accordion" class="h-accordion">
        <article v-for="(item, index) in normalizedItems" :key="`${item.title}-${index}`" class="h-accordion__item">
            <button
                class="h-accordion__summary"
                :class="{ 'h-accordion__summary--open': isOpen(index) }"
                type="button"
                :id="getHeaderId(index)"
                :aria-controls="getPanelId(index)"
                :aria-expanded="isOpen(index)"
                :disabled="item.disabled"
                @click="toggleItem(index, item.disabled)"
            >
                <H0Typography as="span" variant="body" :weight="500">{{ item.title }}</H0Typography>
                <H0Icon class="h-accordion__icon" :icon="arrowDownIcon" :size="18" :stroke-width="1.4" />
            </button>

            <div
                class="h-accordion__panel"
                :class="{ 'h-accordion__panel--open': isOpen(index) }"
                role="region"
                :id="getPanelId(index)"
                :aria-labelledby="getHeaderId(index)"
                :aria-hidden="!isOpen(index)"
                v-bind="isOpen(index) ? {} : { inert: true }"
            >
                <H0Description as="div" class="h-accordion__content">
                    <slot name="item" :item="item" :index="index" :open="isOpen(index)">
                        {{ item.content }}
                    </slot>
                </H0Description>
            </div>
        </article>
    </div>
</template>

<style scoped lang="scss">
.h-accordion {
    display: grid;
    min-width: 0;
}

.h-accordion__item + .h-accordion__item {
    border-top: 1px solid var(--h0n-ui-color-border);
}

.h-accordion__summary {
    align-items: center;
    background: transparent;
    border: 0;
    color: var(--h0n-ui-color-text);
    cursor: pointer;
    display: flex;
    gap: 14px;
    justify-content: space-between;
    line-height: 1.3;
    min-height: 56px;
    padding: 14px 16px;
    text-align: left;
    width: 100%;

    span:first-child {
        min-width: 0;
    }

    &:focus-visible {
        box-shadow: inset var(--h0n-ui-focus-ring);
        outline: none;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }

    &--open .h-accordion__icon {
        transform: rotate(225deg);
    }
}

.h-accordion__icon {
    color: var(--h0n-ui-color-muted);
    flex: 0 0 auto;
    transform-origin: center;
    transition: transform var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
}

.h-accordion__panel {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    overflow: hidden;
    transition:
        grid-template-rows var(--h0n-ui-duration-normal) var(--h0n-ui-easing-standard),
        opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);

    &--open {
        grid-template-rows: 1fr;
        opacity: 1;
    }

    &--open .h-accordion__content {
        padding: 0 16px 16px;
    }
}

.h-accordion__content {
    color: var(--h0n-ui-color-muted);
    line-height: 1.45;
    min-height: 0;
    overflow: hidden;
    padding: 0 16px;
    transition: padding var(--h0n-ui-duration-normal) var(--h0n-ui-easing-standard);

    p {
        margin: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .h-accordion__icon,
    .h-accordion__panel,
    .h-accordion__content {
        transition: none;
    }
}
</style>
