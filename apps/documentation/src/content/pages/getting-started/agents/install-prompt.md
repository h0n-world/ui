---
title: AI installation prompt
description: Copy a versioned prompt that guides a coding agent through installing and configuring H0N UI.
path: /docs/agents/install-prompt
group: Getting started
section: UI for Agents
order: 50
---

# AI installation prompt

Use the generated [`/agents/install-prompt.md`](/agents/install-prompt.md) when you want a coding agent to install H0N UI in an existing Vue project. The prompt is generated with the current library version, so the agent receives the same package boundary and setup rules as the rest of the agent resources.

## How to use it

1. Open the [installation prompt](/agents/install-prompt.md) and copy its complete contents.
2. Give the prompt to an AI coding agent that can inspect and edit your project.
3. Add any product-specific requirements, such as the desired theme, locale, density, or whether selective imports are mandatory.
4. Review the agent's changed-file summary and validation results before accepting the installation.

The prompt tells the agent to preserve the repository's package manager, application bootstrap, router, store, plugin chain, and stylesheet pipeline. It also requires Vue `3.5` or newer, installs the exact documented `@h0nio/ui` version, avoids the nonexistent `@h0n/icon` dependency, and verifies the result with the project's real commands.

## What the agent should produce

- one intentional dependency and lockfile update using the existing package manager;
- one global `@h0nio/ui/style.css` import for the standard setup;
- `H0Nui` registered on the existing Vue application instance;
- only product-approved theme, locale, toast, density, radius, typography, or animation options;
- successful typecheck and production build results, or a clear report of any pre-existing blocker.

For a project that already consumes H0N UI, use [`llms.txt`](/docs/agents/llms-txt) and the [consumer `AGENTS.md` template](/docs/agents/agents-md) instead of repeating the installation workflow.

> [!INFO] Versioned generated prompt
> The public prompt is regenerated from the `@h0nio/ui` package version. When the documentation version changes, the requested install version changes with it.
