---
title: Typography
description: Apply the H0N type scale while preserving semantic HTML.
path: /components/typography
group: Components
section: Content
order: 137
---

# Typography

`H0Typography` separates visual type style from the rendered HTML element. Choose semantics first, then use `variant` to apply the required scale.

## Import

:::component-api imports
:::

## Type scale

:::example components/typography/SpecimensExample
:::

## Default elements

Each visual variant selects a semantic element when `as` is omitted: `h1` through `h6` render the matching heading, `body` and `body-sm` render `p`, `body-xs` renders `span`, and `code` renders `code`.

:::example components/typography/ElementMappingExample
:::

## Semantics, color, and emphasis

`as` overrides the default element without changing the selected visual variant. Without an explicit `weight`, each variant uses its own weight; passing `weight` overrides it. `color="inherit"` uses the color of the parent element.

:::example components/typography/SemanticsExample
:::

## Props

:::component-api props
:::

When `text` is defined, including as an empty string or `0`, it replaces the default slot content. Native attributes and listeners fall through to the rendered root element. For example, `for` can be passed when `as="label"`.

## Types

`H0TypographyProps` represents the complete public prop object documented above.

### H0TypographyVariant

:::component-api type H0TypographyVariant
:::

### H0TypographyElement

:::component-api type H0TypographyElement
:::

### H0TypographyWeight

:::component-api type H0TypographyWeight
:::

### H0TypographyAlign

:::component-api type H0TypographyAlign
:::

### H0TypographyColor

:::component-api type H0TypographyColor
:::

## Slots

:::component-api slots
:::

## Events

:::component-api events
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

Preserve a logical heading hierarchy independent of visual size. Use `as` when the required heading level differs from the desired variant. Choose `strong` and `em` only when their semantic meaning is appropriate, not merely for visual styling. When rendering `label`, pass a matching native `for` attribute; prefer `H0Label` for form-specific label and required-state presentation. Do not use color or weight as the only signal of meaning.

## Responsive behavior

Typography sizes follow global H0N typography configuration. `truncate` is single-line and needs a constrained width. Inline elements such as the default `body-xs` span may also need an appropriate layout or `display: inline-block`; allow ordinary body text to wrap.

## Styling

Prefer variants and global typography tokens. Treat typography classes as implementation details.
