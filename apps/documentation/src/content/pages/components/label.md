---
title: Label
description: Label individual form controls, groups, and non-interactive values.
path: /components/label
group: Components
section: Content
order: 133
---

# Label

`H0Label` provides consistent label typography while supporting `label`, `legend`, and `span` semantics.

## Import

:::component-api imports
:::

## Semantics

Use `label` with `htmlFor` for one labelable control, place `legend` directly inside `fieldset` for a group, and use `span` only when another component owns an explicit relationship such as `aria-labelledby`. `htmlFor` is applied only when `as="label"`.

:::example components/label/SemanticsExample
:::

## Props

:::component-api props
:::

The `text` fallback accepts strings or numbers. Default-slot content takes precedence when both are provided. Native attributes are forwarded to the selected root element.

## Types

`H0LabelProps` represents the complete public prop object documented above.

### H0LabelElement

:::component-api type H0LabelElement
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

- Associate a `label` with exactly one labelable control.
- Keep `legend` as a direct child of its `fieldset`.
- A `span` does not create a labeling relationship by itself; reference its `id` with `aria-labelledby`.
- The required asterisk is visual and `aria-hidden`; it does not make a control required or announce the word “required”. Apply native `required` or `aria-required` to the associated control separately.

## Styling

Label typography is intentionally fixed. Use `H0Typography` for headings or non-form text that needs broader styling control.
