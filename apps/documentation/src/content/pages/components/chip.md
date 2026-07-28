---
title: Chip
description: Present compact selectable filters, tags, and removable tokens.
path: /components/chip
group: Components
section: Content
order: 125
---

# Chip

`H0Chip` contains a primary toggle-style button and, when removable, a separate remove button. Application state owns selection and collection updates.

## Import

:::component-api imports
:::

## Selection

Bind `selected` and update it from the `click` event. The primary action exposes `aria-pressed` automatically, but `H0Chip` does not change selection by itself. Use independent chips for filters that can be toggled separately; prefer `H0RadioGroup` or `H0Segment` when exactly one option must remain selected.

:::example components/chip/SelectionExample
:::

## Removal and disabled state

`removable` adds a second, separately focusable button. Its event stops propagation and emits `remove` without also emitting `click`, but the application remains responsible for updating the collection. Give each remove action a contextual `removeAriaLabel`.

:::example components/chip/RemovalExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

Content in the default slot takes precedence over the `text` fallback.

## Types

`H0ChipProps` represents the complete public prop object documented above.

`H0ChipEmits` maps `click` and `remove` to `[event: MouseEvent]`; their behavior is documented in Events.

### H0ChipTone

:::component-api type H0ChipTone
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Visible text should identify the filter or token.
- Provide `ariaLabel` only when visible content is insufficient.
- For removable chips, make `removeAriaLabel` specific, such as “Remove Design”.
- A removable chip contains two separate buttons and therefore creates two focus stops.
- Disabled state applies to both buttons.

## Responsive behavior

Place sets of chips in a wrapping flex or grid container. The component itself does not manage wrapping or overflow.

## Styling

Use `tone` and `selected` for public appearance. Do not target `.h-chip__action` or `.h-chip__remove` from product code.
