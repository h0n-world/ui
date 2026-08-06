# H0N UI Documentation Instructions

These instructions apply to `apps/documentation` in addition to the repository-level instructions.

## Role and Architecture

`@h0n/ui-documentation` is the Markdown-first documentation and visual-validation app for the supported `@h0nio/ui` API. Vite and TypeScript alias `@h0nio/ui` and `@h0nio/ui/icons` to workspace source, so examples test current source rather than installed registry artifacts.

- Pages: `src/content/pages/**/*.md`
- Executable examples: `src/examples/**/*.vue`
- Site/navigation metadata: `src/content/site.ts`
- Markdown discovery/rendering: `src/content/content.ts`
- Typed component records: `src/content/agent/records`
- Record schema and validation: `src/content/agent/schema.ts`
- Generated outputs: `public/llms.txt`, `public/agent-data/components.v1.json`, `public/agents/AGENTS.md`, `public/agents/install-prompt.md`

Do not hand-edit generated outputs.

## Markdown Pages

Every page needs frontmatter with `title`, `description`, `path`, `group`, `section`, and `order`. Page paths drive routing, navigation, search, validation, and agent links.

- Keep explanations, recommendations, accessibility notes, and section order in Markdown.
- Keep executable Vue code in `src/examples`; reference it with `:::example <key>`.
- Use public workspace APIs in examples.
- Use Markdown tables for general prose data.
- Render Imports, Props, Events, Slots, Exposed API, and additional public type tables with `:::component-api` directives.
- Do not maintain handwritten component API tables parallel to typed records.

## Supported Component Contract

Every supported manifest component must have one `ComponentAgentRecordV1`. A family may share one `/components/*` page while retaining separate records for each public member.

Before editing a record:

1. Verify props, defaults, events, slots, exposed API, and public types against Vue/TypeScript source.
2. Obtain family, category, docs path, style entry, and locale section from `h0ComponentManifest`; do not duplicate them in the record.
3. Ensure every referenced example key exists under `src/examples`.
4. Keep `relatedComponents` limited to supported manifest entries and direct composition partners.

Use `:::component-api component H0ComponentName <section>` for a family member and retain a heading whose generated anchor matches its manifest metadata.

Component directories and examples outside `h0ComponentManifest` are incubating. Do not add them to the supported catalog or generated artifacts without an explicit promotion task that also updates the library root API.

## Generated Agent Artifacts

Regenerate after changing a component record, manifest entry, page route, example key, artifact renderer, agent guidance, or `@h0nio/ui` version:

```bash
pnpm --filter @h0n/ui-documentation agents:generate
pnpm --filter @h0n/ui-documentation agents:check
pnpm --filter @h0n/ui-documentation agents:test
```

Review the generated diff for `public/llms.txt`, `public/agent-data/components.v1.json`, `public/agents/AGENTS.md`, and `public/agents/install-prompt.md`. A version-only library change may produce only a mechanical version update.

MCP Server and distributable Agent Skills remain planned. Do not describe them as available until their runtime and distribution contracts exist.

## Verification

For documentation-only changes:

```bash
pnpm --filter @h0n/ui-documentation typecheck
pnpm --filter @h0n/ui-documentation build
```

For component pages, also inspect the relevant route at `http://localhost:5201/components/<slug>` when feasible. Changes to shared documentation renderers, responsive previews, navigation, or component visuals may require the UI Playwright suite.

Keep edits focused: generated artifacts belong in a change only when their sources changed, and unrelated pages/examples should not be reformatted.
