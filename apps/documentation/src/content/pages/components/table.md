---
title: Table
description: Render semantic tabular data with typed columns, custom cells, and reliable scrolling.
path: /components/table
group: Components
section: Data
order: 140
---

# Table

`H0Table` is the presentational foundation for semantic tabular data. It renders native table markup, owns layout and visual states, and leaves sorting, filtering, selection, and pagination to the consumer or `H0DataTable`.

## Import

:::component-api imports
:::

## Usage

Define columns once, pass typed row objects, and provide a stable row key. Named cell slots customize individual values without replacing the table structure.

:::example components/table/BasicExample
:::

## Table or DataTable

Use `H0Table` when data transformation belongs to application logic or when the table is primarily presentational. Use `H0DataTable` when the interface needs built-in sorting, filters, row selection, page or infinite pagination, or fixed-row virtualization.

## Columns and values

Column `key` resolves `row[column.key]` by default. Use `value(row)` for derived content; its result is rendered by default and passed to the corresponding `cell-[key]` slot as `value`. Render arrays, objects, and other structured values through a cell slot. `align` and `headerAlign` control alignment independently.

Numeric `width`, `minWidth`, and `maxWidth` values become pixels, while strings accept CSS sizes.

## Density and scroll geometry

`columnSizing="equal"` enables fixed table layout and shares available width between columns without their own width constraints. `scrollHeight` creates a keyboard-focusable scrolling viewport; combine it with `minWidth` to preserve readable columns on narrow screens. Numeric `scrollHeight` and `minWidth` values become pixels, while strings accept CSS sizes.

:::example components/table/LayoutExample
:::

## Empty and loading states

Default state copy comes from the locale service. Non-empty `emptyText` and `loadingText` values override that copy; an empty string uses the localized fallback rather than hiding it. The loading state appears only when `loading` is true and `rows` is empty. Existing rows remain visible without an additional loading indicator.

The `empty` and `loading` slots replace the content inside the component-owned state cell.

:::example components/table/StatesExample
:::

## Custom content and row events

Dynamic slots follow the column key: `header-total` customizes the header and `cell-total` customizes each body cell. `before-rows` and `after-rows` are inserted directly inside `tbody`, so their content must use valid `tr` and `td` markup. Both expose `columnCount` for spanning the complete table.

The following example derives a column value, adds a summary row, and separates a row click from an interactive control inside a cell.

:::example components/table/CustomContentExample
:::

## Events

:::component-api events
:::

`row-click` reports the row, its current array index, and the native `MouseEvent`. Events from interactive descendants bubble to the row; use `@click.stop` when a cell action must not also emit `row-click`. `viewport-scroll` reports the native scroll event from the internal viewport.

## Props

:::component-api props
:::

`hoverable` adds only pointer-hover styling and does not enable or disable `row-click`. Native fallthrough attributes and listeners are applied to the outer component `div`, not the internal `table`.

## Types

`H0TableProps<Row>` represents the complete generic prop object documented above. `H0TableEmits<Row>` maps `row-click` to `[row: Row, index: number, event: MouseEvent]` and `viewport-scroll` to `[event: Event]`.

### H0TableColumn

:::component-api type H0TableColumn
:::

### H0TableColumnAlign

:::component-api type H0TableColumnAlign
:::

### H0TableColumnSizing

:::component-api type H0TableColumnSizing
:::

### H0TableDensity

:::component-api type H0TableDensity
:::

### H0TableAriaSort

:::component-api type H0TableAriaSort
:::

### H0TableRow

:::component-api type H0TableRow
:::

### H0TableRowKey

:::component-api type H0TableRowKey
:::

### H0TableGetRowKey

:::component-api type H0TableGetRowKey
:::

## Slots

:::component-api slots
:::

For example, a column with `key: 'status'` creates `header-status` and `cell-status`. The custom `empty` and `loading` slots provide cell content and must not create another table row. In contrast, `before-rows` and `after-rows` must create complete rows.

## Exposed API

:::component-api exposed
:::

## Accessibility

- Provide a specific `ariaLabel`; otherwise the table uses the localized generic label. A visible `caption` does not replace this accessible label.
- Prefer `caption` or the `caption` slot when a visible description helps every user.
- Supply stable row keys and meaningful column labels.
- Set and update `ariaSort` from external sort state only on the column that currently controls sorting. `H0Table` does not sort rows.
- `row-click` does not give a row button semantics or keyboard interaction. Put primary actions in keyboard-accessible controls such as `H0Button` or `H0Link` inside cells.
- Do not place critical information exclusively in color-coded cells.

## Responsive behavior

Allow the component to fill a fluid container. For dense datasets, combine column minimum widths with `minWidth`; the internal viewport then scrolls horizontally instead of compressing content beyond readability.

## Performance

Keep column definitions and row arrays stable. `H0Table` renders every supplied row; use `H0DataTable` virtualization for large fixed-height datasets.

## Styling

Use `density`, `striped`, `hoverable`, and `bordered` before local overrides. Cell slots may style their own content with public H0N tokens. Internal table selectors and layout variables are implementation details.
