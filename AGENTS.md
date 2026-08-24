# H0N UI Codex Instructions

H0N UI is a pnpm workspace for a self-contained Vue 3 component library, a framework-agnostic icon library, and a source-linked documentation application. The current UI library version is `@h0nio/ui` `1.2.0`.

## Current Scope

The maintained core of the workspace is:

- `packages/ui`: publishable Vue component library `@h0nio/ui`.
- `packages/icons`: independently versioned icon library `@h0nio/icons`.
- `apps/documentation`: Vite documentation and visual-validation application.

Treat `apps/templates` as incubating and out of scope unless the user explicitly includes it. Do not use its current state to infer conventions for the core library.

## Source of Truth

- `packages/ui/src/index.ts`: root public API, public type exports, and Vue plugin registry.
- `packages/ui/src/entry.ts`: full library entry; imports global SCSS and re-exports the root API.
- `packages/ui/src/manifest.ts`: metadata for components supported by documentation and agent records.
- `packages/ui/src/theme.ts`: app-scoped theme service and runtime appearance attributes.
- `packages/ui/src/locale.ts`: app-scoped locale service and built-in strings.
- `packages/ui/src/styles`: shared tokens, palettes, theme variables, mixins, and breakpoints.
- `packages/ui/src/components/<Family>`: component family implementation and barrel.
- `packages/ui/src/composables`: supported public composables.
- `packages/ui/src/icons/index.ts`: tree-shakeable compatibility facade for the former system aliases exposed through `@h0nio/ui/icons`.
- `packages/icons/src`: generated framework-agnostic icon definitions, catalog, and rendering runtime exposed through `@h0nio/icons`.
- `packages/icons/scripts`: icon import, generation, validation, and SVG copy scripts.
- `apps/documentation/src/content/pages`: Markdown documentation pages.
- `apps/documentation/src/examples`: executable Vue examples.
- `apps/documentation/src/content/agent/records`: typed component metadata used to generate agent-facing artifacts.
- `ARCHITECTURE.md`: current architectural map, public-contract rules, and known boundaries.

Files under `apps/documentation/public/llms.txt`, `apps/documentation/public/agent-data`, and `apps/documentation/public/agents` are generated outputs. Change their typed/Markdown sources and regenerate; do not hand-edit them.

## Package Manager and Commands

Use pnpm. `package.json` declares `pnpm@11.17.0`, `pnpm-lock.yaml` is the only lockfile, and root scripts use pnpm filters. Do not use npm workspace flags or create `package-lock.json`.

Package-specific checks:

```bash
pnpm --filter @h0nio/icons generate
pnpm --filter @h0nio/icons check
pnpm --filter @h0nio/icons build
pnpm --filter @h0nio/ui typecheck
pnpm --filter @h0nio/ui test
pnpm --filter @h0nio/ui build
pnpm --filter @h0n/ui-documentation typecheck
pnpm --filter @h0n/ui-documentation agents:test
pnpm --filter @h0n/ui-documentation build
```

Root orchestration scripts compose the maintained packages and documentation application:

```bash
pnpm run dev
pnpm run generate
pnpm run check
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run test:visual
```

Use root checks when validating integration across the maintained workspace. The documentation dev server runs on `http://localhost:5201`.

## Public API Contract

A component is part of the supported root API only when all applicable surfaces agree:

1. Its family barrel exports the component and public types.
2. `packages/ui/src/index.ts` imports, exports, and registers it when global registration is intended.
3. `packages/ui/src/manifest.ts` describes it.
4. Documentation has a matching `/components/<slug>` page.
5. `apps/documentation/src/content/agent/records` has one record per public component.

The Vite build discovers every component family containing `index.ts` and emits a component subpath. Empty placeholder directories and draft documentation examples are not public components. Do not add an `index.ts`, promote, document, or rely on a draft family without synchronizing the complete supported contract.

Public conventions:

