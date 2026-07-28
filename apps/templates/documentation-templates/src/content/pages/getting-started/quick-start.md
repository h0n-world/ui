---
title: Quick start
description: Add your first page and make it part of the generated navigation.
path: /docs/quick-start
group: Getting started
section: Overview
order: 20
---

# Quick start

Documentation pages live in `src/content/pages`. Create a Markdown file anywhere below that directory and give it a short front matter block.

## Create a page

```md
---
title: Authentication
description: Learn how sessions and access tokens work.
path: /guides/authentication
group: Guides
section: Security
order: 30
---

# Authentication

Your content begins here.
```

The new route, left navigation item, page title, search result, and right-side outline are generated automatically.

## Configure the header

Open `src/content/site.ts` and add one item to `headerLinks`. Its `group` must match the group used by your Markdown pages.

## Use H0N UI

The UI plugin is registered in `src/main.ts`. Import components directly when building a custom Vue page:

```vue
<script setup lang="ts">
import { H0Alert, H0Button } from '@h0n/ui'
</script>
```

## Run locally

Install dependencies, start the development server, and open the local URL shown in the terminal.

```bash
npm install
npm run dev
```
