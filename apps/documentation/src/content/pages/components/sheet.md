---
title: Sheet
description: Reveal a compact modal surface inset from a viewport edge.
path: /components/sheet
group: Components
section: Overlays
order: 205
---

# Sheet

`H0Sheet` presents a compact modal surface near a viewport edge. Unlike Drawer, it has an inset floating treatment suited to short workflows and quick actions.

## Import

:::component-api imports
:::

## Usage

Bind `v-model`, choose a `side`, and use `title` with an optional `subtitle` for the standard header. The header includes a built-in close action, while the footer slot receives `close` for workflow actions. Use `ariaLabel` when no visible title is provided.

:::example components/sheet/BasicExample
:::

## Compact workflows

The default slot owns the workflow content between the optional standard header and footer. Use the `header` slot when the built-in title and subtitle layout is not sufficient; the close button remains available. Put completion actions in the `footer` slot so Sheet follows the same composition model as Modal and Drawer.

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

- The panel uses modal dialog semantics and takes its accessible name from `title`, then `ariaLabel`, then the localized fallback.
- `subtitle` provides supporting context but does not replace a meaningful accessible name.
- The standard header includes a localized close button; keep a visible completion action in the workflow when one is required.
- The visual handle is not draggable and is hidden from assistive technology.
- Focus returns to the invoking control by default.

## Responsive behavior

Every side preserves a viewport inset. Content scrolls inside the sheet when it exceeds the available height.

## Styling

Use public H0N tokens in slot content. The sheet handle, panel classes, and transition selectors are implementation details.

## Performance

Sheet content mounts only while open. Prefer Drawer when the surface hosts a large persistent navigation tree.
