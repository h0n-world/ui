---
title: Drawer
description: Present persistent-height navigation or supporting workflows from a viewport edge.
path: /components/drawer
group: Components
section: Overlays
order: 201
---

# Drawer

`H0Drawer` opens a modal edge panel with optional header and footer regions. It is suited to navigation, filters, and supporting workflows that need more vertical space than a compact popover.

## Import

:::component-api imports
:::

## Usage

Bind `v-model`, choose an edge with `side`, and provide a title or specific `ariaLabel`.

:::example components/drawer/BasicExample
:::

## Supporting workflows

Use the scrollable default slot for navigation, filters, or supporting content. The footer slot receives `close`, which lets an action finish the workflow without duplicating state mutation in the parent.

:::example components/drawer/FiltersExample
:::

## Placement

Use `top`, `right`, `bottom`, or `left` to select the entering viewport edge. Left and right drawers occupy the available viewport height, while top and bottom drawers use a bounded content height.

:::example components/drawer/SidesExample
:::

## Backdrop

Choose `opaque` for strong visual separation, `blur` to retain softened page context, or `transparent` when the backdrop must remain visually hidden. The visual treatment is independent from `closeOnBackdrop` and `closeOnEsc` dismissal behavior.

:::example components/drawer/BackdropsExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0DrawerProps` and `H0DrawerEmits` describe the complete public component contract.

### H0DrawerSide

:::component-api type H0DrawerSide
:::

### H0DrawerBackdrop

:::component-api type H0DrawerBackdrop
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- The panel uses modal dialog semantics and traps focus while open.
- Provide a visible `title` or an equivalent `ariaLabel`.
- Ensure the footer contains an obvious completion or dismissal action when backdrop and Escape dismissal are disabled.
- Focus returns to the invoking control by default.

## Responsive behavior

Side drawers leave a small viewport inset on narrow screens. Prefer a bottom drawer for short mobile actions and verify that long content scrolls inside the content region.

## Styling

Use public surface, border, radius, shadow, and spacing tokens around custom slot content. Internal drawer selectors are not public API.

## Performance

The overlay content mounts only while open. Avoid rendering a second full application shell inside a navigation drawer.
