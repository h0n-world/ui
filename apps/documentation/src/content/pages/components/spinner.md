---
title: Spinner
description: Indicate short ongoing work when progress cannot be measured.
path: /components/spinner
group: Components
section: Feedback
order: 155
---

# Spinner

`H0Spinner` is a compact indeterminate status indicator. It communicates that work is ongoing but does not communicate completion percentage or remaining time.

## Import

:::component-api imports
:::

## Sizes

`size` accepts any public CSS size value. Choose a size that matches the surrounding control or surface.

:::example components/spinner/SizesExample
:::

## Loading context

The spinner already uses `role="status"` and its `label` becomes the accessible name. Visible explanatory copy can provide more context for everyone; avoid adding another nested status role around it.

:::example components/spinner/ContextExample
:::

## Loading buttons

`H0Button` already integrates an appropriately sized spinner through its `loading` state. Prefer that API for button-owned work instead of composing `H0Spinner` manually.

:::example components/spinner/ButtonExample
:::

## Parent-owned async state

Mount and remove the spinner from the same state that owns the operation. Disable or guard initiating controls to prevent duplicate requests.

:::example components/spinner/AsyncExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0SpinnerProps` represents the complete public prop object.

### H0SpinnerSize

:::component-api type H0SpinnerSize
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Replace the generic default label with the specific operation when possible.
- Avoid mounting several independently announced spinners for one loading region.
- Keep adjacent controls disabled or otherwise prevent duplicate submissions while work is active.
- Use `H0Skeleton` when known content geometry should remain stable.
- Use determinate progress when the application can measure completion.

## Responsive behavior

Spinner has fixed equal dimensions and does not affect surrounding width beyond its chosen size.

## Performance

Use one spinner per loading context. Avoid leaving indeterminate loading visible after an operation has failed or completed.

Rotation runs only with `data-h0n-animation="high"` and stops whenever the operating system requests reduced motion. The static ring and accessible status label remain present, so loading state does not depend on animation alone.

## Styling

Spinner inherits `currentColor`; set color on the surrounding context. Internal border and animation selectors and `--h-spinner-size` are implementation details.
