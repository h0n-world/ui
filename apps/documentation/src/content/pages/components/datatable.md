---
title: DataTable
description: Add sorting, filtering, selection, pagination, and virtualization to typed tabular data.
path: /components/datatable
group: Components
section: Data
order: 141
---

# DataTable

`H0DataTable` composes `H0Table` with controlled or uncontrolled sorting, filtering, selection, page pagination, infinite loading, and fixed-row virtualization.

## Import

:::component-api imports
:::

## Client pipeline

In client mode, the component applies filters, stable sorting, and page slicing in that order. Text filters perform a locale-aware, case-insensitive substring match; select filters use strict equality. `null` and an empty string disable a filter, while `0` and `false` remain active values.

Default sorting resolves `sortValue(row)`, then `value(row)`, then `row[column.key]`. Numbers use numeric comparison, other values use locale comparison with numeric ordering, and nullish values remain last in either direction. Equal values preserve their source order. Sort buttons cycle through ascending, descending, and unsorted states.

:::example components/data-table/ClientExample
:::

## Column configuration

Columns extend [`H0TableColumn`](/components/table#h0tablecolumn) with sorting and filter behavior. Provide `sortValue` for derived scalar values, `compare` for domain-specific ordering, and `filterPredicate` when text equality or substring matching is insufficient. Filtering resolves `filterValue(row)`, then the base column `value(row)`, then `row[column.key]`.

Select-filter options use [`H0SelectOption`](/components/select#types). Changing sort or filters resets the current page to `1` in client and server modes.

## Controlled and uncontrolled state

`sort`, `filters`, `selection`, `page`, and `pageSize` are controlled when their corresponding prop is defined. Use `v-model:*` to apply emitted updates. Otherwise, the component keeps internal state initialized once from `defaultSort`, `defaultFilters`, `defaultSelection`, `defaultPage`, or `defaultPageSize`.

The component has no built-in page-size selector. Although `update:pageSize` is part of the public emits type, ordinary component interaction does not currently emit it; manage page-size controls outside `H0DataTable` when required.

## Server mode

With `mode="server"`, rows are rendered exactly as supplied. Listen to model updates, request the corresponding dataset, and pass the server's `totalItems`. The application owns sorting, filtering, and page slicing; the example below simulates that request pipeline and preserves existing rows during subsequent loading.

:::example components/data-table/ServerExample
:::

## Selection

Single and multiple selection store [`H0TableRowKey`](/components/table#h0tablerowkey) values rather than row objects. `getRowKey` is required and must return a unique, stable value. Use `isRowSelectable` to disable selection controls for particular rows; it does not suppress `row-click`. Select-all targets the current client page or the currently supplied server rows.

## Infinite loading

`paginationMode="infinite"` emits `load-more` within two `rowHeight` values of the viewport end when `hasMore` is true. Further requests are locked until a loading cycle completes or the row count changes. Set `loading` during every request, append the next chunk, and set `hasMore` to false when the dataset is complete.

:::example components/data-table/InfiniteLoadingExample
:::

## Virtualization

Virtualization requires a positive fixed `rowHeight`, a `scrollHeight`, and a pagination mode other than `page`. `overscan` controls the extra rows rendered before and after the visible window; negative values behave as zero.

:::example components/data-table/VirtualExample
:::

> [!NOTE] Fixed row height
> Virtualized cell content is clipped to the configured row height. Do not use this mode for expandable or variable-height rows. Only the active window exists in the accessibility tree, so prefer page pagination when assistive-technology users need to navigate the complete dataset as one table.

## Slots and error states

`toolbar` renders controls above the table. Its `filters` prop reflects the controlled `filters` prop and can be undefined in uncontrolled mode; `filter-[key]` always receives the resolved value and a setter for that column. `cell-[key]` receives the resolved table-cell value.

When `error` is set with no rows, the `error` slot replaces the empty state. When rows remain, the component keeps them visible and renders its own alert above the table. Initial loading uses the full empty-table state, while infinite loading with existing rows appends a status row. Empty `emptyText` and `loadingText` values use localized fallback copy.

:::example components/data-table/SlotsAndErrorsExample
:::

## Events

:::component-api events
:::

`row-click` reports the row, native `MouseEvent`, and its displayed index. In page mode the index is local to the current page; in virtual mode it includes the current virtual offset. Never use this index as identity—use `getRowKey`. Interactive cell controls should stop click propagation when they must not also trigger the row event.

## Props

:::component-api props
:::

In client page mode, the pagination total is calculated from the filtered rows and the `totalItems` prop is ignored. In server page mode, `totalItems` supplies the complete remote count. Page size is normalized to an integer of at least `1`. Numeric `scrollHeight` and `minWidth` values become pixels.

Native fallthrough attributes and listeners apply to the outer component `div`, not the internal table.

## Types

`H0DataTableProps<Row>` represents the complete generic prop object documented above. `H0DataTableEmits<Row>` maps all model updates, `load-more`, and `row-click` to their documented payloads.

### H0DataTableMode

:::component-api type H0DataTableMode
:::

### H0DataTablePaginationMode

:::component-api type H0DataTablePaginationMode
:::

### H0DataTableSelectionMode

:::component-api type H0DataTableSelectionMode
:::

### H0DataTableSortDirection

:::component-api type H0DataTableSortDirection
:::

### H0DataTableSort

:::component-api type H0DataTableSort
:::

### H0DataTableFilterValue

:::component-api type H0DataTableFilterValue
:::

### H0DataTableFilters

:::component-api type H0DataTableFilters
:::

### H0DataTableTextFilter

:::component-api type H0DataTableTextFilter
:::

### H0DataTableSelectFilter

:::component-api type H0DataTableSelectFilter
:::

### H0DataTableFilter

:::component-api type H0DataTableFilter
:::

### H0DataTableSelection

:::component-api type H0DataTableSelection
:::

### H0DataTableColumn

:::component-api type H0DataTableColumn
:::

## Slots

:::component-api slots
:::

For a column with `key: 'status'`, use `filter-status` and `cell-status`. The `error` slot is used only when the dataset is empty; errors with retained rows use the component-owned alert.

## Exposed API

:::component-api exposed
:::

## Accessibility

- Provide a dataset-specific `ariaLabel`.
- Keep row keys stable when sorting, filtering, paging, or recycling virtual rows.
- Use the built-in column filters and selection controls so their localized accessible labels are retained.
- `row-click` does not give rows keyboard interaction or button semantics. Put primary actions in keyboard-accessible controls inside cells.
- Pair badge tones and other color states with visible text.
- Announce external server errors and preserve the built-in `role="alert"` behavior when replacing the error slot.

## Responsive behavior

Set column minimum widths and a table `minWidth` for datasets that cannot collapse cleanly. The internal viewport handles horizontal scrolling. On small screens, consider fewer visible columns or an alternate summary layout rather than making controls too narrow.

## Performance

Use client mode for moderate local datasets and server mode for remote or expensive queries. Keep columns, callbacks, and row keys stable. Enable virtualization only for large, fixed-height collections and tune `overscan` conservatively.

## Styling

`H0DataTable` forwards `density`, `striped`, `hoverable`, `bordered`, and `stickyHeader` to `H0Table`. Style custom cells and toolbar content through their slots with public tokens; sorting, filter, spacer, and selection selectors are implementation details.
