<script setup lang="ts" generic="Row extends H0TableRow = H0TableRow">
import { computed, ref, watch } from 'vue'
import H0Checkbox from '../Checkbox/H0Checkbox.vue'
import H0Pagination from '../Pagination/H0Pagination.vue'
import H0Radio from '../Radio/H0Radio.vue'
import H0SearchField from '../SearchField/H0SearchField.vue'
import H0Select from '../Select/H0Select.vue'
import type { H0SelectValue } from '../Select/Select.types'
import H0Table from '../Table/H0Table.vue'
import type { H0TableColumn, H0TableDensity, H0TableRow, H0TableRowKey } from '../Table/Table.types'
import type {
    H0DataTableColumn,
    H0DataTableFilters,
    H0DataTableFilterValue,
    H0DataTableMode,
    H0DataTablePaginationMode,
    H0DataTableSelection,
    H0DataTableSelectionMode,
    H0DataTableSort
} from './DataTable.types'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { useH0LocaleSection } from '../_shared/useLocaleSection'
import { defaultH0DataTableLocale } from '../../locale'

defineOptions({ name: 'H0DataTable' })

const props = withDefaults(
    defineProps<{
        columns: H0DataTableColumn<Row>[]
        rows?: Row[]
        getRowKey: (row: Row, index: number) => H0TableRowKey
        mode?: H0DataTableMode
        paginationMode?: H0DataTablePaginationMode
        page?: number
        defaultPage?: number
        pageSize?: number
        defaultPageSize?: number
        totalItems?: number
        sort?: H0DataTableSort
        defaultSort?: H0DataTableSort
        filters?: H0DataTableFilters
        defaultFilters?: H0DataTableFilters
        selection?: H0DataTableSelection
        defaultSelection?: H0DataTableSelection
        selectionMode?: H0DataTableSelectionMode
        isRowSelectable?: (row: Row) => boolean
        loading?: boolean
        error?: string
        hasMore?: boolean
        virtual?: boolean
        rowHeight?: number
        overscan?: number
        scrollHeight?: string | number
        minWidth?: string | number
        density?: H0TableDensity
        striped?: boolean
        hoverable?: boolean
        bordered?: boolean
        stickyHeader?: boolean
        emptyText?: string
        loadingText?: string
        ariaLabel?: string
    }>(),
    {
        rows: () => [],
        mode: 'client',
        paginationMode: 'none',
        defaultPage: 1,
        defaultPageSize: 10,
        totalItems: 0,
        defaultSort: null,
        defaultFilters: () => ({}),
        defaultSelection: () => [],
        selectionMode: 'none',
        isRowSelectable: () => true,
        error: '',
        rowHeight: 48,
        overscan: 5,
        scrollHeight: undefined,
        minWidth: undefined,
        density: 'default',
        hoverable: true,
        bordered: true,
        stickyHeader: true,
        emptyText: '',
        loadingText: '',
        ariaLabel: ''
    }
)

const emit = defineEmits<{
    'update:sort': [value: H0DataTableSort]
    'update:filters': [value: H0DataTableFilters]
    'update:selection': [value: H0DataTableSelection]
    'update:page': [value: number]
    'update:pageSize': [value: number]
    'load-more': []
    'row-click': [row: Row, index: number, event: MouseEvent]
}>()

