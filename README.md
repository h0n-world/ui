# H0N UI

Vue UI library workspace with a local documentation application.

## Structure

- `packages/ui` - reusable Vue component library.
- `apps/documentation` - Vite documentation app with live component examples.

## Commands

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run typecheck
```

## Theme configuration

```ts
import { createApp } from 'vue'
import H0Nui from '@h0nio/ui'
import '@h0nio/ui/style.css'
import App from './App.vue'

createApp(App)
    .use(H0Nui, {
        animation: 'high',
        theme: 'dark',
        typographySize: 'md'
    })
    .mount('#app')
```

Available themes: `light`, `dark`.
Available animation levels: `low`, `high`.
Available typography sizes: `sm`, `md`, `lg`.

Theme, animation, and typography can also be changed at runtime from a Vue setup context:

```ts
import { useH0Theme } from '@h0nio/ui'

const theme = useH0Theme()
theme.setTheme('light')
theme.setAnimation('low')
theme.setTypographySize('lg')
```

## Selective imports

For applications that only use a small part of the library, components and runtime helpers are available through subpath exports:

```ts
import { H0Button } from '@h0nio/ui/components/Button'
import { closeIcon } from '@h0nio/ui/icons'
import { useH0Theme } from '@h0nio/ui/theme'
import '@h0nio/ui/style.css'
```

The root entry imports the shared stylesheet automatically. When using component subpaths, import `@h0nio/ui/style.css` once in the application entry.

## Quality checks

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm test:visual
```

The library build also checks consumer tree-shaking fixtures and bundle size budgets.

## Project policies

- [Contributing](./CONTRIBUTING.md)
- [Security](./SECURITY.md)
- [Release process](./RELEASING.md)
- [Architecture and stable API policy](./ARCHITECTURE.md)
