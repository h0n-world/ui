# @h0nio/icons

Framework-agnostic, tree-shakeable SVG icons for browser and Node.js projects.

[Icon catalog](https://ui.h0n.io/icons/overview) ·
[Usage guide](https://ui.h0n.io/icons/example) ·
[Repository](https://github.com/h0n-world/ui/tree/main/packages/icons)

## Installation

```bash
pnpm add @h0nio/icons
```

The package is ESM-only, requires Node.js `22.12` or newer for Node consumers,
and works in browsers through native ESM or an ESM-aware bundler. It has no
runtime dependencies and does not require a framework.

## Recommended import

Import each icon through its individual subpath. This keeps the consumer module
graph and bundle limited to the definitions that are actually used.

```ts
import searchIcon from '@h0nio/icons/search'
import { renderIcon } from '@h0nio/icons'

const svg = renderIcon(searchIcon, {
  size: 24,
  color: 'currentColor',
  title: 'Search',
})
```

The lightweight package root exports `renderIcon`, `iconToDataUri`, and public
types. It does not import the full icon collection.

## Runtime helpers

`renderIcon` returns an SVG string. `iconToDataUri` returns the same rendered
icon as an encoded SVG data URI.

```ts
import favoriteIcon from '@h0nio/icons/heart-duotone'
import { iconToDataUri, renderIcon } from '@h0nio/icons'

const markup = renderIcon(favoriteIcon, {
  size: '1.5rem',
  color: '#6d5dfc',
  label: 'Favorite',
  class: 'favorite-icon',
})

const imageSource = iconToDataUri(favoriteIcon, { color: '#6d5dfc' })
```

The same helpers and their types remain available from the explicit
`@h0nio/icons/runtime` entry.

## Raw SVG

Raw optimized assets are exposed without the `.svg` suffix. Configure the
consumer bundler to load SVG imports as text or as the asset type required by
the application.

```ts
import searchSvg from '@h0nio/icons/svg/search'
```

## Entry points

| Import | Purpose |
| --- | --- |
| `@h0nio/icons/<name>` | One icon definition; recommended for application code. |
| `@h0nio/icons` | Lightweight runtime helpers and public types. |
| `@h0nio/icons/runtime` | Explicit runtime helper entry. |
| `@h0nio/icons/types` | Public types without icon definitions. |
| `@h0nio/icons/catalog` | Names, styles, categories, and search tags without SVG definitions. |
| `@h0nio/icons/svg/<name>` | One optimized raw SVG asset. |
| `@h0nio/icons/all` | Every definition, named export, and the eager `icons` registry. |

`@h0nio/icons/all` intentionally imports the complete collection. Reserve it
for icon explorers, development tools, and other cases that genuinely require
runtime lookup. Do not use it for ordinary product icons; a named import from
`all` still makes a bundler inspect the complete module graph even when the
final output can be tree-shaken.

```ts
import { icons } from '@h0nio/icons/all'

const searchIcon = icons.search
```

Metadata is available independently from the SVG definitions:

```ts
import { iconCatalog } from '@h0nio/icons/catalog'
import type { IconDefinition, IconName } from '@h0nio/icons/types'
```

## Styles and names

The collection uses three public styles:

- solid icons normally use the base name, such as `heart`;
- stroke icons normally use the `-stroke` suffix;
- duotone icons normally use the `-duotone` suffix.

Not every icon is available in every style. Names are lowercase kebab-case and
match their public package subpaths. Version 1 preserves historical identifiers
from the source collection, including known misspellings, so each icon has one
stable canonical subpath. Corrected spellings are search tags rather than alias
modules. Removing or renaming an existing subpath requires a major release.

## Accessibility

Omit `title` and `label` for decorative icons; `renderIcon` then applies
`aria-hidden="true"`. Provide `title` or `label` when the SVG communicates
meaning on its own. An icon-only button or link still needs its own accessible
name because the icon label does not reliably name the parent control.

The runtime escapes text and attribute values passed through its options. Treat
raw SVG strings as trusted package assets and use the safe HTML-rendering
mechanism appropriate to the consuming framework.

## Credits and licensing

The package source code is developed by H0N World and distributed under the MIT
License.

The icon artwork is based on the
[Solar Icons Set](https://www.figma.com/community/file/1166831539721848736) by
480 Design and is licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The assets have been
renamed, optimized, categorized, converted into TypeScript definitions, and
repackaged for `@h0nio/icons`.

See [`LICENSE`](./LICENSE) and
[`LICENSE-THIRD-PARTY`](./LICENSE-THIRD-PARTY) for the complete notices. Users
of the icons must retain appropriate attribution under CC BY 4.0.

## Maintaining the collection

Import commands require an explicit source directory and never depend on a
repository-external sibling folder:

```bash
pnpm run import:duotone -- --source E:/path/to/source
pnpm run import:solid -- --source E:/path/to/source
pnpm run import:stroke -- --source E:/path/to/source
```

`H0N_ICONS_SOURCE_DIR` can be used instead of `--source`. Run `pnpm run generate`
after an import; generation synchronizes TypeScript definitions, optimized SVG,
the full registry, catalog, names, and manifest.

Before submitting a package change, run:

```bash
pnpm --filter @h0nio/icons check
pnpm --filter @h0nio/icons test
pnpm --filter @h0nio/icons build
pnpm --filter @h0nio/icons verify:tarball
```

See the repository [architecture](../../ARCHITECTURE.md) and
[release process](../../RELEASING.md) for public-contract and publishing rules.