- Components use the `H0` prefix and `defineOptions({ name: 'H0...' })`.
- Public component types live in nearby `*.types.ts` files and use `H0<Component><Concept>` names.
- Shared types belong in `packages/ui/src/types.ts` only when their complete semantics are shared.
- The primary controlled model is `modelValue` / `update:modelValue`; uncontrolled initialization uses `defaultValue`.
- Multi-word events use kebab-case. `update:*` synchronizes state; user actions may additionally emit a normalized `change`.
- Wrapper components explicitly route native and ARIA attributes to the actual control.
- Internal `_shared` modules and undocumented DOM structure are not public API.
- Icon props use the structural `H0IconSource` type owned by `@h0nio/ui`, accepting legacy node definitions and trusted body definitions from individual `@h0nio/icons/*` subpaths. Internal components import those subpaths directly; they never import `@h0nio/icons/all`, the catalog, or the public compatibility facade. Prefer named icon/visual slots when a component must accept arbitrary Vue or SVG content.

## Component Workflow

When adding or changing a supported public component:

1. Update `packages/ui/src/components/<Family>`.
2. Export the supported component and types from the family barrel.
3. Synchronize `packages/ui/src/index.ts` and `packages/ui/src/manifest.ts`.
4. Update the Markdown page in `apps/documentation/src/content/pages/components`.
5. Update live examples under `apps/documentation/src/examples`.
6. Update every affected typed record under `apps/documentation/src/content/agent/records`.
7. Regenerate agent artifacts when their inputs changed.
8. Run checks proportional to the affected API, package, and visual surface.

Do not update the public contract snapshot mechanically. Review an intentional public API or stable CSS-token change, then update `packages/ui/contracts/public-contract.snapshot.json` in the same task.

## Styling and Runtime Services

- Prefer stable `--h0n-ui-*` custom properties over hard-coded shared values.
- Variables without the `--h0n-ui-` prefix are private component implementation details.
- Shared token classes include color, spacing, radius, motion, typography, control, overlay, scrollbar, table, and layer variables.
- Preserve the cascade-layer and dependency-closure behavior in `packages/ui/vite.config.ts`.
- Preserve SSR guards around `window`, `document`, `localStorage`, and media queries.
- Theme, locale, and toast state are app-scoped services provided by the plugin; do not reintroduce process-global mutable state.

Runtime appearance attributes are:

- `data-h0n-theme`: `light` or `dark` after resolving the `light | dark | system` preference.
- `data-h0n-animation`: `low` or `high`.
- `data-h0n-density`: `compact`, `default`, or `comfortable`.
- `data-h0n-radius-size`: `sm`, `md`, or `lg`.
- `data-h0n-typography-size`: `sm`, `md`, or `lg`.

## Accessibility and Quality

- Preserve accessible names for icon-only controls, deterministic IDs, error/hint relationships, disabled state, and focus-visible styles.
- Composite widgets must implement their expected keyboard model.
- Overlays must retain initial focus, focus containment, Escape handling, scroll locking, and focus restoration.
- Consider RTL, forced colors, reduced motion, SSR/hydration, and cleanup of listeners/observers.
- Library builds also validate consumer fixtures and bundle-size budgets.
- Visual work should be inspected in the relevant documentation route when feasible; use `pnpm run test:visual` for changes covered by Playwright baselines.

## Documentation Rules

The documentation app aliases `@h0nio/icons`, `@h0nio/ui`, and `@h0nio/ui/icons` to workspace source, so it validates workspace source rather than built registry packages.

- Keep page slugs synchronized with `h0ComponentManifest`.
- Keep prose and page structure in Markdown.
- Keep executable examples in `apps/documentation/src/examples`.
- Render public API sections from typed records through `:::component-api`; do not duplicate handwritten API tables.
- Follow the additional rules in `apps/documentation/AGENTS.md`.

## Versioning and Git Hygiene

- `@h0nio/ui` is currently at `1.2.0`. Patch releases fix behavior, minor releases add compatible API, and breaking supported API changes require a major release.
- Do not add historical migration notes during ordinary development. Record durable architecture in `ARCHITECTURE.md`; add a migration guide only for an actual released breaking change.
- Preserve user changes, keep edits scoped, and avoid unrelated formatting or lockfile churn.