const dataTableLocale = useH0LocaleSection('dataTable', defaultH0DataTableLocale)
const sortState = useH0ControllableState({ modelValue: () => props.sort, defaultValue: () => props.defaultSort, onUpdate: (value) => emit('update:sort', value) })
const filtersState = useH0ControllableState({ modelValue: () => props.filters, defaultValue: () => ({ ...props.defaultFilters }), onUpdate: (value) => emit('update:filters', value) })
const selectionState = useH0ControllableState({ modelValue: () => props.selection, defaultValue: () => [...props.defaultSelection], onUpdate: (value) => emit('update:selection', value) })
const pageState = useH0ControllableState({ modelValue: () => props.page, defaultValue: () => props.defaultPage, onUpdate: (value) => emit('update:page', value) })
const pageSizeState = useH0ControllableState({ modelValue: () => props.pageSize, defaultValue: () => props.defaultPageSize, onUpdate: (value) => emit('update:pageSize', value) })
const currentSort = sortState.value
const currentFilters = filtersState.value
const currentSelection = selectionState.value
const currentPage = pageState.value
const currentPageSize = pageSizeState.value
const resolvedEmptyText = computed(() => props.emptyText || dataTableLocale.value.empty)
const resolvedLoadingText = computed(() => props.loadingText || dataTableLocale.value.loading)
const resolvedAriaLabel = computed(() => props.ariaLabel || dataTableLocale.value.label)
const scrollTop = ref(0)
const viewportHeight = ref(typeof props.scrollHeight === 'number' ? props.scrollHeight : Number.parseFloat(props.scrollHeight ?? '') || 320)
const loadLocked = ref(false)
const selectionColumn: H0TableColumn = { key: '__selection', label: '', width: 44, align: 'center', headerAlign: 'center' }
const tableColumns = computed<H0TableColumn[]>(() => {
    const columns = props.columns.map((column) => ({
        ...column,
        ariaSort: column.sortable ? (currentSort.value?.key === column.key ? (currentSort.value.direction === 'asc' ? 'ascending' : 'descending') : 'none') : undefined
    })) as H0TableColumn[]

    return props.selectionMode === 'none' ? columns : [selectionColumn, ...columns]
})
const normalizedPageSize = computed(() => Math.max(1, Math.floor(currentPageSize.value || 1)))

const filteredRows = computed(() => {
    if (props.mode === 'server') {
        return props.rows
    }

    return props.rows.filter((row) =>
        Object.entries(currentFilters.value).every(([key, filterValue]) => {
            if (filterValue === null || filterValue === '') {
                return true
            }

            const column = props.columns.find((item) => item.key === key)

            if (!column) {
                return true
            }

            if (column.filterPredicate) {
                return column.filterPredicate(row, filterValue)
            }

            const rowValue = column.filterValue?.(row) ?? column.value?.(row) ?? row[column.key]

            return column.filter?.type === 'text'
                ? String(rowValue ?? '').toLocaleLowerCase().includes(String(filterValue).toLocaleLowerCase())
                : rowValue === filterValue
        })
    )
})

const sortedRows = computed(() => {
    if (props.mode === 'server' || !currentSort.value) {
        return filteredRows.value
    }

    const column = props.columns.find((item) => item.key === currentSort.value?.key)

    if (!column) {
        return filteredRows.value
    }

    const direction = currentSort.value.direction === 'asc' ? 1 : -1

    return filteredRows.value
        .map((row, index) => ({ row, index }))
        .sort((left, right) => {
            const leftValue = resolveSortValue(left.row, column)
            const rightValue = resolveSortValue(right.row, column)
            const compared = column.compare ? column.compare(left.row, right.row) * direction : leftValue == null || rightValue == null ? (leftValue == null && rightValue == null ? 0 : leftValue == null ? 1 : -1) : compareValues(leftValue, rightValue) * direction
            return compared === 0 ? left.index - right.index : compared
        })
        .map(({ row }) => row)
})

