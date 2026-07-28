---
title: Card
description: Group related content and actions on a flexible surface.
path: /components/card
group: Components
section: Content
order: 123
---

# Card

`H0Card` is a compositional surface with optional header, description, content, and footer regions. It can render as a semantic container or navigational link; the public button root currently has a markup limitation documented below.

## Import

:::component-api imports
:::

## Composition

:::example components/card/CompositionExample
:::

## Variants

:::example components/card/VariantsExample
:::

## Interactive cards

Set `interactive` for hover, focus, and ripple feedback. Use `as="a"` with `href` when activating the whole card navigates. Native attributes and listeners are forwarded to the rendered root element.

:::example components/card/InteractiveExample
:::

> [!WARNING] Button root limitation
> Although `H0CardElement` currently includes `button`, Card regions render block-level wrappers that are not valid button content. Avoid `as="button"` until the internal markup contract is revised. Use an interactive link for navigation or place an `H0Button` inside a non-interactive Card for actions.

## Radius and layout

`radius` accepts `all`, `none`, one corner, or an array of corners. `padding` applies spacing only to the main content region; named header, description, and footer slots manage their own spacing.

:::example components/card/RadiusExample
:::

## Props

:::component-api props
:::

## Types

`H0CardProps` represents the complete prop object documented above.

### H0CardElement

:::component-api type H0CardElement
:::

### H0CardVariant

:::component-api type H0CardVariant
:::

### H0CardRadiusCorner

:::component-api type H0CardRadiusCorner
:::

### H0CardRadius

:::component-api type H0CardRadius
:::

## Slots

:::component-api slots
:::

## Events

:::component-api events
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Prefer `article`, `section`, or `aside` for meaningful content groupings.
- Interactive link cards require a real `href` and a clear destination.
- Do not put nested interactive controls inside a card rendered as a button or link.
- The `header` slot does not create an HTML heading. Add an appropriate `h2`–`h6` inside it when an article or section needs a heading in the document outline.

## Responsive behavior

Card fills its container. Control columns and stacking on the surrounding layout rather than setting fixed card widths.

## Styling

Use `variant`, `radius`, `padding`, and `shadow` before local styles. Internal card selectors and radius variables are implementation details.
