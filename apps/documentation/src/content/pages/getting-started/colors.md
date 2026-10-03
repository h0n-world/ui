---
title: Colors
description: Use H0N UI semantic color tokens in components and application-specific styles.
path: /docs/colors
group: Getting started
section: Handbook
template: color-catalog
order: 30
---

# Colors

H0N UI exposes theme-aware CSS custom properties for application code. Use the variables below in ordinary CSS, scoped Vue styles, CSS modules, or CSS-in-JS values that accept custom properties.

## Using color tokens

Reference a token with `var()` instead of copying its resolved value.

```css
.account-summary {
    background: var(--h0n-ui-color-secondary);
    border: 1px solid var(--h0n-ui-color-border);
    color: var(--h0n-ui-color-text);
}

.account-summary__status {
    color: var(--h0n-ui-color-success-text);
}
```

## Theme behavior

The same token resolves to the appropriate value for the active light or dark theme. Switch the theme from the documentation header to see every swatch update live.

## Accent palettes

Accent is independent of theme: each preset has a light and a dark palette.
The Header palette selector updates the live examples and color swatches.

| Accent | Light palette | Dark palette |
| --- | --- | --- |
| `default` | Existing H0N colors | Existing H0N colors |
| `telegram` | Blue accent, white and cool gray surfaces | Pale blue accent, deep blue-gray surfaces |
| `uber` | Black accent, white and neutral gray surfaces | White accent, black and charcoal surfaces |

Telegram and Uber are visual presets inspired by those interfaces, not integrations
with their applications. They change surfaces, borders, text, and focus colors as
well as the primary accent. Success, warning, and danger keep their semantic meaning.

Configure a project when installing the plugin:

```ts
import H0Nui from '@h0nio/ui'
import '@h0nio/ui/style.css'

app.use(H0Nui, {
    theme: 'system',
    accent: 'telegram',
})
```

The default accent is `default`. `theme: 'system'` chooses the light/dark member
of the selected palette using the operating system's appearance preference.

In a Vue setup context, use the app-scoped service:

```ts
import { useH0Theme, type H0AccentName } from '@h0nio/ui'

const appearance = useH0Theme()
const accent: H0AccentName = 'uber'
appearance.setAccent(accent)
appearance.setTheme('dark')
// appearance.accent.value is readonly reactive state.
```

Without `storageKey`, configuration controls the initial appearance on each
load. Opt into persistence with `storageKey: 'my-app-theme'`: the theme is stored
under that key and the accent under `my-app-theme:accent`. Valid saved values
take precedence over configuration. Invalid saved values fall back to configuration;
unavailable browser storage does not prevent appearance changes.

The service writes `data-h0n-theme` and `data-h0n-accent` on the same element
(`document.documentElement` by default, or the configured `target`). For SSR,
render both attributes on the appearance target to match the initial configuration.
When using a custom target, keep teleported overlays inside that styled scope.

Use `--h0n-ui-color-primary-contrast` for content on a primary background. In
dark Telegram and Uber palettes this foreground is dark; do not assume primary
buttons always have white text. Fixed-color illustrations and avatar gradients
retain their own foregrounds.

Do not depend on a token's current resolved color value. Choose it by semantic purpose, verify foreground and background contrast together, and avoid using color as the only way to communicate state.
