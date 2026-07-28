---
title: Button
description: Trigger actions and guide people through important flows.
path: /components/button
group: Components
section: Actions
order: 110
---

# Button

Buttons communicate actions. Use a primary tone for the most important action in a region and quieter variants for supporting choices.

## Usage

```vue
<H0Button tone="primary">Create project</H0Button>
<H0Button variant="outline">View details</H0Button>
```

## Variants

The `solid`, `soft`, `outline`, and `ghost` variants provide different emphasis levels while preserving shared sizing and interaction states.

## Accessibility

Icon-only controls require an `ariaLabel`. Use `loading` and `loadingText` to preserve context while an asynchronous action is running.
