# H0N UI Documentation

A Vue 3, Markdown-first documentation application for the self-contained local `@h0nio/ui` workspace.

## Start

```bash
pnpm install
pnpm --filter @h0n/ui-documentation dev
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

## Live component examples

Keep page prose and ordering in Markdown, and keep executable Vue examples in `src/examples`. Reference an example without duplicating its source:

```md
## Usage

:::example components/button/BasicExample
:::
```

The documentation renders the Vue fixture inside the responsive Desktop/Tablet/Mobile preview and displays the same `.vue` file as expandable, copyable source. Example keys are relative to `src/examples` without the `.vue` extension. Missing examples and unclosed directives fail type checking and production builds.

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

The app currently resolves H0N packages from the local workspace through Vite/TypeScript aliases. Replace those aliases with registry packages only when the documentation is intentionally tested against published artifacts.
