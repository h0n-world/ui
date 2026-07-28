---
title: Pagination
description: Navigate known page numbers with ellipses and optional result summary.
path: /components/pagination
group: Components
section: Navigation
order: 193
---
# Pagination

`H0Pagination` computes numbered navigation from either `totalPages` or `totalItems` and `pageSize`.

## Import

:::component-api imports
:::

## Usage

:::example components/pagination/BasicExample
:::

Bind `v-model:page` and fetch the matching dataset when `change` fires. Explicit `totalPages` takes precedence over the derived total.

## Sizes

Use `sm` for dense toolbars, `md` for the standard interface, and `lg` when pagination needs greater visual prominence or a larger target area. Keep one size throughout a pagination instance.

:::example components/pagination/SizesExample
:::

## With summary

Enable `showSummary` when users benefit from seeing the current result range and total count. Provide `totalItems` and `pageSize` so the component can calculate both the summary and total pages.

:::example components/pagination/SummaryExample
:::

## Large page ranges and disabled state

Only boundary pages, siblings, and ellipses are rendered for large totals. Increase `siblingCount` when the surrounding layout has enough space.

:::example components/pagination/WindowExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0PaginationProps` and `H0PaginationEmits` describe the prop and event contracts.

### H0PaginationSize

:::component-api type H0PaginationSize
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

Provide a specific navigation label. The active page uses `aria-current="page"`, and every numbered control receives a localized accessible label.

## Responsive behavior

Controls wrap when space is constrained. With `showSummary`, the summary centers above or beside navigation depending on width.

## Performance

Only the visible boundary, sibling, and ellipsis controls are rendered regardless of total page count.

## Styling

Use size and public tokens. Page-item and ellipsis selectors are implementation details.
