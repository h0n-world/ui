import type { H0Density } from '../../types'

export type H0TableColumnAlign = 'left' | 'center' | 'right'
export type H0TableColumnSizing = 'auto' | 'equal'
export type H0TableDensity = H0Density
export type H0TableAriaSort = 'ascending' | 'descending' | 'none'
export type H0TableRow = Record<string, unknown>
export type H0TableRowKey = string | number

export type H0TableColumn<Row extends H0TableRow = H0TableRow> = {
    key: string
    label: string
    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    align?: H0TableColumnAlign
    headerAlign?: H0TableColumnAlign
    ariaSort?: H0TableAriaSort
    value?: (row: Row) => unknown
}

export type H0TableGetRowKey<Row extends H0TableRow = H0TableRow> = (row: Row, index: number) => H0TableRowKey

export type H0TableProps<Row extends H0TableRow = H0TableRow> = {
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
}

export type H0TableEmits<Row extends H0TableRow = H0TableRow> = {
    'row-click': [row: Row, index: number, event: MouseEvent]
    'viewport-scroll': [event: Event]
}
