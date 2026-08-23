---
title: Icon library
description: Browse, preview, and copy imports for every icon in @h0nio/icons.
path: /icons/overview
group: Icons
section: Catalog
template: icon-catalog
order: 300
---

# Icon library

`@h0nio/icons` is a framework-agnostic collection of tree-shakeable SVG definitions. Use the catalog below to search by name or tag, narrow the collection by style and category, and preview every icon at the size and color it will use in your interface.

## Importing an icon

Import an individual icon from its package subpath to keep the consumer bundle focused. Select any catalog card to copy its import statement.

```ts
import icon from '@h0nio/icons/accessibility-duotone'
```

The catalog renders results in batches and loads more as you approach the end of the grid, so filtering the complete collection does not create thousands of DOM nodes at once.
