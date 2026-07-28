# H0N Documentation Template

A Vue 3, Markdown-first documentation starter composed with the self-contained `@h0n/ui` package.

## Start

```bash
npm install
npm run dev
```

The development server is available at `http://localhost:5201`.

## Add documentation

Create a Markdown file in `src/content/pages` with this front matter:

```md
---
title: Authentication
description: Learn how authentication works.
path: /guides/authentication
group: Guides
section: Security
order: 30
---
```

The route, left navigation, search result, and page outline are generated automatically. Primary header links and product details live in `src/content/site.ts`.

## Alerts

Markdown blockquotes are rendered with `H0Alert`. Add an optional tone marker to select the semantic appearance:

```md
> [!INFO]
> Helpful context for the current task.

> [!WARNING] Before you continue
> This action changes the project configuration.
```

Supported markers are `NOTE`, `INFO`, `TIP`, `SUCCESS`, `IMPORTANT`, `WARNING`, `CAUTION`, `ERROR`, `DANGER`, and `DEFAULT`. A blockquote without a marker uses the neutral `default` tone.

## Tables

Standard Markdown tables are rendered with the responsive `H0Table` component. Alignment markers and inline Markdown inside cells are preserved:

```md
| Name |   Status    | Requests |
| ---- | :---------: | -------: |
| API  | **Healthy** |    1,240 |
```

The template currently resolves H0N packages from the local repository. Replace the `file:` dependency paths and Vite/TypeScript aliases with registry versions when the packages are published.
