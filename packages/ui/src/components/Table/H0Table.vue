<script setup lang="ts" generic="Row extends H0TableRow = H0TableRow">
import { computed, type CSSProperties } from 'vue'
import H0Spinner from '../Spinner/H0Spinner.vue'
import H0Description from '../Typography/H0Description.vue'
import type { H0TableColumn, H0TableColumnSizing, H0TableDensity, H0TableGetRowKey, H0TableRow } from './Table.types'
import { useH0LocaleSection } from '../_shared/useLocaleSection'
import { defaultH0TableLocale } from '../../locale'
import { toH0CssSize } from '../_shared/utils'

defineOptions({ name: 'H0Table' })

const props = withDefaults(
    defineProps<{
        columns: H0TableColumn<Row>[]
        rows?: Row[]
        getRowKey?: H0TableGetRowKey<Row>
        columnSizing?: H0TableColumnSizing
        density?: H0TableDensity
        striped?: boolean
        hoverable?: boolean
        bordered?: boolean
        stickyHeader?: boolean
        scrollHeight?: string | number
        minWidth?: string | number
        loading?: boolean
        emptyText?: string
        loadingText?: string
        caption?: string
        ariaLabel?: string
    }>(),
    {
        rows: () => [],
        columnSizing: 'auto',
        density: 'default',
        stickyHeader: true,
        emptyText: '',
        loadingText: '',
        caption: '',
        ariaLabel: ''
    }
)

const emit = defineEmits<{
    'row-click': [row: Row, index: number, event: MouseEvent]
    'viewport-scroll': [event: Event]
}>()
const tableLocale = useH0LocaleSection('table', defaultH0TableLocale)
const resolvedEmptyText = computed(() => props.emptyText || tableLocale.value.empty)
const resolvedLoadingText = computed(() => props.loadingText || tableLocale.value.loading)
const resolvedAriaLabel = computed(() => props.ariaLabel || tableLocale.value.ariaLabel)

const hasRows = computed(() => props.rows.length > 0)
const columnCount = computed(() => Math.max(props.columns.length, 1))
const viewportStyle = computed<CSSProperties | undefined>(() =>
    props.scrollHeight === undefined ? undefined : { maxHeight: toH0CssSize(props.scrollHeight) }
)
const tableStyle = computed<CSSProperties>(() => ({
    minWidth: toH0CssSize(props.minWidth),
    tableLayout: props.columnSizing === 'equal' ? 'fixed' : 'auto'
}))

function getRowKey(row: Row, index: number) {
    return props.getRowKey?.(row, index) ?? index
}

function getColumnValue(row: Row, column: H0TableColumn<Row>) {
    return column.value ? column.value(row) : row[column.key]
}

function getColumnStyle(column: H0TableColumn<Row>): CSSProperties | undefined {
    if (props.columnSizing === 'equal' && !column.width && !column.minWidth && !column.maxWidth) {
        return undefined
    }

    return {
        width: toH0CssSize(column.width),
        minWidth: toH0CssSize(column.minWidth),
        maxWidth: toH0CssSize(column.maxWidth)
    }
}
</script>

<template>
    <div
        data-h0n-component="table"
        class="h-table"
        :class="[
            `h-table--density-${density}`,
            striped && 'h-table--striped',
            hoverable && 'h-table--hoverable',
            bordered && 'h-table--bordered',
            stickyHeader && 'h-table--sticky-header'
        ]"
    >
        <div class="h-table__viewport" :style="viewportStyle" tabindex="0" :aria-label="tableLocale.scrollArea(resolvedAriaLabel)" @scroll="emit('viewport-scroll', $event)">
            <table class="h-table__table" :style="tableStyle" :aria-label="resolvedAriaLabel">
                <caption v-if="caption || $slots.caption" class="h-table__caption"><slot name="caption">{{ caption }}</slot></caption>

                <colgroup>
                    <col v-for="column in columns" :key="column.key" :style="getColumnStyle(column)" />
                </colgroup>

                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column.key" :class="`h-table__cell--${column.headerAlign ?? column.align ?? 'left'}`" scope="col" :aria-sort="column.ariaSort">
                            <slot :name="`header-${column.key}`" :column="column">{{ column.label }}</slot>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <slot name="before-rows" :column-count="columnCount" />

                    <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)" class="h-table__row" @click="emit('row-click', row, rowIndex, $event)">
                        <td v-for="column in columns" :key="column.key" :class="`h-table__cell--${column.align ?? 'left'}`">
                            <slot :name="`cell-${column.key}`" :row="row" :column="column" :value="getColumnValue(row, column)" :row-index="rowIndex">
                                {{ getColumnValue(row, column) }}
                            </slot>
                        </td>
                    </tr>

                    <slot name="after-rows" :column-count="columnCount" />

                    <tr v-if="loading && !hasRows">
                        <td class="h-table__state-cell" :colspan="columnCount">
                            <slot name="loading">
                                <div class="h-table__state" role="status" :aria-label="resolvedLoadingText">
                                    <H0Spinner size="18px" :label="resolvedLoadingText" />
                                    <H0Description as="span">{{ resolvedLoadingText }}</H0Description>
                                </div>
                            </slot>
                        </td>
                    </tr>

                    <tr v-else-if="!hasRows">
                        <td class="h-table__state-cell" :colspan="columnCount">
                            <slot name="empty">
                                <div class="h-table__state"><H0Description as="span">{{ resolvedEmptyText }}</H0Description></div>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-table {
    --h-table-surface: var(--h0n-ui-color-surface);
    --h-table-header-surface: var(--h0n-ui-color-secondary);
    --h-table-inner-radius: var(--h0n-ui-radius-xl);

    background: var(--h-table-header-surface);
    border: 0;
    border-radius: var(--h0n-ui-radius-xl);
    color: var(--h0n-ui-color-text);
    font-family: var(--h0n-ui-font-family);
    isolation: isolate;
    min-width: 0;
    overflow: hidden;
    padding: var(--h0n-ui-spacing-xs);
}

