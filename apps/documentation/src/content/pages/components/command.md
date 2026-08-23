---
title: Command
description: Search, navigate, and select actions from a keyboard-oriented command menu.
path: /components/command
group: Components
section: Overlays
order: 202
---

# Command

`H0Command` combines a trigger, modal command window, search field, grouped results, and keyboard navigation. Use it for application actions and fast navigation without rebuilding overlay and combobox behavior for each palette.

## Import

:::component-api imports
:::

## Usage

Pass commands through `items`. The component filters labels, descriptions, groups, and `keywords`; selecting an item emits the complete item object. `hotkey="mod+k"` maps to Command+K on macOS and Ctrl+K on other platforms.

:::example components/command/BasicExample
:::

## Variants

`variant` styles only the built-in trigger. Choose `surface`, `secondary`, `ghost`, or `outline`, or replace the trigger completely through the `trigger` slot.

:::example components/command/VariantsExample
:::

## Trigger size

`size` uses the shared `sm`, `md`, and `lg` control sizing system and affects only the built-in trigger.

:::example components/command/TriggerSizesExample
:::

## Window size

`windowSize` changes the command window width and the maximum result-list height independently from the trigger. All sizes retain a responsive viewport inset.

:::example components/command/WindowSizesExample
:::

## Backdrop

The shared `opaque`, `blur`, and `transparent` backdrop treatments match other modal overlays. Dismissal remains independently controlled by `closeOnBackdrop` and `closeOnEsc`.

:::example components/command/BackdropsExample
:::

## Controlled state and search

Use `v-model` to control the open state and `v-model:query` to control search text. `defaultValue` and `defaultQuery` provide uncontrolled initialization. By default, the query resets after closing.

## Keyboard behavior

- Arrow Down and Arrow Up move through enabled results and wrap at either end.
- Home and End move to the first and last enabled result.
- Enter selects the active result.
- Escape closes the overlay when `closeOnEsc` is enabled.
- Non-modifier hotkeys such as `/` are ignored while the user is typing in another editable control.

## Props

Fallthrough attributes and `rootAttrs` target the wrapper. Use `triggerAttrs` for native or ARIA attributes on the built-in trigger.

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

## Types

### H0CommandItem

:::component-api type H0CommandItem
:::

### H0CommandVariant

:::component-api type H0CommandVariant
:::

### H0CommandBackdrop

:::component-api type H0CommandBackdrop
:::

### H0CommandSize

:::component-api type H0CommandSize
:::

### H0CommandWindowSize

:::component-api type H0CommandWindowSize
:::

## Accessibility

- The window uses modal dialog semantics and the search field implements the combobox/listbox active-descendant pattern.
- Disabled commands remain visible but are skipped by keyboard navigation and cannot be selected.
- Focus moves to search on open, remains contained in the overlay, and returns to the invoking control on close by default.
- Keep command labels concise and provide `ariaLabel` when the default localized dialog name is too generic.

## Responsive behavior

Window widths are capped by the viewport, result regions scroll independently, and short viewports remove the top offset.

## Styling

Use public trigger, window-size, backdrop, and theme APIs. Internal search and result selectors are implementation details.

## Performance

Filtering is synchronous over the supplied item array and overlay content mounts only while open. For very large datasets, filter externally through controlled `query` and a reduced `items` collection.
