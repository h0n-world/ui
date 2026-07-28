---
title: Component overview
description: Compose product interfaces with accessible H0N UI primitives.
path: /components/overview
group: Components
section: Explore
order: 100
---

# Component overview

H0N UI provides practical Vue components for forms, navigation, feedback, data display, and overlays. The documentation template consumes the same public API that your product uses.

## Available foundations

| Category | Examples |
| --- | --- |
| Actions | Button, Button Group, Action Bar |
| Forms | Input, Select, Checkbox, Date Picker |
| Feedback | Alert, Toast, Progress, Skeleton |
| Navigation | Breadcrumbs, Tabs, Pagination, Tree |
| Overlays | Modal, Drawer, Sheet, Tooltip |

## Import strategy

Use named imports from the package root. Vite keeps the production bundle efficient while the component API remains easy to scan.

```ts
import { H0Button, H0Card, H0Input } from '@h0n/ui'
```

## Theme compatibility

Every component reads the same runtime theme attributes and public CSS variables. Avoid reaching into internal selectors; compose components and use documented variables for local adjustments.
