<script setup lang="ts">
import arrowLeftIcon from '@h0nio/icons/alt-arrow-left-stroke'
import arrowRightIcon from '@h0nio/icons/alt-arrow-right-stroke'
import { computed } from 'vue'
import { defaultH0PaginationLocale } from '../../locale'
import { useH0LocaleSection } from '../_shared/useLocaleSection'
import H0Button from '../Button/H0Button.vue'
import H0Icon from '../Icon/H0Icon.vue'
import H0Description from '../Typography/H0Description.vue'
import type { H0PaginationSize } from './Pagination.types'

defineOptions({
    name: 'H0Pagination'
})

const props = withDefaults(
    defineProps<{
        page?: number
        totalItems?: number
        pageSize?: number
        totalPages?: number
        siblingCount?: number
        size?: H0PaginationSize
        showSummary?: boolean
        disabled?: boolean
        ariaLabel?: string
    }>(),
    {
        page: 1,
        totalItems: 0,
        pageSize: 10,
        totalPages: undefined,
        siblingCount: 1,
        size: 'md',
        showSummary: false,
        disabled: false,
        ariaLabel: ''
    }
)

const emit = defineEmits<{
    'update:page': [page: number]
    change: [page: number]
}>()

type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end'
const pagination = useH0LocaleSection('pagination', defaultH0PaginationLocale)
const resolvedAriaLabel = computed(() => props.ariaLabel || pagination.value.label)

const resolvedTotalPages = computed(() => {
    if (props.totalPages && props.totalPages > 0) {
        return Math.floor(props.totalPages)
    }

    return Math.max(1, Math.ceil(props.totalItems / Math.max(props.pageSize, 1)))
})

const currentPage = computed(() => clampPage(props.page))
const canGoPrevious = computed(() => !props.disabled && currentPage.value > 1)
const canGoNext = computed(() => !props.disabled && currentPage.value < resolvedTotalPages.value)
const summaryText = computed(() => {
    const start = props.totalItems > 0 ? (currentPage.value - 1) * props.pageSize + 1 : 0
    const end = Math.min(currentPage.value * props.pageSize, props.totalItems)

    return pagination.value.summary(start, end, props.totalItems)
})

const items = computed<PaginationItem[]>(() => {
    const total = resolvedTotalPages.value
    const current = currentPage.value
    const siblingCount = Math.max(props.siblingCount, 0)
    const boundaryCount = 1
    const visibleCount = boundaryCount * 2 + siblingCount * 2 + 3

    if (total <= visibleCount) {
        return range(1, total)
    }

    const leftSibling = Math.max(current - siblingCount, boundaryCount + 2)
    const rightSibling = Math.min(current + siblingCount, total - boundaryCount - 1)
    const showStartEllipsis = leftSibling > boundaryCount + 2
    const showEndEllipsis = rightSibling < total - boundaryCount - 1
    const paginationItems: PaginationItem[] = [1]

    if (showStartEllipsis) {
        paginationItems.push('ellipsis-start')
    } else {
        paginationItems.push(...range(2, leftSibling - 1))
    }

    paginationItems.push(...range(leftSibling, rightSibling))

    if (showEndEllipsis) {
        paginationItems.push('ellipsis-end')
    } else {
        paginationItems.push(...range(rightSibling + 1, total - 1))
    }

    paginationItems.push(total)

    return paginationItems
})

