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

Each icon has a default export at `@h0nio/icons/<name>`. The lightweight package root contains the runtime helpers and public types without importing the complete collection.

```ts
import heartIcon from '@h0nio/icons/heart-duotone'
import { renderIcon } from '@h0nio/icons'

const markup = renderIcon(heartIcon, {
  size: 32,
  color: '#6D5DFC',
  title: 'Favorite',
})
```

`renderIcon` returns an SVG string. Use the trusted library output with the rendering mechanism provided by your framework, or insert it into a DOM container in a framework-agnostic application.

`iconToDataUri` is available from the same root when an image source or CSS URL is more convenient. The explicit `@h0nio/icons/runtime` entry remains available for consumers that prefer a dedicated runtime path.

## Raw SVG assets

Import an optimized SVG through `@h0nio/icons/svg/<name>` when the consumer toolchain should handle the asset directly. The `.svg` suffix is omitted from the public import. Configure the bundler to load SVG files as text, URLs, or framework components as appropriate.

```ts
import heartSvg from '@h0nio/icons/svg/heart-duotone'
```

## Runtime support

The package is ESM-only, has no runtime dependencies, and supports Node.js `22.12` or newer. Browser applications can use it through native ESM or an ESM-aware bundler. The definitions and rendering helpers do not require Vue or another framework.

## Styles and naming

The catalog contains `solid`, `stroke`, and `duotone` styles. Solid icons normally use the base name, stroke icons use `-stroke`, and duotone icons use `-duotone`; not every icon exists in every style.

Public subpaths use lowercase kebab-case. Version 1 intentionally preserves historical source identifiers, including known misspellings, to keep every icon on one stable canonical subpath. Correct spellings are searchable tags rather than duplicate alias modules.

## Accessibility

Pass `title` or `label` when an icon communicates information by itself. Decorative icons can omit both values and are rendered with `aria-hidden="true"`. An icon-only button still needs its own accessible label because the icon title does not reliably name its parent control.

## Tree shaking

Prefer individual icon subpaths in product code. `@h0nio/icons/catalog` contains searchable metadata without SVG definitions. `@h0nio/icons/all` exposes every named definition and the eager `icons` registry for explorers and development tools, but intentionally makes the bundler inspect the complete icon module graph and should not be used for ordinary interface icons.

```ts
import { iconCatalog } from '@h0nio/icons/catalog'
import { icons } from '@h0nio/icons/all'
```

## Licensing

The package code is MIT-licensed. The Solar Icons artwork by 480 Design is available under CC BY 4.0 and requires attribution. The npm package includes `LICENSE` and `LICENSE-THIRD-PARTY` with the complete notices and a description of changes made for `@h0nio/icons`.
