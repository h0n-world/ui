---
title: Grid
description: Arrange content in reusable or explicit CSS grid templates.
path: /components/grid
group: Components
section: Layout
order: 182
---

# Grid

`H0Grid` provides common CSS Grid presets while preserving access to explicit column and row templates and semantic root elements.

## Import

:::component-api imports
:::

## Fluid collections

`auto-fit` is the default and creates as many columns as fit with a 220px minimum. An explicit `columns` value can refine that minimum for local content.

:::example components/grid/BasicExample
:::

## Named variants

Use `vertical` for one column, `three` for equal columns, `center-wide` for a prominent center region, and sidebar variants for common application shells.

:::example components/grid/VariantsExample
:::

Fixed three-column and sidebar presets do not add their own media queries. Use them where the available width is known or switch templates in surrounding responsive layout.

## Explicit templates

Set `variant="default"` when `columns` and `rows` should fully define the grid. Values accept normal CSS track syntax; `columns` also accepts a complete `grid-template-columns:` declaration.

:::example components/grid/TemplatesExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0GridProps` describes the complete prop object.

### H0GridVariant

:::component-api type H0GridVariant
:::

### H0GridGap

:::component-api type H0GridGap
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Choose `section`, `article`, or `main` only when the grid has that document meaning.
- Keep visual grid order consistent with DOM and keyboard order.
- Do not use empty grid cells to simulate spacing; use `gap`.

## Responsive behavior

`auto-fit` collapses naturally. Fixed three-column and sidebar presets require an appropriate parent width or responsive template strategy.

## Performance

Grid layout is CSS-only. Keep large item collections keyed and virtualize the collection itself when necessary.

## Styling

Use `gap` and explicit templates for structure. Child surfaces own their padding, border, background, and typography.
