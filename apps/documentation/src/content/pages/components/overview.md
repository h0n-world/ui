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
| Actions | Button, Button Group, Toolbar |
| Forms | Input, Select, Checkbox, File Upload |
| Feedback | Alert, Toast, Spinner, Skeleton |
| Data | Table, Data Table, Infinite Scroll |
| Layout | Container, Grid, Stack, Scroll Area |
| Navigation | Breadcrumbs, Tabs, Pagination, Side Navigation |
| Overlays | Modal, Drawer, Sheet, Tooltip |
| Content | Card, Typography, List, Image |

## Import strategy

Use named imports from the package root. Vite keeps the production bundle efficient while the component API remains easy to scan.

```ts
import { H0Button, H0Card, H0Input } from '@h0nio/ui'
```

## Theme compatibility

Every component reads the same runtime theme attributes and public CSS variables. Avoid reaching into internal selectors; compose components and use documented variables for local adjustments.
