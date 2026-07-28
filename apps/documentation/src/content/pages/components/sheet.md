---
title: Sheet
description: Reveal a compact modal surface inset from a viewport edge.
path: /components/sheet
group: Components
section: Overlays
order: 205
---

# Sheet

`H0Sheet` presents a compact modal surface near a viewport edge. Unlike Drawer, it has an inset floating treatment and leaves content structure entirely to the default slot.

## Import

:::component-api imports
:::

## Usage

Bind `v-model`, choose a `side`, and provide an accessible name for the sheet workflow.

:::example components/sheet/BasicExample
:::

## Compact workflows

The default slot owns the complete content structure, including heading and dismissal controls. Keep the workflow short and reuse existing controls rather than recreating form elements inside the surface.

:::example components/sheet/PreferencesExample
:::

## Sides

Use `top`, `right`, `bottom`, or `left` to position the sheet near the corresponding viewport edge. Top and bottom sheets use a horizontal handle; left and right sheets use a vertical handle. The handle is decorative.

:::example components/sheet/SidesExample
:::

## Backdrop

Choose `opaque` for strong visual separation, `blur` to retain softened page context, or `transparent` when the backdrop must remain visually hidden. Backdrop appearance, backdrop dismissal, and Escape dismissal can be configured independently.

:::example components/sheet/BackdropsExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0SheetProps` and `H0SheetEmits` describe the complete public component contract.

### H0SheetSide

:::component-api type H0SheetSide
:::

### H0SheetBackdrop

:::component-api type H0SheetBackdrop
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- The panel uses modal dialog semantics and requires a meaningful `ariaLabel` when the localized fallback is too generic.
- Include a visible close or completion control in slot content.
- The visual handle is not draggable and is hidden from assistive technology.
- Focus returns to the invoking control by default.

## Responsive behavior

Every side preserves a viewport inset. Content scrolls inside the sheet when it exceeds the available height.

## Styling

Use public H0N tokens in slot content. The sheet handle, panel classes, and transition selectors are implementation details.

## Performance

Sheet content mounts only while open. Prefer Drawer when the surface hosts a large persistent navigation tree.
