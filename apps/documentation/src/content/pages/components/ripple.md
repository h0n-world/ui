---
title: Ripple
description: Add optional pointer-origin feedback to custom interactive surfaces.
path: /components/ripple
group: Components
section: Feedback
order: 153
---

# Ripple

`H0Ripple` is a low-level decorative pointer effect for custom interactive surfaces. It does not create semantics, focus behavior, keyboard activation, or disabled behavior for its host.

## Import

:::component-api imports
:::

## Usage

Keep a template ref to the component and forward the host’s `pointerdown` event to `create(event)`. The host must be positioned and clipped because the ripple is absolutely positioned and inherits its radius and `currentColor`.

:::example components/ripple/BasicExample
:::

## Prefer built-in integrations

`H0Button`, interactive `H0Card`, and interactive `H0ListItem` already integrate `H0Ripple`. Use those components directly when they match the interaction; do not add a second ripple inside them.

:::example components/ripple/BuiltInExample
:::

## Animation configuration

Ripples only run while the app-scoped theme service uses animation level `high` and the operating system does not request reduced motion. This also works when runtime appearance attributes are applied to a custom theme target instead of the root document. `disabled` provides a local override. `duration` controls animation and cleanup time in milliseconds; `opacity` controls the strongest visible opacity.

:::example components/ripple/ConfigurationExample
:::

Values outside the usual `0–1` opacity range are accepted by TypeScript but are not useful CSS opacity values. Keep custom durations short enough that overlapping ripples do not distract from the action.

## Events

:::component-api events
:::

## Props

:::component-api props
:::

`H0RippleProps` represents the complete public prop object.

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

`create` requires the original `PointerEvent` so the component can measure `currentTarget` and place the effect at the pointer origin. Keyboard activation should use the host’s normal pressed, active, or focus-visible styling rather than synthesizing a pointer event.

## Accessibility

- Ripple is inert and decorative; the host must provide all button semantics, focus treatment, and keyboard behavior.
- Never rely on the animation as the only activation feedback.
- Respect the global low-animation setting.
- Do not add roles, labels, or live-region behavior to the ripple itself.

## Responsive behavior

The effect measures the activated host and scales to cover its current bounds. Keep the host `position: relative` and `overflow: hidden`.

## Performance

Use ripple for deliberate activation feedback, not continuous pointer movement. Temporary ripple nodes and timers are cleaned up automatically on completion and unmount.

## Styling

Set the host color, radius, positioning, and clipping. Ripple element selectors and `--h-ripple-*` variables are implementation details.
