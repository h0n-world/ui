---
title: Icon
description: Render lightweight, structural SVG icon definitions without an external icon package.
path: /components/icon
group: Components
section: Content
order: 131
---

# Icon

`H0Icon` renders the structural `H0IconDefinition` type exported by `@h0nio/ui`. It has no runtime dependency on an icon package, and SVG strokes inherit the current text color.

## Import

:::component-api imports
:::

## Gallery

Import the small system set from `@h0nio/ui/icons`, or create a compatible definition locally. The system set exists for common interface actions and is not intended to be a comprehensive icon library. `loadingIcon` is static; use `H0Spinner` for animated progress.

:::example components/icon/GalleryExample
:::

## Size, stroke, and color

Numeric `size` values become pixels, while CSS strings are used unchanged. Stroke color follows `currentColor`; cap, join, and width can be adjusted through public props.

:::example components/icon/StrokeExample
:::

## Decorative and meaningful icons

Without `title`, the SVG is decorative and receives `aria-hidden="true"`. Supplying `title` gives it `role="img"` and an accessible SVG title.

:::example components/icon/AccessibilityExample
:::

## Props

:::component-api props
:::

Native SVG attributes are forwarded to the root element. For meaningful icons, use `title` instead of relying only on an external `aria-label`: without `title`, the component treats the SVG as decorative and applies `aria-hidden="true"`.

## Types

`H0IconProps`, `H0IconDefinition`, and `H0IconNode` are exported by `@h0nio/ui`. A definition is plain readonly data, so it can be declared by an application or adapted from another icon source without depending on H0N's system set.

### H0IconDefinition

:::component-api type H0IconDefinition
:::

When `viewBox` is absent, `H0Icon` uses `0 0 24 24`. Custom definitions may contain only the supported `path`, `circle`, `line`, and `polyline` node tuples. The renderer uses `fill="none"` and stroke-based `currentColor` styling.

### H0IconNode

:::component-api type H0IconNode
:::

### H0IconStrokeLinecap

:::component-api type H0IconStrokeLinecap
:::

### H0IconStrokeLinejoin

:::component-api type H0IconStrokeLinejoin
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

- Keep icons decorative when adjacent visible text already conveys meaning.
- Use `title` for a standalone meaningful icon.
- Icon-only buttons still need their own button `aria-label`; an SVG title alone does not name the button reliably.

## Performance

Import individual definitions from `@h0nio/ui/icons` to preserve tree shaking. Keep larger product-specific icon catalogs in the application or a dedicated third-party package.

## Styling

Set color on the icon or an ancestor and use public `size`, `strokeWidth`, cap, and join props. Internal SVG selectors are implementation details.
