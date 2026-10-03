import type { H0ComponentManifestEntry } from '../../../../../packages/ui/src/manifest.ts'
import { getManifestMetadata, type ComponentAgentRecordV1, type ComponentAgentRecordWithManifestV1 } from './schema.ts'
import { componentSelectionGuidance, surfaceCompositionGuidance, renderSurfaceTable } from './guidance.ts'

export type GeneratedAgentArtifact = {
    path: string
    content: string
}

export type ComponentAgentCatalogV1 = {
    schemaVersion: 1
    library: {
        name: '@h0nio/ui'
        version: string
    }
    components: ComponentAgentRecordWithManifestV1[]
}

function sortRecords(records: readonly ComponentAgentRecordV1[]) {
    return [...records].sort((first, second) => first.component.localeCompare(second.component))
}

const categoryOrder = ['actions', 'forms', 'navigation', 'overlays', 'feedback', 'data', 'layout', 'content'] as const
const categoryLabels: Record<(typeof categoryOrder)[number], string> = {
    actions: 'Actions',
    forms: 'Forms',
    navigation: 'Navigation',
    overlays: 'Overlays',
    feedback: 'Feedback',
    data: 'Data',
    layout: 'Layout',
    content: 'Content',
}

export function createComponentAgentCatalog(records: readonly ComponentAgentRecordV1[], manifest: readonly H0ComponentManifestEntry[], version: string): ComponentAgentCatalogV1 {
    return {
        schemaVersion: 1,
        library: {
            name: '@h0nio/ui',
            version,
        },
        components: sortRecords(records).map((record) => ({
            ...record,
            manifest: getManifestMetadata(record, manifest),
        })),
    }
}

export function renderLlmsTxt(records: readonly ComponentAgentRecordV1[], manifest: readonly H0ComponentManifestEntry[], version: string) {
    const groupedComponents = categoryOrder
        .map((category) => {
            const components = sortRecords(records)
                .filter((record) => getManifestMetadata(record, manifest).category === category)
                .map((record) => {
                    const metadata = getManifestMetadata(record, manifest)
                    const documentationUrl = `${metadata.docsPath}${metadata.docsAnchor ? `#${metadata.docsAnchor}` : ''}`
                    return `- [${record.component}](${documentationUrl}): ${record.summary}`
                })

            return `### ${categoryLabels[category]}\n\n${components.join('\n')}`
        })
        .join('\n\n')

    return `# H0N UI ${version}

> Self-contained Vue 3.5+ component library with accessible interaction patterns, public design tokens, app-scoped runtime services, and typed APIs.

## Scope and installation

- Install \`@h0nio/ui\` for components; its internal icon dependency is installed automatically.
- Register the default plugin once and import \`@h0nio/ui/style.css\`.
- When application code imports icons, install \`@h0nio/icons\` directly and use individual \`@h0nio/icons/<name>\` subpaths. \`@h0nio/ui/icons\` is a compatibility facade.
- See [Quick Start](/docs/quick-start) for the current plugin and style setup.
- For a new or existing project, give an AI coding agent the versioned [installation prompt](/agents/install-prompt.md).

## Start here

- [Introduction](/docs/introduction)
- [Quick Start](/docs/quick-start)
- [Colors and public CSS variables](/docs/colors)
- [Component selection overview](/components/overview)
- [All Components](/components/all)

## Machine-readable resources

- [Component catalog schema v1](/agent-data/components.v1.json): exact imports, props, events, slots, exposed APIs, public types, examples, accessibility, styling, responsive, performance, use-when, and avoid-when guidance.
- [Consumer AGENTS.md template](/agents/AGENTS.md): reusable implementation rules for projects consuming H0N UI.
- [AI installation prompt](/agents/install-prompt.md): copy-paste workflow for inspecting, installing, configuring, and validating H0N UI in a consumer project.
- [H0N UI Agent Skill](/agents/skills/h0n-ui/SKILL.md): reusable component-selection and composition workflow with a bundled component reference. See [installation](/docs/agents/skills).
- [llms.txt guide](/docs/agents/llms-txt)

Paths in this file are relative to the H0N UI documentation origin. They are not routes in the consuming application.

## Agent workflow

1. Confirm the installed \`@h0nio/ui\` version and inspect its TypeScript declarations.
2. Select a component by interaction semantics, then read its catalog record and documentation page.
3. Use only documented root or package subpath imports, props, events, slots, exposed methods, and \`--h0n-ui-*\` variables.
4. Preserve controlled \`modelValue\` / \`update:modelValue\` behavior; use \`defaultValue\` only for uncontrolled initialization.
5. Preserve accessible names, native semantics, keyboard behavior, focus management, disabled/busy states, and error relationships.
6. Run the consumer project's typecheck, production build, tests, and relevant responsive or visual checks.

## Public package boundaries

- Components and public types: \`@h0nio/ui\`
- Selective components: \`@h0nio/ui/components/<Family>\`
- Global styles: \`@h0nio/ui/style.css\`
- Matching selective styles: \`@h0nio/ui/components/<Family>/style.css\`
- Icon definitions: individual \`@h0nio/icons/<name>\` subpaths (direct application dependency)
- Compatibility icon aliases: \`@h0nio/ui/icons\`
- Public composables: \`@h0nio/ui/composables\` or documented individual composable subpaths
- Runtime services and metadata: \`@h0nio/ui/theme\`, \`@h0nio/ui/locale\`, and \`@h0nio/ui/manifest\`

Do not import \`src\`, \`_shared\`, generated chunks, private selectors, or component-local CSS variables.

## Supported components (${records.length})

${groupedComponents}

## Component selection

${componentSelectionGuidance}

## Nested surfaces

${surfaceCompositionGuidance}

${renderSurfaceTable(records)}

Every component in this index has a synchronized public export, manifest entry, documentation route, and validated typed record. Agent Skill files are generated alongside this index; MCP is planned.
`
}

