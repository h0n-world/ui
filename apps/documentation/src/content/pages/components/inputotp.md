---
title: InputOTP
description: Enter four- or six-character verification codes with paste and completion handling.
path: /components/inputotp
group: Components
section: Forms
order: 169
---

# InputOTP

`H0InputOTP` manages segmented numeric or alphanumeric verification code entry, paste, keyboard navigation, validation, completion, and Form integration.

## Import

:::component-api imports
:::

## Usage

The model remains one normalized string. `complete` fires when every cell is filled and validation succeeds.

:::example components/input-otp/BasicExample
:::

## Length, validation, and variants

Choose four or six cells. Numeric validation removes non-digits; alphanumeric validation accepts letters and numbers and normalizes letters to uppercase.

:::example components/input-otp/VariantsExample
:::

## Sizes

Use `sm`, `md`, or `lg` to align the OTP cells with the size of adjacent form controls. The default size is `md`.

:::example components/input-otp/SizesExample
:::

## Manual confirmation

Set `autoComplete` to `false` when a separate action should confirm the code. A custom validator may return `false` or a message; `confirm()` emits `complete` only for a full valid value.

:::example components/input-otp/ValidationExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0InputOTPProps` and `H0InputOTPEmits` describe the complete prop and event contracts.

### H0InputOTPLength

:::component-api type H0InputOTPLength
:::

### H0InputOTPSize

:::component-api type H0InputOTPSize
:::

### H0InputOTPVariant

:::component-api type H0InputOTPVariant
:::

### H0InputOTPValidation

:::component-api type H0InputOTPValidation
:::

### H0InputOTPValidator

:::component-api type H0InputOTPValidator
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Give the group a visible label.
- Keep one-time-code autocomplete enabled for codes delivered out of band.
- Provide actionable invalid text without revealing sensitive verification details.
- Pasting a complete code is supported.

## Responsive behavior

Cells maintain touch targets; ensure the container has room for six characters.

## Performance

Keep validation synchronous and inexpensive. Start network verification after `complete`, not on every character.

## Styling

Use variant and public state props; cell focus and transition selectors are implementation details.
