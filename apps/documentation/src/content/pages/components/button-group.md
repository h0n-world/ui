---
title: Button Group
description: Combine closely related actions into one compact, visually connected control.
path: /components/buttongroup
group: Components
section: Actions
order: 111
---

# Button Group

`H0ButtonGroup` renders an accessible group of adjacent `H0Button` controls. Group-level appearance and state are inherited by every item, while the `buttons` configuration can override individual controls when necessary.

## Import

:::component-api imports
:::

## Usage

Use a button group for a short row of related actions that belong to the same task or object. The default configuration creates three buttons and exposes the slots `btn-1`, `btn-2`, and `btn-3`.

:::example components/button-group/BasicExample
:::

## Tones and variants

`tone` communicates the semantic intent of solid and soft groups. `variant` controls the shared visual emphasis. Individual items may override either value through the `buttons` prop, but a consistent appearance is usually easier to understand.

:::example components/button-group/AppearanceExample
:::

## Sizes

The group passes `size` to every button. Use one size throughout a group so its connected shape and labels remain balanced.

:::example components/button-group/SizesExample
:::

## Configuring items and slots

Pass `buttons` when the number of actions, labels, stable keys, or individual states come from data. Each item uses its `label` as fallback content. Set `slot` to replace that label with a named slot; the slot receives the current `button` and zero-based `index`.

The component emits `button-click` after an enabled item is activated. It returns the original item object and its index.

:::example components/button-group/ConfigurationExample
:::

## Disabled and loading states

The group-level `disabled` value is inherited by every item. An item with an explicit `disabled: false` overrides a disabled group. Loading is configured per item and uses the underlying button loading behavior.

:::example components/button-group/StatesExample
:::

> [!WARNING] Disabled overrides
> Re-enabling one action inside a disabled group can be easy to miss. Prefer explicit item states when availability differs, and reserve group-level `disabled` for cases where every action is unavailable.

## Full width

`fullWidth` makes the group fill its container and gives every item an equal share of the available width. An item can override this behavior through its own `fullWidth` field.

:::example components/button-group/FullWidthExample
:::

## Events

:::component-api events
:::

Native attributes and listeners applied to `H0ButtonGroup` are forwarded to the root group element.

## Props

:::component-api props
:::

Template attributes may use kebab case, for example `full-width` and `aria-label`.

## Types

`H0ButtonGroupProps` represents the complete prop object documented above. Item appearance fields reuse [`H0ButtonTone`](/components/button#h0buttontone), [`H0ButtonVariant`](/components/button#h0buttonvariant), and [`H0ButtonSize`](/components/button#h0buttonsize).

### H0ButtonGroupItem

:::component-api type H0ButtonGroupItem
:::

### H0ButtonGroupEmits

:::component-api type H0ButtonGroupEmits
:::

## Slots

:::component-api slots
:::

The number of rendered buttons and available slots is controlled entirely by `buttons`. The component does not provide a default slot.

## Exposed API

:::component-api exposed
:::

## Accessibility

- The root uses `role="group"`; provide a concise `ariaLabel` that describes the relationship between its actions.
- Keep the visible label of every item clear and action-oriented. The current item API is designed for text labels rather than icon-only controls.
- Preserve a logical DOM order. Keyboard focus follows the order of the `buttons` array.
- Use groups for related actions, not unrelated commands that only happen to fit on one row.
- Do not use `H0ButtonGroup` as a single-choice toggle control. Use `H0Segment`, radio controls, or another selection component when the interface must expose a selected value.
- Disabled and loading items are removed from interaction by the underlying `H0Button` behavior.

## Styling

The wrapper owns the shared radius, clipping, separators, and equal-width distribution. Each child button receives `rounded="false"` internally so adjacent edges remain connected.

Use public props and H0N design tokens before adding local styles. `.h-button-group`, `.h-button-group__item`, and `--h-button-group-separator` are implementation details and should not be targeted by product code.
