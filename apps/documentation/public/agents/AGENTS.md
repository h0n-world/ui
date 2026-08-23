# H0N UI Consumer Agent Instructions

These instructions apply to projects consuming `@h0nio/ui` 1.2.0. Merge them with the consuming repository's own instructions; repository-specific architecture and commands take precedence.

## Contract authority

Use sources in this order:

1. The installed `@h0nio/ui` package version and TypeScript declarations are the executable contract.
2. `/agent-data/components.v1.json` on the H0N UI documentation origin provides versioned component guidance and exact API metadata.
3. `/llms.txt` on that same origin is the compact documentation and component index.
4. Human documentation pages and executable examples explain composition and intent.

The leading-slash resource paths above are relative to the H0N UI documentation site, not the consuming application. When copying this template, record that documentation origin in the local project instructions.

## Initial installation

- For a fresh integration, start from **/agents/install-prompt.md** on the H0N UI documentation origin.
- Preserve the repository's existing package manager and lockfile; require Vue 3.5 or newer.
- Install the intended **@h0nio/ui** version, import **@h0nio/ui/style.css** exactly once, and register the plugin on the existing Vue app instance.
- Do not replace an existing router, store, plugin chain, stylesheet pipeline, theme service, locale service, or toast configuration.
- Use minimal plugin defaults unless the project defines explicit appearance or service requirements.

## Before editing UI

1. Inspect the existing app entry, plugin registration, stylesheet imports, theme/locale/toast configuration, and local wrapper conventions.
2. Confirm the installed library version; do not assume documentation for another version is compatible.
3. Read the target component record: `useWhen`, `avoidWhen`, imports, props, events, slots, exposed API, public types, examples, and related components.
4. Check whether the application already has a shared composition that should be reused.

## Imports and styles

- Use `@h0nio/ui` for root components, public helpers, and types.
- Import `@h0nio/ui/style.css` exactly once when using the root package.
- For selective imports, use `@h0nio/ui/components/<Family>` and either the global stylesheet or the matching `@h0nio/ui/components/<Family>/style.css`.
- Import the small built-in icon set from `@h0nio/ui/icons`. Do not add or reference `@h0n/icon`.
- Use documented composable, theme, locale, and manifest subpaths only.
- Never import package `src`, `_shared`, generated chunks, Vue implementation files, or undeclared deep paths.
- Prefer props and public `--h0n-ui-*` variables. Component-local variables and internal class names are not API.

## State and events

- Preserve `modelValue` / `update:modelValue` for controlled state.
- Use `defaultValue` only for uncontrolled initialization.
- In Vue templates use kebab-case for multi-word props and events; in TypeScript use their declared camelCase names.
- Treat `update:*` as state synchronization. Use documented action or `change` events for user intent.
- Do not invent props, events, slots, methods, types, CSS variables, or locale sections.
- Forward native and ARIA attributes through documented component surfaces rather than targeting internal DOM.

## Component selection

- Select by semantics and interaction model, not visual similarity.
- Use native links or `H0Link` for navigation and `H0Button` for actions.
- Use checkbox/switch/radio/segment/select according to boolean, immediate-setting, single-choice, or option-picker semantics.
- Use `H0Alert` for persistent feedback, toasts for transient feedback, and modal overlays only for focused or blocking workflows.
- Use `H0Table` for presentation and `H0DataTable` only when sorting, filtering, selection, pagination, loading, or virtualization is required.
- Do not use removed, undocumented, or planned components even if old examples or model knowledge mention them.

## Icons

- `H0IconDefinition` is a structural type owned by `@h0nio/ui`; applications may define compatible icons locally.
- Use `@h0nio/ui/icons` only for the small common system set.
- Prefer a documented icon or visual slot when passing an existing Vue icon component or inline SVG.
- Icon-only controls require an accessible name on the control; an SVG title alone is insufficient.

## Accessibility and interaction

- Preserve semantic elements, accessible names, label/control relationships, hints, errors, disabled state, and busy state.
- Preserve documented keyboard models for composite widgets.
- Overlays must retain initial focus, focus containment, Escape behavior, scroll locking, and focus restoration supplied by the component.
- Keep focus-visible styling and test keyboard-only operation.
- Consider RTL, forced colors, reduced motion, SSR/hydration, and cleanup of listeners or observers where relevant.

## Responsive and styling work

- Prefer component props and shared tokens before adding local CSS.
- Verify narrow and wide layouts and text growth; do not rely on one desktop screenshot.
- Do not style undocumented internal DOM or copy component implementation CSS into the application.
- Use public color, spacing, radius, typography, control, overlay, table, scrollbar, motion, and layer tokens where applicable.

## Validation

After UI changes, run the consuming project's actual:

- typecheck;
- production build;
- unit or integration tests covering changed behavior;
- keyboard/accessibility checks for interactive work;
- responsive and relevant visual smoke tests.

Do not claim compatibility from a rendered screenshot alone. MCP Server and distributable Agent Skills are planned and must not be described as currently available.
