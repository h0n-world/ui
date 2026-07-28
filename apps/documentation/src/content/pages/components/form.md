---
title: Form
description: Collect H0N field values, coordinate validation errors, reset, and submit payloads.
path: /components/form
group: Components
section: Forms
order: 166
---

# Form

`H0Form` coordinates registered H0N controls and native fields into typed values, errors, FormData, validation, reset, and submit flows.

## Import

:::component-api imports
:::

## Usage

Controls require stable `name` values. The form prevents native validation UI by default and validates registered fields on submit.

Registered controls update the aggregate model directly. Native `change` events from those controls are ignored by the form coordinator, so one user change produces one `update:modelValue` and one `change` event. Repeated registered names are represented as an array in registration order.

:::example components/form/BasicExample
:::

## Validation

Required and native validity rules are collected from registered controls. Invalid submission emits `invalid` and focuses the first invalid registered field.

Set `validateOnSubmit` to `false` to skip both registered-field and native constraint validation. Submission still refreshes `values` and `FormData`, but it does not emit `change` unless a field or reset action actually changed the aggregate value.

:::example components/form/ValidationExample
:::

## Server errors and reset

Control errors with `v-model:errors` for API validation. With `clearErrorOnInput`, the changed field's error clears automatically. Submit-generated validation errors are recalculated on every attempt instead of becoming persistent server errors. A reset button restores registered component defaults and native field defaults, clears errors, and synchronizes the aggregate model once.

:::example components/form/ServerErrorsExample
:::

## Types

`H0FormProps` and `H0FormEmits` describe the component contract. Form values and errors are keyed by each control's `name`.

### H0FormValue

:::component-api type H0FormValue
:::

### H0FormValues

:::component-api type H0FormValues
:::

### H0FormErrors

:::component-api type H0FormErrors
:::

### H0FormSubmitPayload

:::component-api type H0FormSubmitPayload
:::

The payload also contains `valid`, `errors`, and native `FormData`; `values` is the normalized object used by H0N controls.

### H0FormInvalidPayload

:::component-api type H0FormInvalidPayload
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Give every registered control a stable `name` and visible label.
- Focus moves to the first invalid registered field on submission.
- Put specific feedback on the field; a form-level summary may supplement it.
- Keep submit and reset actions explicit.

## Responsive behavior

Form is a single-column grid; compose responsive sections with layout components around controls.

## Performance

Keep external errors stable and avoid expensive validation on every change unless required.

## Styling

Form owns spacing, not control appearance. Use public layout tokens and Field integration.
