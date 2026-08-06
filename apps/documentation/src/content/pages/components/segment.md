---
title: Segment
description: Switch between mutually exclusive views or modes in a compact control.
path: /components/segment
group: Components
section: Navigation
order: 194
---
# Segment

`H0Segment` behaves as a radiogroup with roving focus, arrow-key selection, an animated active indicator, and optional icon expansion.

## Import

:::component-api imports
:::

## Usage

:::example components/segment/BasicExample
:::

Use Segment for a small set of peer views or modes. Use Tabs when each choice controls an associated semantic tabpanel.

## Variants

Variants change surface and indicator emphasis. Use one appearance consistently within a region and keep the item set short.

:::example components/segment/AppearanceExample
:::

## Sizes

Use `sm` in dense toolbars, `md` for most controls, and `lg` when the segmented choice needs more prominence.

:::example components/segment/SizesExample
:::

## Icons and expansion

`iconExpand` keeps the selected label visible and collapses inactive icon labels. Every item still requires an understandable text label for its accessible name.

:::example components/segment/IconsExample
:::

## Types

`H0SegmentProps` and `H0SegmentEmits` describe the component contract.

### H0SegmentValue

:::component-api type H0SegmentValue
:::

### H0SegmentSize

:::component-api type H0SegmentSize
:::

### H0SegmentVariant

:::component-api type H0SegmentVariant
:::

### H0SegmentItem

:::component-api type H0SegmentItem
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

Provide a specific `ariaLabel`, keep labels concise, and preserve arrow, Home, and End keyboard behavior.

## Responsive behavior

The control is bounded by its parent width. `iconExpand` collapses inactive icon labels but should not replace understandable accessible labels.

## Performance

Indicator geometry is observed only while mounted. Keep item arrays stable and limit the control to a small number of choices.

## Styling

Use variants, sizes, icons, and public tokens. Indicator geometry and item selectors are implementation details.
