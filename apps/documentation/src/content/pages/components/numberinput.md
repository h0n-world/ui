---
title: NumberInput
description: Enter localized numeric values with parsing, formatting, constraints, and step controls.
path: /components/numberinput
group: Components
section: Forms
order: 170
---

# NumberInput

`H0NumberInput` provides localized parsing and formatting around spinbutton semantics, keyboard stepping, precision, and bounds.

## Import

:::component-api imports
:::

## Usage

Values commit on blur or Enter. Arrow keys step once, Page keys step ten times, and Home/End use configured bounds.

:::example components/number-input/BasicExample
:::

## Variants

NumberInput inherits the `surface` and `secondary` field treatments from H0Input while preserving localized numeric editing and step controls.

:::example components/number-input/VariantsExample
:::

## Localized and custom formatting

Use `locale` and `formatOptions` for standard `Intl.NumberFormat` output. Provide stable `parse` and `format` functions only for domain-specific text.

:::example components/number-input/FormattingExample
:::

## States and step controls

Hide step buttons when free typing is primary. `readonly` keeps the value focusable; `disabled` prevents interaction. Invalid raw text emits `invalid`.

:::example components/number-input/StatesExample
:::

## Events

:::component-api events
:::

## Props

Ordinary fallthrough attributes target the component root. Use `rootAttrs` for that wrapper and `controlAttrs` for native or ARIA attributes that must reach the spinbutton input; the increment and decrement buttons keep component-owned attributes.

:::component-api props
:::

## Types

`H0NumberInputProps` and `H0NumberInputEmits` describe the component contract.

### H0NumberParser

:::component-api type H0NumberParser
:::

### H0NumberFormatter

:::component-api type H0NumberFormatter
:::

### H0NumberFormatOptions

:::component-api type H0NumberFormatOptions
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Provide a label and explicit bounds when they matter.
- The control exposes spinbutton semantics and keyboard stepping.
- Keep wheel changes disabled unless users clearly expect them.
- Explain units in the label or hint.

## Responsive behavior

The field fills its container while step controls remain fixed at the edge.

## Performance

Keep custom parser and formatter stable and deterministic.

## Styling

Use validation and public tokens; spin controls and raw text state are implementation details.