export function renderInstallPrompt(version: string) {
    return `# Install and configure H0N UI ${version}

You are working in an existing Vue project. Install and configure **@h0nio/ui@${version}** without replacing the project's architecture or introducing a second package manager.

## Your task

1. Read the repository's **AGENTS.md**, contribution instructions, and package scripts before editing.
2. Inspect the existing package-manager lockfile, Vue version, application bootstrap, router/store/plugin chain, stylesheet entry, SSR framework (if any), and current theme, locale, and toast setup.
3. Require Vue 3.5 or newer. If the project is incompatible, explain the conflict and stop instead of forcing a framework upgrade.
4. Use the package manager already selected by the repository. Install exactly **@h0nio/ui@${version}**; do not create another lockfile and do not install **@h0n/icon**.
5. For the standard integration, import the default **H0Nui** plugin from **@h0nio/ui**, import **@h0nio/ui/style.css** exactly once, and add **app.use(H0Nui)** to the existing Vue application chain. Do not create a second app instance or discard existing plugins.
6. Preserve existing product decisions. Add plugin options for theme, animation, density, radius, typography, locale, or toast only when they are already defined by the project or explicitly requested. Otherwise keep the minimal default registration.
7. Use selective imports only when the project explicitly requires them. Import components from **@h0nio/ui/components/Family** and load either the global stylesheet once or the matching **@h0nio/ui/components/Family/style.css**.
8. If application code needs icons, install **@h0nio/icons** directly and import individual **@h0nio/icons/<name>** subpaths. Treat **@h0nio/ui/icons** as compatibility-only. Never import package **src**, **_shared**, Vue implementation files, generated chunks, or undeclared deep paths.
9. Do not modify product UI merely to add a demo unless requested. If a smoke example is requested, use public components and remove any temporary test surface that should not ship.
10. Run the repository's real typecheck and production build, plus relevant tests. Verify that the package version is correct, the stylesheet is loaded once, the existing plugin chain remains intact, and no unrelated lockfile or formatting churn was introduced.

## Expected standard bootstrap shape

Adapt this to the existing application entry; do not recreate working bootstrap code:

~~~ts
import H0Nui from '@h0nio/ui'
import '@h0nio/ui/style.css'

// Keep the existing createApp instance and all existing plugins.
app.use(H0Nui)
~~~

If the application already has explicit appearance or service requirements, pass only those known values:

~~~ts
app.use(H0Nui, {
    animation: 'high',
    density: 'default',
    radiusSize: 'lg',
    theme: 'system',
    typographySize: 'md',
})
~~~

## Public references

When you know the H0N UI documentation origin, resolve these paths against that origin rather than the consumer application:

- **/llms.txt** — compact versioned index and supported package boundaries.
- **/agent-data/components.v1.json** — exact component APIs and implementation guidance.
- **/agents/AGENTS.md** — reusable rules for future H0N UI work in the project.
- **/agents/skills/h0n-ui/SKILL.md** — reusable skill; follow **/docs/agents/skills** to install it when requested.
- **/docs/quick-start** — human-readable setup and plugin options.

The installed package's TypeScript declarations are the executable contract. If documentation and the installed version differ, follow the installed version or align the package version deliberately before implementation.

For subsequent UI work, inspect the supported component catalog before using native controls: prefer H0Select for a known option list, H0Input for text, and H0Textarea for multiline text when their capabilities fit. On a default surface H0Card, normally set these controls to variant="secondary" so they remain visually distinct. On a secondary card, normally use surface controls. H0InputOTP already defaults to secondary. See /agents/AGENTS.md and /agents/skills/h0n-ui/SKILL.md for contextual rules and exceptions.

## Completion report

Report:

- the package manager and installed H0N UI version;
- every file changed and why;
- where the plugin and stylesheet are registered;
- any plugin options selected and the project requirement that justified them;
- every validation command and its result;
- any incompatibility or decision still requiring the developer.

Do not claim completion when typecheck or build fails. Distinguish pre-existing failures from failures caused by your changes.
`
}

