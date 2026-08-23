# @h0nio/icons

Framework-agnostic, tree-shakeable SVG icons for h0nio projects.

```ts
import searchIcon from '@h0nio/icons/search';
import { renderIcon } from '@h0nio/icons/runtime';

const svg = renderIcon(searchIcon, { size: 24, color: 'currentColor' });
```

Metadata is available separately:

```ts
import { iconCatalog } from '@h0nio/icons/catalog';
```

See the repository root README and ARCHITECTURE document for development conventions.
