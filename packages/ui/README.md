# H0N UI

H0N UI is the Vue 3 component library and design-system foundation built for H0N World. It exists first to give H0N products a consistent visual language, interaction model, and implementation contract. The package is also published for teams that want to use the same components in their own Vue applications.

[Documentation](https://ui.h0n.io) · [Components](https://ui.h0n.io/components/all) · [Quick Start](https://ui.h0n.io/docs/quick-start) · [Changelog](https://ui.h0n.io/releases/changelog) · [npm](https://www.npmjs.com/package/@h0nio/ui) · [GitHub](https://github.com/h0n-world/ui)

## What is included

- accessible Vue components for forms, navigation, overlays, feedback, data display, content, and layout;
- shared themes, appearance settings, localization, toast services, and public CSS design tokens;
- typed root and selective component imports;
- keyboard interaction, focus management, reduced-motion, RTL, forced-colors, and SSR-aware behavior;
- live documentation with executable examples and machine-readable resources for AI coding agents.

`H0Dropdown` reveals arbitrary floating content from a consumer-owned trigger:

```vue
<H0Dropdown :min-width="220" :max-height="320">
    <H0Button>Actions</H0Button>
    <template #content="{ close }">
        <H0Button @click="close">New file</H0Button>
    </template>
</H0Dropdown>
```

Use exactly one trigger which forwards attributes and events to its focusable
root. Content supports custom markup, forms, or library components. See the
Dropdown documentation for state control, sizing and keyboard behavior.

## Requirements

- Vue `3.5` or newer;
- a modern browser supported by your Vue application;
- a Vue build tool with ESM and CSS import support, such as Vite.

## Installation

Use the package manager already selected by your project:

```bash
pnpm add @h0nio/ui
```

```bash
npm install @h0nio/ui
```

H0N UI installs `@h0nio/icons` as a runtime dependency for its internal controls, so no second installation is needed to use UI components. Applications that import icon definitions directly should declare `@h0nio/icons` themselves:

```bash
pnpm add @h0nio/icons
```

```vue
<script setup lang="ts">
import searchIcon from '@h0nio/icons/search'
import { H0Icon } from '@h0nio/ui'
</script>

<template>
    <H0Icon :icon="searchIcon" />
</template>
```

Prefer individual icon subpaths for tree shaking. `@h0nio/ui/icons` remains available as a compatibility facade for the previous small system set.

## Register the plugin

Import the shared stylesheet once and register the plugin on your existing Vue application instance:

```ts
import { createApp } from 'vue'
import H0Nui from '@h0nio/ui'
import '@h0nio/ui/style.css'

import App from './App.vue'

createApp(App)
    .use(H0Nui, {
        animation: 'high',
        density: 'default',
        radiusSize: 'lg',
        theme: 'system',
        typographySize: 'md'
    })
    .mount('#app')
```

Plugin options can configure theme, animation, density, radius, typography, locale, theme persistence, and the global toast service. See [Quick Start](https://ui.h0n.io/docs/quick-start#plugin-options) for the complete contract and defaults.

## Use components

Public components and types can be imported from the package root:

```vue
<script setup lang="ts">
import { H0Button, H0Card } from '@h0nio/ui'
</script>

<template>
    <H0Card>
        <template #header>Create project</template>
        <template #description>Build with the shared H0N visual language.</template>

        <H0Button tone="primary">Continue</H0Button>
    </H0Card>
</template>
```

For selective imports, load the component family and either its matching stylesheet or the global stylesheet:

```ts
import { H0Button } from '@h0nio/ui/components/Button'
import '@h0nio/ui/components/Button/style.css'
```

Do not combine multiple copies of global and selective styles. Use `@h0nio/ui/style.css` once when an application consumes several component families.

## Runtime appearance

Choose an accent palette independently of light/dark mode at installation:

```ts
app.use(H0Nui, { theme: 'system', accent: 'telegram' })
```

`accent` accepts `default` (existing colors), `telegram` (blue and cool surfaces),
or `uber` (monochrome). Each preset includes light and dark palettes. The default
is `default`. With `storageKey` enabled, accent persists under `<storageKey>:accent`
and valid saved appearance takes precedence over configuration. Storage is off by
default. The service applies `data-h0n-accent` alongside `data-h0n-theme` to its target.

The plugin provides app-scoped runtime services. Appearance can be changed from a Vue setup context:

```ts
import { useH0Theme } from '@h0nio/ui'

const appearance = useH0Theme()

appearance.setTheme('dark')
appearance.setAccent('uber')
appearance.setDensity('compact')
appearance.setAnimation('low')
```

Animation accepts `off | low | medium | high | recommended` (default `low`).
Recommended combines available resource/graphics hints with a bounded foreground
frame sample. The system reduced-motion preference always resolves to Off, even
when High was requested. Static loading and control semantics remain available.

```ts
import { useH0Animation } from '@h0nio/ui'

const motion = useH0Animation()
motion.setPreference('recommended')
// Read quality.value, recommendedQuality.value, recommendationReason.value,
// isEvaluating.value, enabled.value, reducedMotion.value, continuous.value,
// and rich.value to coordinate application effects with the library.
```

The recommendation is a conservative heuristic, not a guarantee that browser GPU
acceleration is enabled. See [Animations](https://ui.h0n.io/docs/animations) for
signal limitations, SSR, refresh and lifecycle behavior.

Application CSS can use stable public variables with the `--h0n-ui-*` prefix. Component-local variables and internal class names are not part of the public styling contract.

## UI for AI agents

H0N UI publishes versioned resources that help coding agents install the package, select the correct component, and implement only supported APIs:

- [AI installation prompt](https://ui.h0n.io/agents/install-prompt.md) — copy the complete prompt and give it to an agent with access to your project;
- [llms.txt](https://ui.h0n.io/llms.txt) — compact library overview, package boundaries, workflow, and component index;
- [component catalog v1](https://ui.h0n.io/agent-data/components.v1.json) — exact imports, APIs, examples, accessibility guidance, and use/avoid recommendations;
- [consumer AGENTS.md](https://ui.h0n.io/agents/AGENTS.md) — reusable policy template for projects that consume H0N UI;
- [UI for Agents documentation](https://ui.h0n.io/docs/agents/install-prompt) — human-readable guidance for using these resources.

For a new integration, start with the installation prompt. For ongoing component work, confirm the installed package version, then use `llms.txt`, the matching catalog record, component documentation, and the installed TypeScript declarations.

## Documentation and support

- [Documentation](https://ui.h0n.io)
- [All components](https://ui.h0n.io/components/all)
- [Design principles](https://ui.h0n.io/docs/design-principles)
- [Release notes](https://ui.h0n.io/releases/changelog)
- [Issue tracker](https://github.com/h0n-world/ui/issues)
- [Security policy](https://github.com/h0n-world/ui/security/policy)

## Contributing

Development is organized as a pnpm workspace containing the publishable library and its documentation application. Before contributing, read the [contribution guide](https://github.com/h0n-world/ui/blob/main/CONTRIBUTING.md), [architecture](https://github.com/h0n-world/ui/blob/main/ARCHITECTURE.md), and [release process](https://github.com/h0n-world/ui/blob/main/RELEASING.md).

## License

[MIT](https://github.com/h0n-world/ui/blob/main/packages/ui/LICENSE). Solar Icons artwork used by internal controls is credited in [`LICENSE-THIRD-PARTY`](https://github.com/h0n-world/ui/blob/main/packages/ui/LICENSE-THIRD-PARTY).
