---
title: Icon
description: Render legacy structural SVG nodes and tree-shakeable definitions from @h0nio/icons.
path: /components/icon
group: Components
section: Content
order: 131
---

# Icon

`H0Icon` renders both the legacy node-based `H0IconDefinition` and trusted body definitions imported from `@h0nio/icons`. Both formats inherit `currentColor`, preserve their own `viewBox`, and expose the definition name through `data-icon`.

## Import

:::component-api imports
:::

## Icons library

Install `@h0nio/icons` as a direct application dependency, then import only the definitions the application uses. H0N UI already depends on the package for built-in controls, but direct application imports should not rely on a transitive dependency.

```bash
pnpm add @h0nio/icons
```

```vue
<script setup lang="ts">
import searchIcon from '@h0nio/icons/search'
import { H0Icon } from '@h0nio/ui'
</script>

<template>
    <H0Icon :icon="searchIcon" :size="24" />
</template>
```

Use individual `@h0nio/icons/<name>` subpaths. Do not use `@h0nio/icons/all` or the catalog in ordinary UI runtime code.

:::example components/icon/GalleryExample
:::

## Size

Numeric `size` values become pixels, while CSS strings are used unchanged. The same API works for every icon definition imported from `@h0nio/icons`.

:::example components/icon/SizeExample
:::

## Stroke

Choose a `-stroke` definition such as `settings-minimalistic-stroke` when the outlined icon style is required. Definitions from `@h0nio/icons` preserve their authored geometry; `strokeWidth`, `strokeLinecap`, and `strokeLinejoin` are compatibility props for node-based definitions and do not modify body definitions.

:::example components/icon/StrokeExample
:::

## Color

Icons inherit `currentColor`, so set `color` on `H0Icon` or an ancestor. This keeps icons synchronized with semantic text and state colors.

:::example components/icon/ColorExample
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

`H0IconProps`, `H0IconSource`, `H0IconBodyDefinition`, `H0IconDefinition`, and `H0IconNode` are exported by `@h0nio/ui`. `H0IconSource` accepts either supported definition format.

### H0IconSource

:::component-api type H0IconSource
:::

### H0IconBodyDefinition

:::component-api type H0IconBodyDefinition
:::

Body definitions contain trusted SVG markup. Pass only definitions shipped by `@h0nio/icons` or another reviewed local source; never pass user input, remote responses, or arbitrary HTML as an icon body. IDs used by definitions, clip paths, and `url(#...)` references are scoped per component instance and remain deterministic during SSR.

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

Import individual definitions from `@h0nio/icons/<name>` to preserve tree shaking. `@h0nio/ui/icons` remains a transition facade for the previous small alias set; it should not be used as a comprehensive catalog.

## Styling

Set color on the icon or an ancestor and use the public `size` prop. Stroke overrides apply only to legacy node definitions. Internal SVG selectors are implementation details.
