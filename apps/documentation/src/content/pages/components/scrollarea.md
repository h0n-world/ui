---
title: ScrollArea
description: Provide a bounded native scroll region with stable gutters and optional edge fades.
path: /components/scrollarea
group: Components
section: Layout
order: 184
---

# ScrollArea

`H0ScrollArea` preserves native scrolling and keyboard behavior while applying shared scrollbar tokens, optional stable gutter space, edge hints, boundary events, and imperative scrolling.

## Import

:::component-api imports
:::

## Vertical scrolling and edge fades

Always constrain the requested axis with `maxHeight`, `maxWidth`, or surrounding layout. Edge fades are visual overflow hints and do not replace the accessible region label.

:::example components/scroll-area/BasicExample
:::

## Horizontal scrolling

Use horizontal scrolling for content that has a meaningful horizontal sequence and cannot wrap, such as a compact card strip. Ordinary prose and form layouts should reflow instead.

:::example components/scroll-area/HorizontalExample
:::

## Boundary events and imperative scrolling

`reach-start` and `reach-end` fire when scrolling enters a boundary, not continuously while it remains there. `scrollTo` and `scrollBy` accept native `ScrollToOptions`. In the example, **Scroll down** uses an absolute `scrollTo` target and moves directly to the end.

:::example components/scroll-area/ApiExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0ScrollAreaProps` describes the complete prop object. Orientation additionally accepts the literal `both`.

### H0Orientation

:::component-api type H0Orientation
:::

### H0CssSize

:::component-api type H0CssSize
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Provide a specific `ariaLabel` describing the scrollable content.
- The viewport is a focusable region so keyboard users can scroll it.
- Avoid nested scroll areas unless each region has a distinct purpose.
- Do not rely on edge fades as the only indication that more content exists.

## Responsive behavior

Numeric dimensions are interpreted as pixels. Prefer fluid `maxWidth` values and avoid horizontal scrolling for ordinary page content.

## Performance

The scroll handler performs constant-time boundary checks. Virtualize very large child collections separately.

## Styling

Use public border, surface, and spacing tokens on a wrapper. The viewport and fade selectors are implementation details.
