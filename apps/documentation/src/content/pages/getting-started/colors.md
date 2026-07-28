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

Do not depend on a token's current resolved color value. Choose it by semantic purpose, verify foreground and background contrast together, and avoid using color as the only way to communicate state.
