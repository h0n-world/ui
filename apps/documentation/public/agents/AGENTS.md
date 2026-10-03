# H0N UI Consumer Agent Instructions

These instructions apply to projects consuming `@h0nio/ui` 1.3.0. Merge them with the consuming repository's own instructions; repository-specific architecture and commands take precedence.

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
- Install `@h0nio/icons` when application code imports icon definitions, then use individual `@h0nio/icons/<name>` subpaths. Do not import `@h0nio/icons/all` or its catalog in product runtime code.
- Use `@h0nio/ui/icons` only when maintaining code written against the compatibility aliases. Do not add or reference `@h0n/icon`.
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

Select by semantics and interaction model. Search the supported component index before creating a native control or a custom replacement. In a project using H0N UI, prefer the supported component when it meets the requirement; keep native HTML when the product explicitly needs native behavior or the library lacks the capability. Do not replace existing native controls outside the requested scope.

| Requirement | Component to inspect |
| --- | --- |
| Known options, single or multiple choice | H0Select |
| Ordinary text / multiline text | H0Input / H0Textarea |
| Password / number / search / one-time code | H0PasswordInput / H0NumberInput / H0SearchField / H0InputOTP |
| Boolean / immediate setting / one of a few choices | H0Checkbox / H0Switch / H0RadioGroup |
| Action / navigation | H0Button / H0Link |
| Grouped content / field layout / form validation | H0Card / H0Field / H0Form |
| Presentation table / managed data interactions | H0Table / H0DataTable |

H0Select takes an options array and a controlled model; read its record for H0SelectOption and H0SelectValue instead of nesting native option elements. It is not a free-text combobox. Use the index for other needs and inspect useWhen, avoidWhen, props, slots, and examples before implementing. Do not invent planned components.

- Select by semantics and interaction model, not visual similarity.
- Use native links or `H0Link` for navigation and `H0Button` for actions.
- Use checkbox/switch/radio/segment/select according to boolean, immediate-setting, single-choice, or option-picker semantics.
- Use `H0Alert` for persistent feedback, toasts for transient feedback, and modal overlays only for focused or blocking workflows.
- Use `H0Table` for presentation and `H0DataTable` only when sorting, filtering, selection, pagination, loading, or virtualization is required.
- Do not use removed, undocumented, or planned components even if old examples or model knowledge mention them.

## Nested surfaces

Choose the background variant from the actual enclosing surface, not from the component name or nesting depth. Where a distinct card or control boundary is intended:

- On --h0n-ui-color-surface, use variant="secondary" for components listed below.
- On --h0n-ui-color-secondary, use variant="surface".
- On a page background or a custom background, inspect the actual tokens and rendered result before choosing. Transparent containers inherit the visible background behind them.
- A default H0Card is surface: its H0Input, H0Textarea, H0Select and other listed controls should normally be secondary. A secondary card normally uses surface controls. A card on a surface section should normally be secondary.
- H0InputOTP already defaults to secondary; retain it on surface and choose surface on secondary.
- For H0Checkbox and H0Radio this controls the unchecked indicator background; checked states retain their semantic color. For H0Select and H0Command it controls the trigger, not the popup. Alert tone is independent of its container variant.
- Preserve an explicitly requested flat appearance. Prefer the documented variant over overriding private background variables. These variants distinguish layers; they do not guarantee text contrast under custom theme overrides.
- Do not apply this rule to unrelated variant names such as H0Button primary/secondary or H0Typography variants. Teleported content has its own enclosing surface.

Example with a non-interactive card (name is a string model and country is a H0SelectValue or null):

~~~vue
<H0Card padding>
    <H0Input v-model="name" label="Name" variant="secondary" />
    <H0Select v-model="country" label="Country" variant="secondary"
        :options="[{ label: 'Ukraine', value: 'ua' }]" />
</H0Card>
~~~

Verify light and dark themes, focus, invalid and disabled states, and narrow layouts. Do not put form controls inside an interactive card.

| Component | Default variant | surface background | secondary background |
| --- | --- | --- | --- |
| H0Alert | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Card | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0CellColorPicker | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Checkbox | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Command | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0FileUpload | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Input | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0InputOTP | secondary | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0NumberInput | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0PasswordInput | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Radio | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0SearchField | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Select | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Textarea | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |

## Icon sources

- `H0IconSource` accepts legacy node-based `H0IconDefinition` values and trusted body definitions from `@h0nio/icons`.
- Never build a body definition from user input, network HTML, or another untrusted source.
- Legacy stroke props do not override the authored geometry of body definitions.
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

Do not claim compatibility from a rendered screenshot alone. The reusable H0N UI skill is at /agents/skills/h0n-ui/SKILL.md; installation instructions are at /docs/agents/skills. MCP Server remains planned.