export function renderPublicAgentsTemplate(version: string, records: readonly ComponentAgentRecordV1[] = []) {
    return `# H0N UI Consumer Agent Instructions

These instructions apply to projects consuming \`@h0nio/ui\` ${version}. Merge them with the consuming repository's own instructions; repository-specific architecture and commands take precedence.

## Contract authority

Use sources in this order:

1. The installed \`@h0nio/ui\` package version and TypeScript declarations are the executable contract.
2. \`/agent-data/components.v1.json\` on the H0N UI documentation origin provides versioned component guidance and exact API metadata.
3. \`/llms.txt\` on that same origin is the compact documentation and component index.
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
3. Read the target component record: \`useWhen\`, \`avoidWhen\`, imports, props, events, slots, exposed API, public types, examples, and related components.
4. Check whether the application already has a shared composition that should be reused.

## Imports and styles

- Use \`@h0nio/ui\` for root components, public helpers, and types.
- Import \`@h0nio/ui/style.css\` exactly once when using the root package.
- For selective imports, use \`@h0nio/ui/components/<Family>\` and either the global stylesheet or the matching \`@h0nio/ui/components/<Family>/style.css\`.
- Install \`@h0nio/icons\` when application code imports icon definitions, then use individual \`@h0nio/icons/<name>\` subpaths. Do not import \`@h0nio/icons/all\` or its catalog in product runtime code.
- Use \`@h0nio/ui/icons\` only when maintaining code written against the compatibility aliases. Do not add or reference \`@h0n/icon\`.
- Use documented composable, theme, locale, and manifest subpaths only.
- Never import package \`src\`, \`_shared\`, generated chunks, Vue implementation files, or undeclared deep paths.
- Prefer props and public \`--h0n-ui-*\` variables. Component-local variables and internal class names are not API.

## State and events

- Preserve \`modelValue\` / \`update:modelValue\` for controlled state.
- Use \`defaultValue\` only for uncontrolled initialization.
- In Vue templates use kebab-case for multi-word props and events; in TypeScript use their declared camelCase names.
- Treat \`update:*\` as state synchronization. Use documented action or \`change\` events for user intent.
- Do not invent props, events, slots, methods, types, CSS variables, or locale sections.
- Forward native and ARIA attributes through documented component surfaces rather than targeting internal DOM.

## Component selection

${componentSelectionGuidance}

- Select by semantics and interaction model, not visual similarity.
- Use native links or \`H0Link\` for navigation and \`H0Button\` for actions.
- Use checkbox/switch/radio/segment/select according to boolean, immediate-setting, single-choice, or option-picker semantics.
- Use \`H0Alert\` for persistent feedback, toasts for transient feedback, and modal overlays only for focused or blocking workflows.
- Use \`H0Table\` for presentation and \`H0DataTable\` only when sorting, filtering, selection, pagination, loading, or virtualization is required.
- Do not use removed, undocumented, or planned components even if old examples or model knowledge mention them.

## Nested surfaces

${surfaceCompositionGuidance}

${renderSurfaceTable(records)}

## Icon sources

- \`H0IconSource\` accepts legacy node-based \`H0IconDefinition\` values and trusted body definitions from \`@h0nio/icons\`.
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
`
}

