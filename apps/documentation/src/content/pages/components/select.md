---
title: Select
description: Choose one or many values from an accessible floating option list.
path: /components/select
group: Components
section: Forms
order: 175
---

# Select

`H0Select` supports controlled or uncontrolled single and multiple selection, descriptions, icons, loading, virtualization, teleportation, and Form integration.

## Import

:::component-api imports
:::

## Single selection

Use a single select for one value from a known option list. Option values preserve their `string` or `number` type.

:::example components/select/BasicExample
:::

## Multiple selection

Set `multiple` for an array model. `maxSelected` disables unselected options after the limit is reached, while selected options remain available for removal.

:::example components/select/MultipleExample
:::

By default a single select closes after selection and a multiple select remains open. `closeOnSelect` overrides that behavior.

## Variants

`surface` is the default neutral container. Use `secondary` when the select needs stronger separation from the surrounding surface.

:::example components/select/VariantsExample
:::

## Sizes

Use `sm` in dense forms, `md` for most selection controls, and `lg` when the control needs more prominence.

:::example components/select/SizesExample
:::

## States

Loading and disabled states prevent opening. Use `error` for field validation, `emptyText` for a successfully loaded empty collection, and `loading` while options are pending.

:::example components/select/StatesExample
:::

## Large option lists

Enable `virtual` for large fixed-height lists. Keep `optionHeight` equal to the rendered row height; `overscan` controls extra rows rendered outside the viewport.

:::example components/select/VirtualExample
:::

## Attribute forwarding and teleportation

The popup teleports to `body` by default. Use `teleportTo` for another overlay root or `teleportDisabled` when local DOM ownership is required. While open, `lockScroll` prevents the underlying document from moving on desktop and touch devices; disable it only when page scrolling is intentionally part of the surrounding interaction. Ordinary fallthrough attributes target the wrapper, explicit `rootAttrs` override or extend them, and `controlAttrs` target the combobox trigger.

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0SelectProps<Value>` and `H0SelectEmits<Value>` preserve the generic option value throughout the model and event payloads.

### H0SelectValue

:::component-api type H0SelectValue
:::

### H0SelectSize

:::component-api type H0SelectSize
:::

### H0SelectVariant

:::component-api type H0SelectVariant
:::

### H0SelectOption

:::component-api type H0SelectOption
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Provide a visible label and meaningful option labels.
- Give the list a specific `listAriaLabel` when several selects are nearby.
- Preserve disabled option state in custom rendering.
- Arrow keys move through options, Enter or Space selects, and Escape closes the list.
- Keep option descriptions concise so active-option announcements remain useful.

## Responsive behavior

The floating list matches the trigger width and is constrained by `scrollHeight`. Selected values truncate rather than widening the page.

## Performance

Keep option arrays stable and virtualize large fixed-height collections.

## Styling

Use variant, size, validation, attribute forwarding, and option slots; floating geometry and internal list selectors are implementation details.
