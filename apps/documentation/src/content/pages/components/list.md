---
title: List
description: Build grouped menus, collections, and rich rows from flexible list items.
path: /components/list
group: Components
section: Content
order: 133.5
---

# List

`H0List` provides grouping, an optional accessible label, spacing, and separators. `H0ListItem` supplies interactive or static rows with structured and fully custom content.

## Import

:::component-api imports
:::

## Primary and secondary content

When `label` or the label slot is present, the root `div` becomes a labeled `group`. Without a label it remains a plain `div`; `H0List` does not create native `ul` or `ol` semantics. Items are buttons by default because `interactive` defaults to true.

:::example components/list/ContentExample
:::

## H0ListItem

Items support active, disabled, static, size, radius, and polymorphic root behavior.

:::example components/list/StatesExample
:::

### H0ListItem import

:::component-api component H0ListItem imports
:::

### H0ListItem props

:::component-api component H0ListItem props
:::

Native attributes and listeners are forwarded to the polymorphic root. Interactive items default to `button`, while non-interactive items default to `div`. Explicit anchors still require `href`, and router-link components require `to`.

### H0ListItem slots

:::component-api component H0ListItem slots
:::

### H0ListItem types

`H0ListItemProps` represents the complete item prop object documented above.

#### H0ListItemSize

:::component-api component H0ListItem type H0ListItemSize
:::

#### H0ListItemBorderRadius

:::component-api component H0ListItem type H0ListItemBorderRadius
:::

#### H0ListItemElement

:::component-api component H0ListItem type H0ListItemElement
:::

## Rich rows

The default slot replaces built-in title and description content; `start` and `end` remain available around it.

:::example components/list/RichRowExample
:::

## Navigation roots

Use a native anchor with `href` for ordinary navigation or pass `RouterLink` through `as` with `to` for client-side routing. `active` is visual only, so expose the current destination separately with `aria-current="page"`.

:::example components/list/NavigationExample
:::

## List props

:::component-api props
:::

Native attributes are forwarded to the root wrapper.

## List types

`H0ListProps` represents the complete list prop object documented above.

### H0ListGap

:::component-api type H0ListGap
:::

## List slots

:::component-api slots
:::

## Events

:::component-api events
:::

Native listeners applied to `H0ListItem` are forwarded to its polymorphic root; it defines no component events.

## Exposed API

:::component-api exposed
:::

## Accessibility

- Use `label` when rows form a named group.
- Interactive items default to buttons; use `as="a"` or a router-link component for navigation.
- Static information should set `interactive="false"` and leave `as` unset; an explicitly rendered anchor remains a link.
- `active` changes only presentation. Add `aria-current`, `aria-selected`, or `aria-pressed` according to the interaction model.
- Native buttons receive `disabled`; other disabled roots receive `aria-disabled`, leave the tab order, and have activation blocked.

## Responsive behavior

Titles and descriptions truncate to one line. Keep trailing content compact and use a custom default slot when data requires intentional wrapping.

## Styling

Use gap, divided, size, active, and borderRadius before local styles. Internal list selectors are implementation details.
