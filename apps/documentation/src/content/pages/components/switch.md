---
title: Switch
description: Toggle a setting that takes effect immediately.
path: /components/switch
group: Components
section: Forms
order: 176
---

# Switch

`H0Switch` represents an immediate boolean setting with native checkbox submission behavior, switch semantics, validation, and Form integration.

## Import

:::component-api imports
:::

## Usage

Use a switch when changing the value takes effect immediately. Use a checkbox when users collect choices for a later submit action.

:::example components/switch/BasicExample
:::

## States and custom labels

The boolean model is independent from the native submitted `value`. Disabled switches remain visible but unavailable; `error` communicates validation rather than operational failure.

:::example components/switch/StatesExample
:::

## Form integration

A named switch registers its boolean state with `H0Form`. `defaultValue` is restored by form reset.

:::example components/switch/FormExample
:::

## Events

:::component-api events
:::

## Props

Ordinary fallthrough attributes target the component root. Use `rootAttrs` for that wrapper and `controlAttrs` for native checkbox or ARIA attributes that must reach the switch control.

:::component-api props
:::

## Types

`H0SwitchProps` describes the complete prop object. `H0SwitchEmits` describes model updates, changes, focus, and blur.

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Label the enabled state positively and keep its effect predictable.
- Do not use a switch for more than two states.
- Do not rely on track color alone; native switch semantics expose the checked state.
- Keep validation feedback specific and actionable.

## Responsive behavior

The label wraps while the switch track remains a fixed touch target.

## Performance

Avoid triggering duplicate remote mutations while controlled state is still updating.

## Styling

Use disabled, error, hint, and public tokens; native checkbox internals are implementation details.
