---
title: Example
description: Import and render @h0nio/icons in an application with tree-shakeable entry points.
path: /icons/example
group: Icons
section: Guides
order: 310
---

# Example

`@h0nio/icons` exports framework-agnostic SVG definitions. Import icons through their individual package subpaths and render them with the small runtime helper.

## Installation

Add the icon library to your application.

```bash
pnpm add @h0nio/icons
```

## Interactive example

The example uses direct icon imports, so a consumer only bundles the selected definitions. Change the preview size and color to see how the same definitions adapt to different interface contexts.

:::example icons/BasicExample
:::

## Direct imports

Each icon has a default export at `@h0nio/icons/<name>`. Import `renderIcon` separately from the runtime entry point.

```ts
import heartIcon from '@h0nio/icons/heart-duotone'
import { renderIcon } from '@h0nio/icons/runtime'

const markup = renderIcon(heartIcon, {
  size: 32,
  color: '#6D5DFC',
  title: 'Favorite',
})
```

`renderIcon` returns an SVG string. Use the trusted library output with the rendering mechanism provided by your framework, or insert it into a DOM container in a framework-agnostic application.

## Accessibility

Pass `title` or `label` when an icon communicates information by itself. Decorative icons can omit both values and are rendered with `aria-hidden="true"`. An icon-only button still needs its own accessible label because the icon title does not reliably name its parent control.

## Tree shaking

Prefer individual icon subpaths in product code. Importing the complete `icons` catalog is useful for explorers and development tools, but it intentionally includes every definition and should not be used for ordinary interface icons.