function range(start: number, end: number) {
    if (end < start) {
        return []
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

function clampPage(page: number) {
    return Math.min(Math.max(Math.floor(page || 1), 1), resolvedTotalPages.value)
}

function setPage(page: number) {
    const nextPage = clampPage(page)

    if (props.disabled || nextPage === currentPage.value) {
        return
    }

    emit('update:page', nextPage)
    emit('change', nextPage)
}
</script>

<template>
    <nav data-h0n-component="pagination" class="h-pagination" :class="[`h-pagination--${size}`, showSummary && 'h-pagination--summary']" :aria-label="resolvedAriaLabel">
        <H0Description v-if="showSummary" as="p" class="h-pagination__summary">{{ summaryText }}</H0Description>

        <div class="h-pagination__nav">
            <H0Button size="sm" variant="ghost" :disabled="!canGoPrevious" @click="setPage(currentPage - 1)">
                <H0Icon class="h-pagination__control-icon" :icon="arrowLeftIcon" :size="16" />
                <span>{{ pagination.previous }}</span>
            </H0Button>
            <div class="h-pagination__items">
                <template v-for="item in items" :key="item">
                    <span v-if="typeof item === 'string'" class="h-pagination__ellipsis" aria-hidden="true">...</span>

                    <button
                        v-else
                        class="h-pagination__item"
                        type="button"
                        :class="item === currentPage && 'h-pagination__item--active'"
                        :disabled="disabled"
                        :aria-current="item === currentPage ? 'page' : undefined"
                        :aria-label="pagination.page(item)"
                        @click="setPage(item)"
                    >
                        {{ item }}
                    </button>
                </template>
            </div>

            <H0Button size="sm" variant="ghost" :disabled="!canGoNext" @click="setPage(currentPage + 1)">
                <span>{{ pagination.next }}</span>
                <H0Icon class="h-pagination__control-icon" :icon="arrowRightIcon" :size="16" />
            </H0Button>
        </div>
    </nav>
</template>

<style scoped lang="scss">
@use '../../styles/breakpoints' as bp;
.h-pagination {
    --h-pagination-item-size: 30px;
    --h-pagination-font-size: var(--h0n-ui-typography-body-sm-size);
    --h-pagination-gap: 8px;
    --h-pagination-control-gap: 5px;

    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-md);
    justify-content: center;
    min-width: 0;

    &--sm {
        --h-pagination-item-size: 24px;
        --h-pagination-font-size: var(--h0n-ui-typography-body-xs-size);
        --h-pagination-gap: 6px;
        --h-pagination-control-gap: 4px;
    }

    &--lg {
        --h-pagination-item-size: 34px;
        --h-pagination-font-size: var(--h0n-ui-typography-body-size);
        --h-pagination-gap: 10px;
        --h-pagination-control-gap: 6px;
    }

    &--summary {
        justify-content: space-between;
        width: 100%;
    }
}

.h-pagination__nav,
.h-pagination__items,
.h-pagination__control {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    min-width: 0;
}

.h-pagination__nav,
.h-pagination__items {
    gap: var(--h-pagination-gap);
}

.h-pagination__control,
.h-pagination__item {
    align-items: center;
    background: transparent;
    border: 0;
    color: var(--h0n-ui-color-text);
    cursor: pointer;
    font-family: var(--h0n-ui-font-family);
    font-size: var(--h-pagination-font-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
    height: var(--h-pagination-item-size);
    justify-content: center;
    line-height: 1;
    padding: 0;
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        color var(--h0n-ui-duration-fast) ease;
}

.h-pagination__control {
    gap: var(--h-pagination-control-gap);
    min-width: 0;
}

.h-pagination__item {
    border-radius: var(--h0n-ui-radius-round);
    min-width: var(--h-pagination-item-size);
}

.h-pagination__item--active {
    background: var(--h0n-ui-color-secondary);
    color: var(--h0n-ui-color-text);
}

.h-pagination__control:not(:disabled):hover,
.h-pagination__item:not(:disabled):not(.h-pagination__item--active):hover {
    color: var(--h0n-ui-color-primary);
}

.h-pagination__control:disabled,
.h-pagination__item:disabled {
    cursor: not-allowed;
    opacity: 0.42;
}

.h-pagination__ellipsis {
    align-items: center;
    color: var(--h0n-ui-color-muted);
    display: inline-flex;
    font-family: var(--h0n-ui-font-family);
    font-size: var(--h-pagination-font-size);
    font-weight: var(--h0n-ui-font-weight-regular);
    height: var(--h-pagination-item-size);
    justify-content: center;
    min-width: var(--h-pagination-item-size);
}

.h-pagination__summary {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h-pagination-font-size);
    line-height: 1.4;
    margin: 0;
}

.h-pagination__control-icon {
    flex: 0 0 auto;
}

@include bp.h0n-at-most(bp.$h0n-breakpoint-sm) {
    .h-pagination--summary {
        justify-content: center;
    }
}
</style>
