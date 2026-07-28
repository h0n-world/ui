---
title: Stepper
description: Communicate progress through a known sequence of steps.
path: /components/stepper
group: Components
section: Navigation
order: 196
---
# Stepper

`H0Stepper` presents completed, active, and pending states for a fixed sequence. It communicates progress but does not navigate or manage form state.

## Import

:::component-api imports
:::

## Usage

:::example components/stepper/BasicExample
:::

`step` is one-based and clamped to the available items. Use the active step as the application source of truth.

## Colors and sizes

Color communicates workflow status and must be supported by labels or surrounding feedback. Size changes markers and typography without changing progress semantics.

:::example components/stepper/VariantsExample
:::

## Vertical orientation and icons

Use vertical orientation for longer labels, descriptions, or narrow persistent layouts. Item icons appear before completion; completed steps use the check marker.

:::example components/stepper/VerticalExample
:::

## Types

`H0StepperProps` describes the complete prop object.

### H0StepperOrientation

:::component-api type H0StepperOrientation
:::

### H0StepperSize

:::component-api type H0StepperSize
:::

### H0StepperColor

:::component-api type H0StepperColor
:::

### H0StepperItem

:::component-api type H0StepperItem
:::

## Props

:::component-api props
:::

## Events

:::component-api events
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

Provide a specific navigation label. The active label uses `aria-current="step"`; do not rely on marker color alone.

## Responsive behavior

Horizontal steppers scroll when their minimum readable width exceeds the container. Use vertical orientation for long labels or narrow persistent layouts.

## Performance

State derivation is linear in the small fixed step list and installs no observers or global listeners.

## Styling

Use size, color, orientation, item icons, and public tokens. Marker and connector selectors are implementation details.
