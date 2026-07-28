---
title: Migration overview
description: A predictable checklist for moving between product versions.
path: /migration/overview
group: Migration
section: Guides
order: 300
---

# Migration overview

Migration guides should describe the reason for a change, show the smallest before-and-after example, and call out any manual verification step.

## Before upgrading

1. Read the changelog for breaking changes.
2. Update packages together when their versions are coupled.
3. Run type checks and the production build.

## Update dependencies

```bash
npm install @h0n/ui@latest
```

## Verify the result

Review important forms, overlays, theme switching, and keyboard navigation before releasing the upgrade.
