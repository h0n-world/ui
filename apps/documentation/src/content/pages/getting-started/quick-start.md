---
title: Quick Start
description: Install H0N UI, register the Vue plugin, and configure your application theme.
path: /docs/quick-start
group: Getting started
section: Overview
order: 20
---

# Quick Start

## Install the package

Add H0N UI to an existing Vue 3 application with your package manager.

```bash
npm install @h0nio/ui
```

```bash
pnpm add @h0nio/ui
```

The application must use Vue `3.5` or newer. H0N UI installs its icon runtime dependency automatically for built-in controls. Install `@h0nio/icons` directly only when application code imports icon definitions:

```bash
pnpm add @h0nio/icons
```

Prefer individual imports such as `@h0nio/icons/search`. The older `@h0nio/ui/icons` entry remains available as a compatibility facade.

## Install with an AI agent

Prefer an automated setup? Copy the versioned [AI installation prompt](/docs/agents/install-prompt) and give it to a coding agent with access to your project. It instructs the agent to detect the existing package manager and Vue bootstrap, preserve the current architecture, install the matching H0N UI version, register styles and the plugin once, and run the project's actual validation commands.

The raw copy-paste prompt is available at [`/agents/install-prompt.md`](/agents/install-prompt.md).

## Register the plugin

Register the default export once in the application entry and import the shared stylesheet.

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
        storageKey: 'product-theme',
        theme: 'system',
        typographySize: 'md',
    })
    .mount('#app')
```

The root `@h0nio/ui` entry also includes the shared stylesheet in its ES bundle. Keeping the explicit style import makes the dependency visible and is required when the application uses only component subpath imports.

## Plugin options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `'light' \| 'dark' \| 'system'` | `'light'` | Theme preference. `system` follows `prefers-color-scheme`. |
| `animation` | `'low' \| 'high'` | `'low'` | Motion profile. `low` suppresses optional continuous effects; system reduced-motion preference always takes priority. |
| `density` | `'compact' \| 'default' \| 'comfortable'` | `'default'` | Shared control and table density. |
| `radiusSize` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Global radius scale. |
| `typographySize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Global typography scale. |
| `storageKey` | `string \| false` | `false` | Persists the selected theme when a key is provided. |
| `target` | `HTMLElement` | `document.documentElement` | Element that receives the runtime `data-h0n-*` attributes. |
| `locale` | `H0LocaleConfig \| H0LocaleService` | Default locale service | Locale messages or an existing locale service. |
| `localeLanguage` | `string` | Service default | Initial language passed to the locale service. |
| `toast` | `H0ToastConfig` | Toast defaults | Global toast service configuration. |

## Use a component

Components can be imported from the package root in Vue single-file components.

```vue
<script setup lang="ts">
import { H0Button, H0Card } from '@h0nio/ui'
</script>

<template>
    <H0Card>
        <template #header>Create project</template>
        <template #description>Start with the shared H0N UI theme and tokens.</template>

        <H0Button tone="primary">Continue</H0Button>
    </H0Card>
</template>
```

## Change settings at runtime

Use `useH0Theme` inside the Vue application. It returns reactive theme state and setters backed by the same service registered by the plugin.

```vue
<script setup lang="ts">
import { H0Button, useH0Theme } from '@h0nio/ui'

const theme = useH0Theme()
</script>

<template>
    <H0Button variant="soft" @click="theme.toggleTheme()">
        Switch from {{ theme.resolvedTheme.value }} theme
    </H0Button>
</template>
```

Available setters are `setTheme`, `setAnimation`, `setDensity`, `setRadiusSize`, and `setTypographySize`.

## Selective imports

Applications can import an individual component entry. Import either the shared stylesheet once or the matching component stylesheet.

```ts
import { H0Button } from '@h0nio/ui/components/Button'
import '@h0nio/ui/components/Button/style.css'
```

Use `@h0nio/ui/style.css` instead when several selectively imported components must share the complete token and component stylesheet.

## Use public design tokens

After the stylesheet is loaded, public tokens are available to application CSS without additional Sass configuration.

```css
.custom-callout {
    background: var(--h0n-ui-color-secondary);
    border: 1px solid var(--h0n-ui-color-border);
    box-shadow: var(--h0n-ui-shadow);
    color: var(--h0n-ui-color-text);
    padding: var(--h0n-ui-spacing-lg);
}
```

Continue with **Colors** for the complete visual color reference.
