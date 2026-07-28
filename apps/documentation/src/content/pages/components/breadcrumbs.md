---
title: Breadcrumbs
description: Show the current location and link back through its parent hierarchy.
path: /components/breadcrumbs
group: Components
section: Navigation
order: 190
---
# Breadcrumbs

`H0Breadcrumbs` renders an ordered navigation path. Every item except the current page may use a native anchor or a router-compatible link component.

## Import

:::component-api imports
:::

## Usage

:::example components/breadcrumbs/BasicExample
:::

The final item is always rendered as the current page and receives `aria-current="page"`. Disabled ancestors remain visible but are not links.

## Customization and disabled ancestors

The `item` slot receives `current`, while `separator` replaces decorative separator content. A disabled ancestor remains readable but loses navigation.

:::example components/breadcrumbs/SlotsExample
:::

## Long paths

Long paths remain on one line and scroll horizontally. Preserve the current page and the closest useful ancestors instead of truncating essential hierarchy.

:::example components/breadcrumbs/LongPathExample
:::

## Types

`H0BreadcrumbsProps` describes the complete prop object.

### H0BreadcrumbTarget

:::component-api type H0BreadcrumbTarget
:::

### H0BreadcrumbItem

:::component-api type H0BreadcrumbItem
:::

## Props

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

## Accessibility

- Use concise labels and a specific `ariaLabel` when several navigation landmarks exist.
- The last item is always exposed as the current page.
- Disabled ancestors must not remain keyboard-navigable.
- Separators are decorative and should not repeat in accessible names.

## Responsive behavior

Long paths remain on one line and scroll horizontally without a visible scrollbar.

## Performance

Keep item arrays stable. Breadcrumb rendering is linear in the number of path levels.

## Styling

Use the item and separator slots for content customization. Link, current-item, and overflow selectors are implementation details.
