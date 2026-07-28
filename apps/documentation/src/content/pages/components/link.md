---
title: Link
description: Navigate with native anchors or router-compatible components.
path: /components/link
group: Components
section: Navigation
order: 192
---
# Link

`H0Link` provides consistent navigation styling, disabled behavior, external-link disclosure, and router-component support.

## Import

:::component-api imports
:::

## Usage

:::example components/link/BasicExample
:::

Use links for navigation and `H0Button` for actions. When `as` is not `a`, `to` is forwarded to the selected router component.

## Appearance

Tone communicates destination context; variant controls underline and emphasis independently. Keep semantic tones meaningful rather than decorative.

:::example components/link/AppearanceExample
:::

## Events and disabled behavior

Enabled links emit click, focus, and blur. Disabled links remove their destination, tab focus, and click emission while exposing `aria-disabled`.

:::example components/link/EventsExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0LinkProps` describes the complete polymorphic link contract.

### H0LinkTone

:::component-api type H0LinkTone
:::

### H0LinkVariant

:::component-api type H0LinkVariant
:::

### H0Size

:::component-api type H0Size
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Link text should describe the destination rather than the interaction.
- External links append localized screen-reader text and resolve a safe `rel`.
- Disabled links remove navigation and tab focus.
- Use `ariaCurrent` only for the current item in a related navigation set.

## Responsive behavior

Links wrap with surrounding text. Avoid labels or URLs that force horizontal page overflow.

## Performance

The component is CSS-driven and adds no global listeners.

## Styling

Use semantic tones, variants, sizes, and `rootAttrs`. Internal external-indicator selectors are implementation details.
