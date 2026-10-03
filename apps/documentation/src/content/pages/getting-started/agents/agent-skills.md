---
title: Agent Skills
description: Install a reusable H0N UI skill for component discovery and nested surface composition.
path: /docs/agents/skills
group: Getting started
section: UI for Agents
order: 53
---

# Agent Skills

The `h0n-ui` skill helps coding agents build Vue interfaces with the supported H0N UI components. It is generated from the same library version, typed records, and manifest as [`llms.txt`](/llms.txt) and the [component catalog](/agent-data/components.v1.json).

## Install the skill

Copy both files into a skill directory named `h0n-ui`, preserving this structure:

```text
h0n-ui/
  SKILL.md
  references/
    components.md
```

- [SKILL.md](/agents/skills/h0n-ui/SKILL.md): entry point, version checks, selection workflow, surface rules, and verification guidance.
- [references/components.md](/agents/skills/h0n-ui/references/components.md): generated index of every supported component with its purpose, use/avoid guidance, and documentation path.

For Codex, place this folder under `$CODEX_HOME/skills` (usually `~/.codex/skills`). For another agent that supports `SKILL.md`, use its documented skill directory. Refresh skill discovery according to that agent's instructions. The files are served by the documentation site; no package-manager install or MCP server is required.

Record the absolute H0N UI documentation origin in the consuming project's agent instructions. The skill uses that origin for exact API records and component pages; it does not assume the documentation is hosted by the consumer application. Both files must come from the same documentation version. Keep them aligned with the installed library version when updating.

## What the skill changes

The agent first searches the supported components rather than assuming it needs a native HTML control. For a known option list, it inspects `H0Select`; for text and multiline text, it inspects `H0Input` and `H0Textarea`. Native HTML remains appropriate when explicitly requested or when the component does not cover the required interaction.

The skill also selects backgrounds from the actual enclosing surface:

| Enclosing background | Nested card or supported control |
| --- | --- |
| `--h0n-ui-color-surface` | Normally `variant="secondary"` |
| `--h0n-ui-color-secondary` | Normally `variant="surface"` |
| Page or custom background | Inspect the actual background and desired separation |

A default `H0Card` uses `surface`, so its inputs and selects normally use `secondary`. A card inside a section that already uses `surface` normally uses `secondary` itself. `H0InputOTP` already defaults to `secondary`; its default should be preserved on a surface background.

The rule applies to the components listed in the skill, including unchecked checkbox/radio indicators and command/select triggers. It does not reinterpret button or typography variants. Explicit flat styling and application theme overrides need contextual judgment. This is agent guidance: components do not automatically detect their parent or change their defaults.

## Use with other resources

Use the [AI installation prompt](/docs/agents/install-prompt) for initial package setup and merge the [consumer AGENTS.md template](/docs/agents/agents-md) into project instructions for persistent conventions. The skill adds a discoverable workflow; it does not replace local architecture or the installed package's TypeScript contract.

The bundled component index works offline. Exact APIs are obtained from installed declarations and the matching online catalog. Skill guidance improves the information available to an agent; it cannot guarantee that every agent will load or follow it. MCP Server remains planned.
