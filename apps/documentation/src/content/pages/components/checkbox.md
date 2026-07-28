---
title: Checkbox
description: Capture independent boolean choices or a related set of multiple values.
path: /components/checkbox
group: Components
section: Forms
order: 161
---

# Checkbox

`H0Checkbox` represents one boolean choice. `H0CheckboxGroup` manages a string array from uniform options.

## Import

:::component-api imports
:::

## Usage

Use `H0Checkbox` for one independent choice. Its model is a boolean; `defaultValue` initializes uncontrolled state.

:::example components/checkbox/BasicExample
:::

## States and indeterminate

`indeterminate` communicates a partially selected collection. It is visual metadata, not a third model value: interaction still emits `true` or `false`.

:::example components/checkbox/StatesExample
:::

## Checkbox group

Use `H0CheckboxGroup` when related options produce a `string[]`. The group provides shared label, name, validation, and disabled state.

:::example components/checkbox/GroupExample
:::

## Events

:::component-api events
:::

## Props

For standalone `H0Checkbox`, ordinary fallthrough attributes target the component root. Use `rootAttrs` for that wrapper and `controlAttrs` for native checkbox or ARIA attributes. `H0CheckboxGroup` keeps its separate group-level contract.

:::component-api props
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Types

`H0CheckboxProps` and `H0CheckboxEmits` describe the standalone control. `H0CheckboxGroupProps` and `H0CheckboxGroupEmits` describe the grouped control.

### H0CheckboxOption

:::component-api component H0CheckboxGroup type H0CheckboxOption
:::

## H0CheckboxGroup

### Import

:::component-api component H0CheckboxGroup imports
:::

### Props

:::component-api component H0CheckboxGroup props
:::

### Events

:::component-api component H0CheckboxGroup events
:::

### Slots

:::component-api component H0CheckboxGroup slots
:::

### Exposed API

:::component-api component H0CheckboxGroup exposed
:::

## Accessibility

- Use positive labels that describe what being checked means.
- Give every group a question-like label and stable `name`.
- Do not use `indeterminate` as a permanent selectable value.
- Use `error` for actionable validation feedback and `hint` for persistent guidance.

## Responsive behavior

Group options stack naturally and labels wrap. Avoid placing many choices in a single horizontal row.

## Performance

Keep options stable and use groups for moderate sets; use search or selection components for long lists.

## Styling

Use error, hint, disabled, and public tokens instead of targeting the native input internals.
