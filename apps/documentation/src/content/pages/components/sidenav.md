---
title: SideNav
description: Build grouped sidebar navigation with route-aware items and active indicators.
path: /components/sidenav
group: Components
section: Navigation
order: 195
---
# SideNav

`H0SideNav` composes labeled groups of polymorphic navigation items. Active state may be explicit or provided by router-link active classes.

## Import

:::component-api imports
:::

## Usage

:::example components/side-nav/BasicExample
:::

Pass native `aria-label` to the root navigation landmark. Use `as` and `to` for router components, or the default anchor with `href`.

## Item content and states

Use `start` for an icon, `end` for compact metadata, and the default slot for custom title content. Explicit `active` state adds `aria-current="page"`; compatible router active classes are styled automatically.

:::example components/side-nav/StatesExample
:::

## Group spacing

`gap` controls space between groups, not between individual destinations.

:::example components/side-nav/GapExample
:::

## Props

:::component-api props
:::

## Slots

:::component-api slots
:::

## Types

`H0SideNavProps`, `H0SideNavGroupProps`, and `H0SideNavItemProps` describe the family contracts.

### H0SideNavGap

:::component-api type H0SideNavGap
:::

### H0SideNavItemElement

:::component-api component H0SideNavItem type H0SideNavItemElement
:::

## H0SideNavGroup

`H0SideNavGroup` labels a related list of destinations.

#### Import
:::component-api component H0SideNavGroup imports
:::
#### Props
:::component-api component H0SideNavGroup props
:::
#### Slots
:::component-api component H0SideNavGroup slots
:::

## H0SideNavItem

`H0SideNavItem` is a polymorphic destination built on `H0ListItem`.

#### Import
:::component-api component H0SideNavItem imports
:::
#### Props
:::component-api component H0SideNavItem props
:::
#### Slots
:::component-api component H0SideNavItem slots
:::

## Accessibility

- Label the root navigation and every meaningful group.
- Keep exactly one current destination when the navigation represents pages.
- Active destinations use `aria-current="page"`.
- Disabled items must not remain navigable.

## Responsive behavior

Place SideNav in an appropriately sized sidebar or disclosure on small screens. Labels truncate according to the underlying ListItem layout.

## Performance

Active styling is CSS-driven and recognizes router-link classes without importing a router dependency.

## Styling

Use `gap`, `animatedIndicator`, item slots, and public tokens. Underlying List and ListItem selectors are implementation details.
