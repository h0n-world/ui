---
title: Field
description: Coordinate label, hint, error, disabled, and required metadata around a form control.
path: /components/field
group: Components
section: Forms
order: 164
---

# Field

`H0Field` provides shared form metadata and accessible relationships to custom or H0N controls.

## Import

:::component-api imports
:::

## Usage

Built-in H0N controls consume Field context automatically. Put the control directly in the default slot and avoid duplicating field props on both components.

:::example components/field/BasicExample
:::

## Orientation and validation

Vertical orientation is the default. Horizontal orientation reserves a label column and works well in wide settings forms.

:::example components/field/LayoutExample
:::

## Custom label and messages

Named slots replace the corresponding text props while preserving accessible relationships.

:::example components/field/SlotsExample
:::

For a custom native control, bind the default slot's `controlAttrs` to the actual focusable element. Prefer an existing H0N control whenever one covers the use case.

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0FieldProps` describes the complete Field prop object.

### H0Orientation

:::component-api type H0Orientation
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Keep exactly one visible label per control.
- Built-in form controls inherit IDs and description relationships from Field.
- Custom controls must forward `controlAttrs`.
- Render errors as actionable text, not color alone.

## Responsive behavior

Use vertical orientation on narrow surfaces; horizontal layout reserves a label column.

## Performance

Field context is local and lightweight. Avoid deeply nesting unrelated controls in one Field.

## Styling

Use orientation and public tokens; generated IDs and context internals are implementation details.
