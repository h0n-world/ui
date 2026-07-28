---
title: Introduction
description: Build consistent Vue interfaces with H0N UI components, themes, and design tokens.
path: /docs/introduction
group: Getting started
section: Overview
order: 10
---

# Introduction

H0N UI is a Vue 3 component library for product interfaces. It combines accessible interactive components, a shared visual language, runtime theme configuration, localization services, and reusable CSS design tokens.

## What the library provides

- **Vue components** for actions, forms, navigation, feedback, content, data display, layout, and overlays.
- **Theme-aware styling** with light, dark, and system preferences.
- **Consistent design tokens** for colors, spacing, typography, radius, motion, control sizes, layers, and shadows.
- **Runtime configuration** for density, animation, radius, typography, locale, and toast behavior.
- **Typed public APIs** for components, composables, services, and component metadata.
- **Selective entry points** when an application needs component-level imports and styles.

## Requirements

H0N UI targets Vue `3.5` or newer. The package is distributed as an ES module and is designed for modern Vue build tools such as Vite.

```json
{
    "peerDependencies": {
        "vue": "^3.5.0"
    }
}
```

## Styling model

The library stylesheet defines theme palettes and public `--h0n-ui-*` custom properties. Components and application-specific UI can consume the same tokens, so a theme change updates both without duplicating color literals.

```css
.product-panel {
    background: var(--h0n-ui-color-secondary);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-lg);
    color: var(--h0n-ui-color-text);
    padding: var(--h0n-ui-spacing-xl);
}
```

Prefer semantic tokens over resolved `hex`, `rgb`, or `lab` values. The value behind a token can change between light and dark themes while its purpose remains stable.

## Documentation map

- Continue with **Quick start** to install and configure the Vue plugin.
- Open **Colors** to browse theme-aware color variables available to product CSS.
- Use **Components** for detailed API references and live examples.
- The **UI for Agents** section is reserved for upcoming agent integration guides.
