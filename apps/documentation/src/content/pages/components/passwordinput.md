---
title: PasswordInput
description: Enter passwords with visibility control, Caps Lock feedback, and strength guidance.
path: /components/passwordinput
group: Components
section: Forms
order: 171
---

# PasswordInput

`H0PasswordInput` combines password entry with controlled visibility, localized reveal labels, Caps Lock detection, and optional strength display.

## Import

:::component-api imports
:::

## Usage

Strength is application-supplied from zero to four; the component displays it but does not evaluate password quality.

:::example components/password-input/BasicExample
:::

## Variants

PasswordInput inherits the `surface` and `secondary` field treatments from H0Input while preserving password visibility and strength feedback.

:::example components/password-input/VariantsExample
:::

## Controlled visibility

Use `v-model:visible` when surrounding UI needs to know or control whether the password is revealed. Otherwise `defaultVisible` initializes internal state.

:::example components/password-input/VisibilityExample
:::

## Strength and states

`strength` accepts `0`, `1`, `2`, `3`, or `4`. Supply five labels when product language differs from the active locale. Validation errors remain separate from strength guidance.

:::example components/password-input/StatesExample
:::

## Events

:::component-api events
:::

## Props

Ordinary fallthrough attributes target the component root. Use `rootAttrs` for that wrapper and `controlAttrs` for native password or ARIA attributes that must reach the input; the reveal button keeps component-owned attributes.

:::component-api props
:::

## Types

`H0PasswordInputProps` and `H0PasswordInputEmits` describe the component contract.

### H0PasswordStrength

:::component-api type H0PasswordStrength
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Use `current-password` for sign-in and `new-password` for password creation.
- Preserve the localized reveal and hide labels.
- State password requirements before submission.
- Treat the strength meter as guidance, not the validation result.

## Responsive behavior

The field shrinks fluidly while the visibility control remains available.

## Performance

Run expensive strength estimation outside the component and debounce if necessary.

## Styling

Use public validation and strength state; toggle glyphs and meter selectors are implementation details.
