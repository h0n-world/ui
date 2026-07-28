---
title: Button
description: Trigger actions in forms, toolbars, dialogs, and navigation flows.
path: /components/button
group: Components
section: Actions
order: 110
---

# Button

`H0Button` is the base action control for forms, toolbars, dialogs, and command surfaces. It supports semantic tones, multiple emphasis levels, icons, loading states, full-width layouts, and polymorphic rendering.

## Import

:::component-api imports
:::

## Usage

Use one prominent action per region and lower-emphasis variants for supporting or dismissive actions.

:::example components/button/BasicExample
:::

## Tones and variants

`tone` communicates semantic intent. `variant` controls emphasis independently.

- Use `primary` for the main action in a flow.
- Use `success`, `warning`, and `danger` only when the action has that meaning.
- Use `soft` for supporting actions that still need a filled surface.
- Use `outline` or `ghost` for neutral, lower-emphasis actions. These variants do not apply semantic tone colors.

:::example components/button/AppearanceExample
:::

## Sizes

Use `md` in most product interfaces, `sm` in dense toolbars and tables, and `lg` for prominent calls to action.

:::example components/button/SizesExample
:::

## Buttons with icons

Set `buttonType="withIcon"` and either pass an `H0IconDefinition` through `icon` or provide arbitrary Vue/SVG content through the `icon` slot. Definitions from the small built-in set are available at `@h0nio/ui/icons`; no separate icon package is required. Keep visible text action-oriented.

:::example components/button/WithIconExample
:::

### Icon-only buttons

Set `buttonType="onlyIcon"` when space is constrained. The `icon` slot accepts a custom icon component or inline SVG and takes precedence over the `icon` prop. Every icon-only button requires an accessible label. The control remains circular regardless of the `rounded` prop.

:::example components/button/IconOnlyExample
:::

## Disabled and loading states

`disabled` prevents interaction. `loading` also disables the control, sets `aria-busy="true"`, and replaces the icon with a spinner. Without `loadingText`, visible slot content remains beside the spinner.

:::example components/button/StatesExample
:::

## Full width

Use `fullWidth` for stacked mobile actions, narrow forms, and dialogs where the action should fill its container.

:::example components/button/FullWidthExample
:::

## Links and polymorphic rendering

The default root is a native `<button type="button">`. Use `as="a"` with `href` when the control navigates. The `as` prop also accepts compatible Vue components. Do not use a button element to navigate when a link communicates the behavior more accurately.

:::example components/button/LinksExample
:::

> [!WARNING] Router integration
> The current component version does not yet forward `to` correctly when `as` is `RouterLink`. Use a semantic anchor with `href`, as shown above, until the component forwarding path is fixed.

## Events

Native attributes and listeners are forwarded to the rendered root. There are no component-specific emitted events.

:::example components/button/ClickExample
:::

:::component-api events
:::

## Props

:::component-api props
:::

Template attributes may use kebab case, for example `button-type`, `loading-text`, `full-width`, and `aria-label`.

## Types

`H0ButtonProps` represents the complete prop object documented above. The `icon` prop accepts the structural [`H0IconDefinition`](/components/icon#h0icondefinition) type exported by `@h0nio/ui`. Use the `icon` slot when an icon is already implemented as a Vue component or SVG template.

### H0ButtonTone

:::component-api type H0ButtonTone
:::

### H0ButtonVariant

:::component-api type H0ButtonVariant
:::

### H0ButtonSize

:::component-api type H0ButtonSize
:::

### H0ButtonTypeVariant

:::component-api type H0ButtonTypeVariant
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Prefer concise labels that start with a verb, such as “Save changes” or “Delete project”.
- Icon-only buttons must provide `ariaLabel`; the tooltip, if present, is supplementary.
- Keep the safe default `type="button"` unless the control intentionally submits or resets a form.
- `disabled` and `loading` remove the control from interaction. `loading` additionally exposes busy state to assistive technology.
- Use `as="a"` for navigation so the rendered semantics match the behavior.
- Do not encode meaning through color alone. Pair destructive and status tones with an explicit label.
- Preserve the library focus-visible styles and a logical keyboard order.

## Styling

Use `tone`, `variant`, `size`, and the global H0N theme configuration before adding local styles. Layout concerns such as spacing and alignment belong on a wrapper around the button.

The internal `.h-button` selectors and `--h-button-*` variables are implementation details. Product code should use documented public design tokens instead of targeting those internals.

> [!INFO] Button groups
> Use `H0ButtonGroup` when adjacent actions need shared borders and coordinated radius handling. Avoid manually changing the `rounded` prop to reproduce a group.
