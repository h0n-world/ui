---
title: llms.txt
description: Discover H0N UI documentation and versioned component data from a compact agent index.
path: /docs/agents/llms-txt
group: Getting started
section: UI for Agents
order: 51
---

# llms.txt

H0N UI publishes a generated [`/llms.txt`](/llms.txt) entry point for language models and coding agents. It identifies the exact library version, installation boundary, public package subpaths, implementation workflow, core documentation routes, and every supported component grouped by purpose.

The file is generated from the package version, public component manifest, and the same typed records that render API tables. A component cannot appear in this index without a synchronized public export, manifest entry, documentation route, and validated record.

## Available resources

- [`/agents/install-prompt.md`](/agents/install-prompt.md) is a versioned copy-paste task for installing and configuring H0N UI in an existing Vue project.
- [`/llms.txt`](/llms.txt) is the compact discovery layer: use it to establish scope, find a component, and locate the authoritative detail.
- [`/agent-data/components.v1.json`](/agent-data/components.v1.json) is the versioned machine contract for exact imports, props, events, slots, exposed APIs, public types, examples, accessibility, styling, responsive behavior, and selection guidance.
- [`/agents/AGENTS.md`](/agents/AGENTS.md) is a reusable implementation-policy template for projects consuming `@h0nio/ui`.
- Component documentation and executable examples explain composition and product intent after the exact API has been established.

## Recommended agent flow

1. If the library is not installed, follow the [AI installation prompt](/docs/agents/install-prompt). Otherwise confirm that the installed `@h0nio/ui` version matches the resource version.
2. Use `llms.txt` to select the component by semantics rather than appearance.
3. Read that component's JSON record and the linked documentation page.
4. Verify uncertain details against the installed TypeScript declarations.
5. Implement only documented imports, APIs, slots, and public `--h0n-ui-*` variables.
6. Run the consuming project's typecheck, build, behavioral tests, and relevant accessibility or responsive checks.

## Path resolution

Links beginning with `/` are relative to the H0N UI documentation origin. They are not routes in the consuming application. A copied agent instruction file should record the documentation origin explicitly so tools can resolve `/agents/install-prompt.md`, `/llms.txt`, `/agent-data/components.v1.json`, and component pages correctly.

## Current scope

Catalog schema `v1` covers the complete supported `@h0nio/ui` `1.1.0` manifest. The schema version describes the JSON shape and is independent from the library version.

> [!INFO] Generated and checked
> The public files are generated artifacts. Repository validation fails when their committed content no longer matches the typed sources.
