---
title: Input
description: Capture single-line text with labels, affixes, icons, validation, and clearing.
path: /components/input
group: Components
section: Forms
order: 168
---

# Input

`H0Input` is the base single-line control with controlled or uncontrolled state, native attributes, adornments, validation, and Form integration.

## Import

:::component-api imports
:::

## Usage

The model is always a string. Use native `type`, `autocomplete`, `inputmode`, `min`, `max`, and `step` semantics to help browsers and assistive technology.

:::example components/input/BasicExample
:::

## Variants

`surface` is the default neutral field. Use `secondary` when the input needs stronger separation from its surrounding surface.

:::example components/input/VariantsExample
:::

## Sizes and adornments

Use `sm` in dense layouts, `md` for most forms, and `lg` for prominent entry. Text and icon adornments supplement—not replace—the visible label.

:::example components/input/AppearanceExample
:::

## Read-only, disabled, error, and clear

`readonly` keeps a value focusable and selectable. `disabled` removes interaction. Clear is shown only for a non-empty editable value and emits the model update plus `clear`.

:::example components/input/StatesExample
:::

## Events

:::component-api events
:::

## Props

Ordinary fallthrough attributes target the component root. Use `rootAttrs` to override or extend that wrapper and `controlAttrs` for native input or ARIA attributes that must reach the `<input>`.

:::component-api props
:::

## Types

`H0InputProps` and `H0InputEmits` describe the complete prop and event contracts.

### H0AttributeRoutingProps

:::component-api type H0AttributeRoutingProps
:::

### H0InputInputMode

:::component-api type H0InputInputMode
:::

### H0InputSize

:::component-api type H0InputSize
:::

### H0InputVariant

:::component-api type H0InputVariant
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Always provide `label` or place the input inside a labeled `H0Field`.
- Choose the native input type and autocomplete token that match the data.
- Do not use a placeholder as the only label.
- Prefixes, suffixes, and icons should not carry essential meaning alone.

## Responsive behavior

Input fills the supplied container and lets the field shrink while adornments remain visible.

## Performance

Debounce expensive external reactions rather than delaying the component model update.

## Styling

Use size, validation props, adornment slots, and public tokens; native input selectors are implementation details.
