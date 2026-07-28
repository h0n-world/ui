---
title: Toolbar
description: Group related commands into one keyboard-navigable action surface.
path: /components/toolbar
group: Components
section: Actions
order: 112
---

# Toolbar

`H0Toolbar` groups a compact set of related commands and provides toolbar semantics, an accessible name, and roving keyboard focus. Use data-driven items for uniform actions or compound children when actions require explicit grouping and separators.

## Import

:::component-api imports
:::

## Usage

Pass `items` for a uniform set of actions. The `select` event returns the original item definition; application state remains responsible for updating `pressed` values.

:::example components/toolbar/BasicExample
:::

## Disabled items

Use `disabled` for temporarily unavailable commands. Disabled items are removed from the roving focus sequence. Controlled `pressed` state for independent toggle actions is demonstrated in the basic example above.

:::example components/toolbar/StatesExample
:::

## Custom item content

The `item` slot customizes every data-driven button and receives the item plus its zero-based index. Keep the visible label understandable even when adding shortcuts or icons.

:::example components/toolbar/ItemSlotExample
:::

## Orientation and keyboard behavior

Horizontal toolbars use Left and Right Arrow. Vertical toolbars use Up and Down Arrow. `Home` and `End` move to the first and last enabled item in either orientation. When `loop` is enabled, arrow navigation wraps at the boundaries.

:::example components/toolbar/OrientationExample
:::

## Sizes

Use `md` for most interfaces, `sm` in dense editor surfaces, and `lg` when the toolbar needs greater visual prominence or a larger touch target. The selected size is inherited by compound toolbar items.

:::example components/toolbar/SizesExample
:::

## Full width

Set `fullWidth` to fill the available container. Data-driven items receive an equal share of the width; compound groups and items inherit the same fluid layout context.

:::example components/toolbar/FullWidthExample
:::

## Compound composition

Use `H0ToolbarGroup`, `H0ToolbarItem`, and `H0ToolbarSeparator` when commands need explicit visual and accessible grouping. Do not combine compound children with the `items` prop; data mode takes precedence and the component reports a development warning.

:::example components/toolbar/CompoundExample
:::

`H0ToolbarSeparator` follows the parent orientation: it renders a vertical boundary in a horizontal toolbar and a horizontal boundary in a vertical toolbar.

## Events

:::component-api events
:::

The compound `H0ToolbarItem` emits its own `select` event. Compound selections do not bubble through the parent toolbar's component event.

## Props

:::component-api props
:::

Template attributes may use kebab case, for example `aria-label`.

## Types

`H0ToolbarProps` represents the complete prop object documented above.

### H0ToolbarItemDefinition

:::component-api type H0ToolbarItemDefinition
:::

### H0ToolbarOrientation

:::component-api type H0ToolbarOrientation
:::

### H0Size

:::component-api type H0Size
:::

### H0ToolbarEmits

:::component-api type H0ToolbarEmits
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## H0ToolbarGroup

`H0ToolbarGroup` applies `role="group"` to a related subset of compound commands.

`H0ToolbarGroupProps` represents the complete prop object documented below.

#### Import

:::component-api component H0ToolbarGroup imports
:::

#### Props

:::component-api component H0ToolbarGroup props
:::

#### Events

:::component-api component H0ToolbarGroup events
:::

#### Slots

:::component-api component H0ToolbarGroup slots
:::

#### Exposed API

:::component-api component H0ToolbarGroup exposed
:::

## H0ToolbarItem

`H0ToolbarItem` is a compound command button. Its `select` event remains local to the item.

`H0ToolbarItemProps` represents the complete prop object documented below.

#### Import

:::component-api component H0ToolbarItem imports
:::

#### Props

:::component-api component H0ToolbarItem props
:::

#### Events

:::component-api component H0ToolbarItem events
:::

#### Slots

:::component-api component H0ToolbarItem slots
:::

#### Exposed API

:::component-api component H0ToolbarItem exposed
:::

## H0ToolbarSeparator

`H0ToolbarSeparator` renders a non-interactive `role="separator"` boundary and derives its visual and ARIA orientation from the parent toolbar.

#### Import

:::component-api component H0ToolbarSeparator imports
:::

#### Props

:::component-api component H0ToolbarSeparator props
:::

#### Events

:::component-api component H0ToolbarSeparator events
:::

#### Slots

:::component-api component H0ToolbarSeparator slots
:::

#### Exposed API

:::component-api component H0ToolbarSeparator exposed
:::

## Accessibility

- Provide `ariaLabel` whenever the localized default “Toolbar” does not explain the command set.
- Keep the toolbar focused on one task. Use `H0ToolbarGroup` to name meaningful subsets of commands.
- Preserve the roving `tabindex`: Tab enters the toolbar once, arrow keys move inside it, and Tab continues to the next control.
- Use `pressed` only for toggle buttons. A normal command should omit `aria-pressed`.
- Do not use a toolbar as a replacement for single-choice radio or segmented controls.
- Keep disabled commands discoverable only when users benefit from seeing unavailable functionality.

## Responsive behavior

Toolbars do not wrap commands automatically because wrapping makes arrow-key order harder to understand. On narrow screens, shorten labels, choose vertical orientation, or place the toolbar in an explicitly scrollable application wrapper.

## Styling

Use public H0N color, spacing, radius, and focus tokens for surrounding layout. The `.h-toolbar`, `.h-toolbar-group`, `.h-toolbar-separator`, and `[data-h-toolbar-item]` selectors are implementation details.

## Performance

Keep `items` and item objects stable when their values do not change. Keyboard lookup is scoped to the toolbar root and only inspects enabled toolbar items during focus and keyboard interaction.