.h-table--bordered {
    box-shadow: inset 0 0 0 1px var(--h0n-ui-color-border);
}

.h-table__viewport {
    @include mixins.h0n-scrollbar;
    background: var(--h-table-header-surface);
    border-radius: var(--h-table-inner-radius);
    max-width: 100%;
    min-width: 0;
    overflow: auto;
    scrollbar-gutter: auto;
}

.h-table__viewport::-webkit-scrollbar-track {
    background: var(--h-table-surface);
}

.h-table__viewport::-webkit-scrollbar-corner {
    background: var(--h-table-surface);
}

.h-table__table {
    border-collapse: separate;
    border-spacing: 0;
    border-radius: var(--h-table-inner-radius);
    min-width: 100%;
    width: 100%;
}

.h-table__caption {
    padding: var(--h0n-ui-spacing-md) var(--h0n-ui-spacing-lg);
    text-align: left;
}

.h-table th,
.h-table td {
    padding: var(--h-table-cell-padding-block) var(--h-table-cell-padding-inline);
    text-align: left;
    vertical-align: middle;
}

.h-table--density-compact {
    --h-table-cell-padding-block: 8px;
    --h-table-cell-padding-inline: 12px;
}

.h-table--density-default {
    --h-table-cell-padding-block: 12px;
    --h-table-cell-padding-inline: 16px;
}

.h-table--density-comfortable {
    --h-table-cell-padding-block: 16px;
    --h-table-cell-padding-inline: 20px;
}

.h-table th {
    background: var(--h-table-header-surface);
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
    line-height: 1.3;
    white-space: nowrap;
}

.h-table thead th:first-child {
    border-start-start-radius: var(--h-table-inner-radius);
}

.h-table thead th:last-child {
    border-start-end-radius: var(--h-table-inner-radius);
}

.h-table--sticky-header th {
    position: sticky;
    top: 0;
    z-index: 2;
}

.h-table td {
    background: var(--h-table-surface);
    border-top: 1px solid var(--h0n-ui-color-border);
    font-size: var(--h0n-ui-typography-body-sm-size);
    font-weight: var(--h0n-ui-font-weight-medium);
    line-height: 1.4;
    transition: background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
}

.h-table tbody tr:first-child > td:first-child {
    border-start-start-radius: var(--h-table-inner-radius);
}

.h-table tbody tr:first-child > td:last-child {
    border-start-end-radius: var(--h-table-inner-radius);
}

.h-table tbody tr:last-child > td:first-child {
    border-end-start-radius: var(--h-table-inner-radius);
}

.h-table tbody tr:last-child > td:last-child {
    border-end-end-radius: var(--h-table-inner-radius);
}

.h-table--striped .h-table__row:nth-child(even) td {
    background: color-mix(in srgb, var(--h-table-header-surface) 45%, var(--h-table-surface));
}

.h-table--hoverable .h-table__row:hover td {
    background: var(--h0n-ui-color-surface-hover);
}

.h-table__cell--center {
    text-align: center !important;
}

.h-table__cell--right {
    text-align: right !important;
}

.h-table__state-cell {
    height: 180px;
}

.h-table__state {
    align-items: center;
    color: var(--h0n-ui-color-muted);
    display: flex;
    gap: var(--h0n-ui-spacing-sm);
    justify-content: center;
    min-height: 100px;
    padding: var(--h0n-ui-spacing-xl);
}
</style>
