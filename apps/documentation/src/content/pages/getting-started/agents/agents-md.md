---
title: AGENTS.md
description: Reusable instructions for coding agents working in projects that consume H0N UI.
path: /docs/agents/agents-md
group: Getting started
section: UI for Agents
order: 53
---

# AGENTS.md

Use the generated [`/agents/AGENTS.md`](/agents/AGENTS.md) as a starting point for projects that consume `@h0nio/ui`. Copy its relevant rules into the project's own agent instructions and add project-specific commands, architecture, and product constraints.

The template establishes an authority order between the installed TypeScript declarations, [versioned component catalog](/agent-data/components.v1.json), [`llms.txt`](/llms.txt), and human documentation. It also records supported package boundaries, controlled-state and event conventions, component-selection semantics, icon extensibility, styling limits, accessibility, responsive behavior, and verification expectations.

## What to customize

- Record the absolute H0N UI documentation origin used to resolve the template's `/llms.txt`, `/agent-data`, and `/components` links.
- Add the consuming application's actual typecheck, test, build, and visual verification commands.
- Describe where the plugin, global `@h0nio/ui` styles, and theme, locale, or toast configuration are initialized.
- Document local wrappers and shared compositions that an agent should reuse.
- Add local accessibility requirements and supported viewport ranges.
- Keep the public H0N UI resource links and installed-version check intact so component guidance remains discoverable and version-aware.

> [!WARNING] Template, not a replacement
> Repository-specific instructions still take precedence. Review and merge the template instead of replacing local architecture, product constraints, or commands.