const totalItems = computed(() => (props.mode === 'server' ? Math.max(0, props.totalItems) : sortedRows.value.length))
const pageRows = computed(() => {
    if (props.paginationMode !== 'page' || props.mode === 'server') {
        return sortedRows.value
    }

    const start = (Math.max(1, Math.floor(currentPage.value || 1)) - 1) * normalizedPageSize.value
    return sortedRows.value.slice(start, start + normalizedPageSize.value)
})
const canVirtualize = computed(() => props.virtual && props.paginationMode !== 'page')
const virtualStart = computed(() => (canVirtualize.value ? Math.max(0, Math.floor(scrollTop.value / props.rowHeight) - Math.max(0, props.overscan)) : 0))
const virtualCount = computed(() => (canVirtualize.value ? Math.ceil(viewportHeight.value / props.rowHeight) + Math.max(0, props.overscan) * 2 : pageRows.value.length))
const displayRows = computed(() => (canVirtualize.value ? pageRows.value.slice(virtualStart.value, virtualStart.value + virtualCount.value) : pageRows.value))
const topSpacerHeight = computed(() => virtualStart.value * props.rowHeight)
const bottomSpacerHeight = computed(() => Math.max(0, pageRows.value.length - virtualStart.value - displayRows.value.length) * props.rowHeight)
const selectedKeys = computed(() => new Set(currentSelection.value))
const selectionRows = computed(() => (props.paginationMode === 'page' ? pageRows.value : props.mode === 'server' ? props.rows : sortedRows.value))
const selectableKeys = computed(() => selectionRows.value.filter(props.isRowSelectable).map((row, index) => props.getRowKey(row, index)))
const allSelected = computed(() => selectableKeys.value.length > 0 && selectableKeys.value.every((key) => selectedKeys.value.has(key)))
const someSelected = computed(() => !allSelected.value && selectableKeys.value.some((key) => selectedKeys.value.has(key)))

function resolveSortValue(row: Row, column: H0DataTableColumn<Row>) {
    return column.sortValue?.(row) ?? column.value?.(row) ?? row[column.key]
}

function compareValues(left: unknown, right: unknown) {
    if (typeof left === 'number' && typeof right === 'number') {
        return left - right
    }

    return String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: 'base' })
}

function setSelectFilter(column: H0DataTableColumn<Row>, value: H0SelectValue | H0SelectValue[] | null) {
    setFilter(column.key, Array.isArray(value) ? value[0] ?? null : value)
}

function setSort(column: H0DataTableColumn<Row>) {
    if (!column.sortable) {
        return
    }

    const nextSort: H0DataTableSort = currentSort.value?.key !== column.key ? { key: column.key, direction: 'asc' } : currentSort.value.direction === 'asc' ? { key: column.key, direction: 'desc' } : null
    sortState.setValue(nextSort)
    pageState.setValue(1)
}

function setFilter(key: string, value: H0DataTableFilterValue) {
    filtersState.setValue({ ...currentFilters.value, [key]: value })
    pageState.setValue(1)
}

function toggleRow(row: Row, index: number) {
    if (props.selectionMode === 'none' || !props.isRowSelectable(row)) {
        return
    }

    const key = props.getRowKey(row, index)
    const next = new Set(props.selectionMode === 'single' ? [] : currentSelection.value)

    if (selectedKeys.value.has(key)) {
        next.delete(key)
    } else {
        next.add(key)
    }

    selectionState.setValue([...next])
}

function toggleAll() {
    const next = new Set(currentSelection.value)

    if (allSelected.value) {
        selectableKeys.value.forEach((key) => next.delete(key))
    } else {
        selectableKeys.value.forEach((key) => next.add(key))
    }

    selectionState.setValue([...next])
}

function handleScroll(event: Event) {
    const target = event.currentTarget as HTMLElement
    scrollTop.value = target.scrollTop
    viewportHeight.value = target.clientHeight

    if (props.paginationMode === 'infinite' && props.hasMore && !props.loading && !loadLocked.value && target.scrollHeight - target.scrollTop - target.clientHeight <= props.rowHeight * 2) {
        loadLocked.value = true
        emit('load-more')
    }
}

function handleRowClick(row: Row, localIndex: number, event: MouseEvent) {
    emit('row-click', row, virtualStart.value + localIndex, event)
}

watch(
    () => [props.loading, props.rows.map((row, index) => props.getRowKey(row, index))] as const,
    ([loading, keys], previous) => {
        const [previousLoading, previousKeys] = previous ?? [false, []]
        if ((!loading && previousLoading) || keys.length !== previousKeys.length) {
            loadLocked.value = false
        }
        if (new Set(keys).size !== keys.length) {
            console.warn('[H0N UI] DataTable row keys must be unique and stable.')
        }
    },
    { immediate: true }
)

