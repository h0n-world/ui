---
title: Tooltip
description: Provide concise non-interactive help on hover and keyboard focus.
path: /components/tooltip
group: Components
section: Overlays
order: 206
---

# Tooltip

`H0Tooltip` provides a short accessible description for a trigger. It opens on hover or focus, closes after pointer leave or blur, and can be dismissed with Escape.

## Import

:::component-api imports
:::

## Usage

Apply every `triggerAttrs` value to the actual interactive trigger. Use `content` for plain text or the `content` slot for concise formatted text.

:::example components/tooltip/BasicExample
:::

## Timing and placement

`openDelay` reduces accidental activation while `closeDelay` allows stable pointer transitions. Keep the default delay for repeated toolbars and shorten it only when immediate help is important.

Placement is preferred rather than absolute: collision handling may move the tooltip to keep it visible. Logical `-start` and `-end` variants align the surface along the selected side.

:::example components/tooltip/PlacementsExample
:::

## Content and disabled state

The `content` slot supports concise formatted text, while the trigger slot exposes the resolved `open` state for visual feedback. Set `disabled` when help is temporarily unavailable; an already-open uncontrolled tooltip is removed from view immediately.

:::example components/tooltip/StatesExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0TooltipProps` describes the complete public prop object.

### H0FloatingPlacement

:::component-api type H0FloatingPlacement
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Tooltip content uses `role="tooltip"` and is referenced by `aria-describedby` while open.
- Never place buttons, links, or other interactive content inside a tooltip; use a documented disclosure pattern or `H0Modal` for richer interactive content.
- Do not rely on a tooltip as the only visible label for a control.
- Ensure the trigger is keyboard focusable.

## Responsive behavior

Tooltips have a readable line-length cap and floating collision handling. On touch-only interfaces, keep essential information visible outside the tooltip.

## Styling

Tooltip colors, radius, typography, and spacing come from public H0N tokens. Treat internal selectors as implementation details.

## Performance

The surface is unmounted while closed and timers are cleared on unmount. Avoid creating tooltips for large static text blocks.
