# @h0nio/ui

Production-ready Vue 3 component library for the H0N design system.

## Installation

```bash
pnpm add @h0nio/ui vue
```

## Usage

Install the plugin once to configure the app-scoped theme, locale, toast services, and global component registry:

```ts
import { createApp } from 'vue'
import H0Nui from '@h0nio/ui'
import '@h0nio/ui/style.css'

import App from './App.vue'

createApp(App).use(H0Nui).mount('#app')
```

Components also support named and selective imports:

```ts
import { H0Button } from '@h0nio/ui'
import { H0Button as SelectiveH0Button } from '@h0nio/ui/components/Button'
import '@h0nio/ui/components/Button/style.css'
```

See the [repository documentation](https://github.com/h0n-world/ui) for component APIs, examples, theming, accessibility guidance, and selective entry points.

For contributions and releases, see the repository [contribution guide](https://github.com/h0n-world/ui/blob/main/CONTRIBUTING.md) and [release process](https://github.com/h0n-world/ui/blob/main/RELEASING.md). Report suspected vulnerabilities through the [security policy](https://github.com/h0n-world/ui/security/policy).

## Requirements

- Vue 3.5 or newer.
- A modern browser supported by your Vue application.

## License

[MIT](./LICENSE)