watch(
    () => [props.virtual, props.paginationMode, props.scrollHeight, props.rowHeight],
    () => {
        if (props.virtual && (props.paginationMode === 'page' || !props.scrollHeight || props.rowHeight <= 0)) {
            console.warn('[H0N UI] H0DataTable virtualization requires scrollHeight, rowHeight > 0, and paginationMode other than page.')
        }
    },
    { immediate: true }
)

</script>

<template>
    <div data-h0n-component="data-table" class="h-data-table" :style="virtual ? { '--h-data-table-row-height': `${rowHeight}px` } : undefined">
        <div v-if="$slots.toolbar" class="h-data-table__toolbar"><slot name="toolbar" :filters="filters" :set-filter="setFilter" /></div>
        <div v-if="error && rows.length" class="h-data-table__error" role="alert">{{ error }}</div>

        <H0Table
            :columns="tableColumns"
            :rows="displayRows"
            :get-row-key="(row, index) => getRowKey(row, virtualStart + index)"
            :density="density"
            :striped="striped"
            :hoverable="hoverable"
            :bordered="bordered"
            :sticky-header="stickyHeader"
            :scroll-height="scrollHeight"
            :min-width="minWidth"
            :loading="loading && !rows.length"
            :empty-text="resolvedEmptyText"
            :loading-text="resolvedLoadingText"
            :aria-label="resolvedAriaLabel"
            @row-click="handleRowClick"
            @viewport-scroll="handleScroll"
        >
            <template v-if="selectionMode === 'multiple'" #header-__selection>
                <H0Checkbox class="h-data-table__selection-control" :model-value="allSelected" :indeterminate="someSelected" :label="dataTableLocale.selectAll" @change="toggleAll" @click.stop />
            </template>

            <template #cell-__selection="{ row, rowIndex }">
                <H0Radio
                    v-if="selectionMode === 'single'"
                    :model-value="currentSelection[0] ?? null"
                    :value="getRowKey(row, virtualStart + rowIndex)"
                    :disabled="!isRowSelectable(row)"
                    :aria-label="dataTableLocale.selectRow(virtualStart + rowIndex)"
                    @click.stop
                    @change="toggleRow(row, virtualStart + rowIndex)"
                />
                <H0Checkbox
                    v-else
                    class="h-data-table__selection-control"
                    :model-value="selectedKeys.has(getRowKey(row, virtualStart + rowIndex))"
                    :disabled="!isRowSelectable(row)"
                    :label="dataTableLocale.selectRow(virtualStart + rowIndex)"
                    @click.stop
                    @change="toggleRow(row, virtualStart + rowIndex)"
                />
            </template>

            <template v-for="column in columns" :key="column.key" #[`header-${column.key}`]>
                <div class="h-data-table__header">
                    <button v-if="column.sortable" class="h-data-table__sort" type="button" :aria-label="dataTableLocale.sort(column.label)" @click="setSort(column)">
                        <span>{{ column.label }}</span><span aria-hidden="true">{{ currentSort?.key === column.key ? (currentSort.direction === 'asc' ? '↑' : '↓') : '↕' }}</span>
                    </button>
                    <span v-else>{{ column.label }}</span>

                    <slot :name="`filter-${column.key}`" :column="column" :value="currentFilters[column.key] ?? null" :set-filter="(value: H0DataTableFilterValue) => setFilter(column.key, value)">
                        <H0SearchField
                            v-if="column.filter?.type === 'text'"
                            class="h-data-table__filter-control"
                            :model-value="String(currentFilters[column.key] ?? '')"
                            :placeholder="column.filter.placeholder ?? dataTableLocale.filter(column.label)"
                            :aria-label="dataTableLocale.filter(column.label)"
                            @update:model-value="setFilter(column.key, $event)"
                        />
                        <H0Select
                            v-else-if="column.filter?.type === 'select'"
                            class="h-data-table__filter-control"
                            :model-value="(currentFilters[column.key] as H0SelectValue | null) ?? null"
                            :options="column.filter.options"
                            :placeholder="column.filter.placeholder ?? dataTableLocale.filter(column.label)"
                            :control-attrs="{ 'aria-label': dataTableLocale.filter(column.label) }"
                            size="sm"
                            @update:model-value="setSelectFilter(column, $event)"
                        />
                    </slot>
                </div>
            </template>

            <template v-for="column in columns" :key="`cell-${column.key}`" #[`cell-${column.key}`]="slotProps">
                <div class="h-data-table__cell-content"><slot :name="`cell-${column.key}`" v-bind="slotProps">{{ slotProps.value }}</slot></div>
            </template>

            <template #before-rows="{ columnCount }">
                <tr v-if="topSpacerHeight" aria-hidden="true"><td class="h-data-table__spacer" :colspan="columnCount" :style="{ height: `${topSpacerHeight}px` }" /></tr>
            </template>

            <template #after-rows="{ columnCount }">
                <tr v-if="bottomSpacerHeight" aria-hidden="true"><td class="h-data-table__spacer" :colspan="columnCount" :style="{ height: `${bottomSpacerHeight}px` }" /></tr>
                <tr v-if="paginationMode === 'infinite' && loading && rows.length">
                    <td class="h-data-table__append" :colspan="columnCount"><span role="status">{{ resolvedLoadingText }}</span></td>
                </tr>
            </template>

            <template #empty>
                <slot v-if="error" name="error" :error="error"><div class="h-data-table__empty-error" role="alert">{{ error }}</div></slot>
                <slot v-else name="empty"><span>{{ resolvedEmptyText }}</span></slot>
            </template>
        </H0Table>

        <div v-if="paginationMode === 'page'" class="h-data-table__footer">
            <H0Pagination :page="currentPage" :page-size="normalizedPageSize" :total-items="totalItems" show-summary :disabled="loading" @update:page="pageState.setValue($event)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.h-data-table {
    min-width: 0;
}

