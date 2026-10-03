# Documentation editor v1

Status: implemented as an experimental local prototype; no publication or production decision in this task.

## Architecture

- Dedicated lazy `/editor` route and header navigation, outside Markdown article layout.
- Browser compiler for Vue SFCs and TypeScript; virtual flat `.vue`, `.ts`, `.css` files with mandatory `App.vue`.
- Text editor with accessible file controls, explicit Run, reset, sample selection, JSON import/export, local versioned draft.
- A separately bundled preview runtime containing current workspace Vue, UI and the compatibility icon facade, with its own Vue app and appearance service.
- Opaque-origin iframe (`sandbox="allow-scripts"`), CSP denying network/resources except inline styles and data images. No same-origin permission, forms, popups or top navigation.
- Only local virtual files and fixed `vue`, `@h0nio/ui`, `@h0nio/ui/icons` imports; no package installation, CDN or dynamic imports.
- Each Run replaces the preview; messages are validated by iframe source and per-run token. Compiler/runtime errors are visible.

## Boundaries

Code-based composition only. No drag-and-drop designer, accounts, cloud storage, remote assets, npm installs, SCSS, full IDE type checking or shared links. Syntax compilation is not full TS type checking. Native textarea is an initial editor surface.

Iframe isolation does not guarantee recovery from CPU-heavy/infinite-loop code. Use trusted local drafts during evaluation; production readiness requires a separate review, including execution budgets and hosting CSP.

## Verification

Compiler/resolver and isolation regression tests; documentation typecheck, agent generation/check/test and production build. Browser smoke checks for execution, multi-file state, local persistence, blocked imports/network, runtime errors, theme and responsive layout when feasible.

Preserve existing working-tree edits. Regenerate agent artifacts only through their generator. Do not change the UI public API or its release version.

## Results

- Documentation typecheck and production build passed; generated agent artifacts already match their inputs, with all 7 agent tests passing.
- 10 compiler/project tests and 3 Chromium interaction/isolation tests passed.
- Built production assets also executed the starter and its counter interaction in Chromium.
- Desktop and 390px mobile layouts inspected. The new compiler is lazy loaded and is currently about 1.2 MB gzip; the preview runtime is about 369 KB JS plus 169 KB CSS before compression.
- No new runtime dependencies, package installation or library API changes were needed. The Vue compiler browser entry is resolved from Vue's own compiler dependency to keep versions aligned.