export function renderAgentSkill(records: readonly ComponentAgentRecordV1[], version: string) {
    return `---
name: h0n-ui
description: Build and edit Vue interfaces using @h0nio/ui, select supported H0 components, and compose nested surfaces with documented variants. Use when a project uses H0N UI or the user requests it.
---

# H0N UI

This skill targets @h0nio/ui ${version}. Respect the consuming repository's instructions, existing wrappers, package manager, and requested scope.

## Establish the contract

Inspect the installed package version and TypeScript declarations first. If the version differs, use matching resources or the installed declarations; do not silently upgrade. Inspect the existing plugin and stylesheet setup. For requested installation, use the version-matching installation prompt on the documentation site; preserve the existing Vue app and register styles and services once.

Read [references/components.md](references/components.md) to discover supported components and their use/avoid guidance. For exact imports, props, events, slots, and types, read the target record in /agent-data/components.v1.json and the linked component page, resolving paths against the H0N UI documentation origin recorded in the consuming project. If the origin is unknown, obtain it from the user or project configuration; do not guess a host or resolve paths against the consumer app. The bundled reference remains usable offline; installed declarations take precedence over remote metadata.

## Select and compose

${componentSelectionGuidance}

## Choose nested backgrounds

${surfaceCompositionGuidance}

${renderSurfaceTable(records)}

## Implement and verify

Use documented @h0nio/ui root or component-family imports and public --h0n-ui-* tokens. Never import src, _shared, generated chunks, or private selectors. Use individual @h0nio/icons/<name> imports with a direct dependency when application code needs icons.

Preserve modelValue/update:modelValue for controlled state and defaultValue for uncontrolled initialization. Check the exact component API before using change events, native/ARIA attribute routing, slots, or methods. Retain labels, hints/errors, keyboard interaction, and overlay focus behavior. Do not invent props or replace missing capabilities with imaginary components.

Run the consumer's relevant typecheck, build, and behavior checks. Inspect the composed surfaces in light/dark themes and narrow/wide layouts when feasible. Report which checks ran and any version, capability, or verification gaps.
`
}

export function renderSkillComponentReference(records: readonly ComponentAgentRecordV1[], manifest: readonly H0ComponentManifestEntry[], version: string) {
    return `# Supported H0N UI components (${version})\n\nPaths below are relative to the H0N UI documentation origin. Exact APIs are in /agent-data/components.v1.json.\n\n${sortRecords(records).map((record) => {
        const metadata = getManifestMetadata(record, manifest)
        return `## ${record.component}\n\n${record.summary}\n\n- Documentation: ${metadata.docsPath}${metadata.docsAnchor ? `#${metadata.docsAnchor}` : ''}\n- Use: ${record.useWhen.join(' ')}\n- Avoid: ${record.avoidWhen.join(' ')}`
    }).join('\n\n')}\n`
}

export function renderAgentArtifacts(records: readonly ComponentAgentRecordV1[], manifest: readonly H0ComponentManifestEntry[], version: string): GeneratedAgentArtifact[] {
    const catalog = createComponentAgentCatalog(records, manifest, version)

    return [
        { path: 'llms.txt', content: renderLlmsTxt(records, manifest, version) },
        { path: 'agent-data/components.v1.json', content: `${JSON.stringify(catalog, null, 2)}\n` },
        { path: 'agents/AGENTS.md', content: renderPublicAgentsTemplate(version, records) },
        { path: 'agents/install-prompt.md', content: renderInstallPrompt(version) },
        { path: 'agents/skills/h0n-ui/SKILL.md', content: renderAgentSkill(records, version) },
        { path: 'agents/skills/h0n-ui/references/components.md', content: renderSkillComponentReference(records, manifest, version) },
    ]
}
