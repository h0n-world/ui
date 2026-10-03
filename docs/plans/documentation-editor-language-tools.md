# Documentation editor: focused component workspace and language tools

Status: implemented locally; publication remains outside this task.

## Scope

- Exactly two editable files: `App.vue` and `style.css`. No add/delete/rename file controls. Inject style.css automatically into the preview.
- Preserve v1 drafts under the old key. New v2 drafts use a new key. Accept only the two-file shape for new project imports; explain incompatible legacy multi-file imports rather than dropping their code.
- CodeMirror editor: Vue template/script/style highlighting, CSS highlighting, indentation, completion and diagnostic markers.
- A dedicated local browser worker uses Vue language-core virtual TypeScript code, source maps and TypeScript's language service. Check script types and template expressions/component props against actual declarations; do not represent transpilation as type checking.
- Serve language-tool declarations locally, generated from the current UI source and dependency declarations. No CDN fetching or new preview dependencies.
- H0Select controls for preview theme, width and sample selection; H0Button for actions. Fixed file tabs.
- Sample loading replaces App.vue only after explicit confirmation. JSON export/import and manual Run remain.

## Verification

Two-file validation, imports and diagnostics/completion regression tests; current H0N UI declarations; worker/browser checks for incorrect TS assignment, invalid component props, template expressions, script completion and CSS completion. Draft persistence, sample load, responsive layout and preview isolation. Documentation typecheck, agents tests and production build plus built-worker smoke check.

Preserve unrelated working-tree changes. No UI public API/version changes, publishing or backend changes.

## Results

- CodeMirror handles both fixed files, completion, highlighting and source navigation from diagnostics.
- Semantic Vue/TS checking uses actual source-generated H0N UI declarations, including globally registered components. Native forwarded event attributes are reflected in the editor's type environment.
- Worker initialization is acknowledged; dependency prebundling avoids first-load dev worker failures. Worker errors and request timeouts are visible, and stale responses are ignored.
- Unit suite: 19 compiler/random/language-service checks. Browser suite covers the two-file boundary, draft/export/import behavior, runtime isolation, H0Select controls, TS/template/prop diagnostics, completion, samples and responsive/theme behavior.
- Built production worker verified for semantic diagnostics and TS/prop/CSS completion. Documentation build/typecheck and 7 agent tests pass without regenerating already-current agent artifacts.
