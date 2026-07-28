---
title: Textarea
description: Capture multi-line text with auto-resize, limits, validation, and Form integration.
path: /components/textarea
group: Components
section: Forms
order: 177
---

# Textarea

`H0Textarea` supports controlled or uncontrolled multiline text, native attributes, character limits, automatic height, manual resizing, and Form integration.

## Import

:::component-api imports
:::

## Usage

Use `maxlength` to enforce a native character limit and display the built-in counter. The model updates immediately as text changes.

:::example components/textarea/BasicExample
:::

## Sizes

Use `sm` in dense forms, `md` for most text entry, and `lg` when longer content needs more visual prominence.

:::example components/textarea/SizesExample
:::

## Automatic and manual resizing

`autoResize` grows the control with content until `maxHeight`, then enables internal scrolling. Disable it and set `resize` when users should control height manually.

:::example components/textarea/ResizeExample
:::

## States and native behavior

Read-only text remains focusable and selectable; disabled text is unavailable. Configure `spellcheck`, `inputmode`, and `autocomplete` for the content being entered.

:::example components/textarea/StatesExample
:::

## Events

`input` carries the native event. `change` carries the current string and is emitted for every text update by this component.

:::component-api events
:::

## Props

Ordinary fallthrough attributes target the component root. Use `rootAttrs` to override or extend that wrapper and `controlAttrs` for native textarea or ARIA attributes that must reach the `<textarea>`.

:::component-api props
:::

## Types

`H0TextareaProps` and `H0TextareaEmits` describe the complete prop and event contracts.

### H0TextareaInputMode

:::component-api type H0TextareaInputMode
:::

### H0TextareaSize

:::component-api type H0TextareaSize
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Provide a visible label and explain character limits before the user reaches them.
- Retain validation errors until the value is corrected.
- Configure spellcheck to match prose, identifiers, or code.
- Do not use a placeholder as the only label.

## Responsive behavior

Textarea fills its container and respects maximum height with internal scrolling.

## Performance

Automatic resizing measures after value updates; avoid mounting hundreds of simultaneously auto-resizing controls.

## Styling

Use size, resize props, validation state, and public tokens; native textarea selectors are internal.
