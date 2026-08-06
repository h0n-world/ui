---
title: Radio
description: Choose one value from mutually exclusive native radio controls or option cards.
path: /components/radio
group: Components
section: Forms
order: 172
---

# Radio

`H0Radio` represents one option. `H0RadioGroup` manages a labeled single-choice set in list or card layout.

## Import

:::component-api imports
:::

## Usage

Use a standalone `H0Radio` only in custom compositions. For a normal mutually exclusive field, prefer `H0RadioGroup`.

:::example components/radio/BasicExample
:::

## Surface variants

Use `surface` by default for neutral surfaces and `secondary` when the standalone radio needs stronger separation from its background. This prop is separate from the `list` and `cards` layout variants of `H0RadioGroup`.

:::example components/radio/VariantsExample
:::

## List layout

List groups work well for concise options. Horizontal orientation changes visual layout while preserving the native radio relationship.

:::example components/radio/GroupExample
:::

## Cards and validation

Cards provide more room for descriptions and price metadata. `required` and `validator` are checked by `validate()` and by `H0Form`.

:::example components/radio/ValidationExample
:::

## Events

:::component-api events
:::

## Props

For standalone `H0Radio`, ordinary fallthrough attributes target the component root. Use `rootAttrs` for that wrapper and `controlAttrs` for native radio or ARIA attributes. `H0RadioGroup` keeps its separate group-level contract.

:::component-api props
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Types

`H0RadioProps` and `H0RadioEmits` describe the standalone control. `H0RadioGroupProps` and `H0RadioGroupEmits` describe the grouped control.

### H0RadioVariant

:::component-api type H0RadioVariant
:::

### H0RadioValue

:::component-api type H0RadioValue
:::

### H0RadioValidator

:::component-api type H0RadioValidator
:::

### H0RadioOrientation

:::component-api component H0RadioGroup type H0RadioOrientation
:::

### H0RadioGroupVariant

:::component-api component H0RadioGroup type H0RadioGroupVariant
:::

### H0RadioOption

:::component-api component H0RadioGroup type H0RadioOption
:::

## H0RadioGroup

### Import

:::component-api component H0RadioGroup imports
:::

### Props

:::component-api component H0RadioGroup props
:::

### Events

:::component-api component H0RadioGroup events
:::

### Slots

:::component-api component H0RadioGroup slots
:::

### Exposed API

:::component-api component H0RadioGroup exposed
:::

## Accessibility

- Give the group a question-like label and stable `name`.
- Each option label should describe a distinct outcome.
- Use radios only when exactly one option can be selected.
- Do not use card styling as the only selected-state signal.

## Responsive behavior

Keep descriptions concise and reduce card columns on narrow surfaces.

## Performance

Use stable option arrays and reserve radio groups for moderate choice sets.

## Styling

Use the standalone surface variant, group list/cards variant, and public validation props; native radio behavior remains authoritative.