.h-data-table__toolbar,
.h-data-table__footer,
.h-data-table__error {
    background: var(--h0n-ui-color-surface);
    padding: var(--h0n-ui-spacing-md);
}

.h-data-table__footer {
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: 0 0 var(--h0n-ui-radius-xl) var(--h0n-ui-radius-xl);
    border-top: 0;
}

.h-data-table__header {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
}

.h-data-table__sort {
    align-items: center;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    gap: var(--h0n-ui-spacing-xs);
    padding: 0;
}

.h-data-table__sort:focus-visible {
    box-shadow: var(--h0n-ui-focus-ring);
    outline: none;
}

.h-data-table__filter-control {
    min-width: 80px;
    width: 100%;
}

.h-data-table__spacer {
    border: 0 !important;
    padding: 0 !important;
}

.h-data-table__append,
.h-data-table__empty-error {
    align-items: center;
    color: var(--h0n-ui-color-muted);
    display: flex;
    gap: var(--h0n-ui-spacing-sm);
    justify-content: center;
    padding: var(--h0n-ui-spacing-lg);
}

.h-data-table__error,
.h-data-table__empty-error {
    color: var(--h0n-ui-color-danger-text);
}

.h-data-table:has(.h-data-table__footer) :deep(.h-table) {
    border-radius: var(--h0n-ui-radius-xl) var(--h0n-ui-radius-xl) 0 0;
}

.h-data-table :deep(.h-table__row) {
    height: var(--h-data-table-row-height, auto);
}

.h-data-table :deep(.h-checkbox-field) {
    display: inline-grid;
    vertical-align: middle;
}

.h-data-table__selection-control :deep(.h-checkbox__label) {
    block-size: 1px;
    clip-path: inset(50%);
    inline-size: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
}

.h-data-table__cell-content {
    max-height: var(--h-data-table-row-height, none);
    min-width: 0;
    overflow: hidden;
}
</style>
