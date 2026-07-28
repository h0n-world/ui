---
title: Description
description: Render muted supporting text for fields, cards, and metadata.
path: /components/description
group: Components
section: Content
order: 126
---

# Description

`H0Description` is a constrained Typography preset for secondary explanatory text.

## Import

:::component-api imports
:::

## Sizes and elements

Use the default slot for authored content or `text` for a string or numeric fallback. Slot content takes precedence when both are provided.

:::example components/description/BasicExample
:::

## Describing a field

Native attributes are forwarded to the rendered element. When composing a custom field, give the description an `id` and reference the same value from the control's `aria-describedby`; `H0Description` does not create this relationship automatically. Form controls such as `H0Input` use `H0Description` for their hint and create this relationship automatically.

:::example components/description/FieldDescriptionExample
:::

## Props

:::component-api props
:::

## Types

`H0DescriptionProps` represents the complete public prop object documented above.

### H0DescriptionElement

:::component-api type H0DescriptionElement
:::

### H0DescriptionVariant

:::component-api type H0DescriptionVariant
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

Use `p` for standalone supporting copy, `span` for inline context, and `div` as a neutral block container when paragraph semantics do not apply. Connect field descriptions explicitly with `aria-describedby` on the control.

## Styling

Use `variant` for compact density. Muted color and regular weight are intentionally fixed; use `H0Typography` when broader presentation control is required.
