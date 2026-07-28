import type { H0SelectOption } from '../Select'
import type { H0TableColumn, H0TableDensity, H0TableRow, H0TableRowKey } from '../Table'

export type H0DataTableMode = 'client' | 'server'
export type H0DataTablePaginationMode = 'none' | 'page' | 'infinite'
export type H0DataTableSelectionMode = 'none' | 'single' | 'multiple'
export type H0DataTableSortDirection = 'asc' | 'desc'
export type H0DataTableFilterValue = string | number | boolean | null
export type H0DataTableFilters = Record<string, H0DataTableFilterValue>
export type H0DataTableSelection = H0TableRowKey[]

export type H0DataTableSort = {
    key: string
    direction: H0DataTableSortDirection
} | null

export type H0DataTableTextFilter = {
    type: 'text'
    placeholder?: string
}

export type H0DataTableSelectFilter = {
    type: 'select'
    options: H0SelectOption[]
    placeholder?: string
}

export type H0DataTableFilter = H0DataTableTextFilter | H0DataTableSelectFilter

export type H0DataTableColumn<Row extends H0TableRow = H0TableRow> = H0TableColumn<Row> & {
    sortable?: boolean
    sortValue?: (row: Row) => unknown
    compare?: (left: Row, right: Row) => number
    filter?: H0DataTableFilter
    filterValue?: (row: Row) => unknown
    filterPredicate?: (row: Row, value: H0DataTableFilterValue) => boolean
}

export type H0DataTableProps<Row extends H0TableRow = H0TableRow> = {
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
}

export type H0DataTableEmits<Row extends H0TableRow = H0TableRow> = {
    'update:sort': [value: H0DataTableSort]
    'update:filters': [value: H0DataTableFilters]
    'update:selection': [value: H0DataTableSelection]
    'update:page': [value: number]
    'update:pageSize': [value: number]
    'load-more': []
    'row-click': [row: Row, index: number, event: MouseEvent]
}
