# Library audit, 2026-10-03

Scope: current working tree of `packages/ui`, `packages/icons`, and
`apps/documentation`. The published registry tarball is not the source inspected
by this audit, and no release or deployment is performed. Existing work is kept.

## Confirmed findings and corrections

| Area | Impact before correction | Evidence and correction |
| --- | --- | --- |
| FileUpload concurrency | Lowering the limit below the running count starts additional tasks because a negative slice end includes pending items. NaN stalls the queue; Infinity starts everything. | Regression reproduced. Clamp capacity to zero, normalize the limit to a finite positive integer. |
| FileUpload retry | Retrying a running item starts a duplicate adapter and overwrites its abort controller. | Regression reproduced. Running-item retries are ignored. |
| FileUpload lifecycle | An adapter finishing after unmount starts pending transfers. A cleared old queue decrements the new queue's running count. Aborted adapters resolving normally emit success. | Regression reproduced. Generation and membership checks protect progress/results and accounting; unmount stops pumping; abort resolves as cancellation. |
| FileUpload validation | Concurrent async selections overwrite each other and evade count limits; pending validation resurrects cleared files; validator rejection escapes as an unhandled promise; disabled drop still mutates state. | Regression reproduced. Serialize selections, guard stale state/lifetime/disabled state, report rejected validation as custom invalid input, connect native input to validation messages. |
| Animation CSS | Vue's scoped compiler drops component targets following a partial `:global()` selector, producing a rule on the appearance root. | Compiler-level reproduction for Alert, Skeleton, Spinner. Use ordinary ancestor selectors with component scope on the target. |
| Icon generated entries | Root typecheck/test stopped at stale names/catalog. Catalog and manifest already contain additive search tags absent from metadata input. | Verified 75 additive tag changes, identical remaining metadata, names and catalog syntax; transferred tags to metadata and restored exact generator output. All 3769 modules/SVGs pass generation and safety validation. |
| DataTable transform cost | Repeated accessor calls and locale-aware string comparison setup in sort, repeated filter preparation per row. | Same-browser measurements below. Resolve sort keys once per row, reuse an Intl.Collator, prepare filters once, bypass inactive filtering; custom comparators own their values. |
| DataTable virtual window | Shrinking a deeply scrolled dataset renders no rows. Invalid row heights produce empty output. Viewport growth is not observed before scrolling. | Unit and browser reproduction. Clamp the window, disable invalid virtualization, observe the real viewport only while virtualization is enabled, disconnect on unmount. |
| DataTable selection | Header selection reindexes rows after removing non-selectable rows, creating keys different from the individual row controls. | Regression reproduced with row-plus-index callback. Resolve keys at the original selection-list index. |
| Skeleton metadata | Agent API documented md radius while current source defaults to xl. | Reviewed existing visual default; synchronized the typed record. |
| Field horizontal geometry | Label sits in the feedback column and the control moves to a separate row. | Browser reproduction. Explicit label/control columns and first row; LTR/RTL alignment check passes. |
| Card border CSS | The existing border-removal change uses `none` as a border color, making the entire declaration invalid. | Preserve its intended borderless default with zero width and a valid transparent color; outline keeps one pixel. |
| Floating lifecycle | Older async positioning results overwrite newer positions or apply after close/unmount. Anchor/option changes do not restart observers. | Three deterministic lifecycle regressions; generation guards and reactive rebinding protect Dropdown/Tooltip positioning and size writes. |
| Select virtualization/lifecycle | A shrunk scrolled list can go blank; invalid row heights break rendering; selected distant options are absent on opening; relative CSS heights are parsed as pixel counts. | Unit and browser checks. Clamp/normalize virtual geometry, use measured viewport, restore active-option visibility, retain CSS length units, guard async disclosure/positioning and close on disabled state. |
| Composite ARIA forwarding | Shared H0Interactive overwrites forwarded role/tabindex/aria-disabled with its defaults. Select options therefore lose their option role. | Preserve supplied native/ARIA attributes; open list passes axe; Select options stay outside the Tab order while the combobox manages focus. |
| Select manual scrolling | Position recomputation on viewport resize returns a manually scrolled list to its selected option. | Browser reproduction: scrollTop jumps from 1000 to 17324. Scroll the active item on initial measurement and keyboard navigation, rather than every position update. |
| Overlay focus/lifecycle | CSS-hidden ancestors and hidden autofocus controls are included in initial focus candidates; delayed focus work can survive a disclosure change. | Hidden-control regressions and lifecycle guards. Cache computed ancestor styles per candidate scan; ignore hidden autofocus and stale next-tick work. |
| InfiniteScroll lifecycle | Queued callbacks from a replaced observer request new data; observeOnMount changes leave the old observer running. | Mocked observer reproduction. Track observer generations and disposal; observe runtime changes and disconnect on unmount. |
| Toast rendering bounds | maxVisible=0, NaN and Infinity render every service item; negative values slice a different subset instead of hiding it. | Four regressions. Floor finite values, clamp to zero, use default four for non-finite input. Service items remain intact. |
| FileUpload SSR | Node supports URL.createObjectURL, so SSR allocates preview URLs without a browser lifecycle to revoke them. | Actual Node-environment SSR regression. Allocate browser previews only when window exists. |
| Visual release gate | Baseline files were absent, Layout selector stale, and the supposed one-row snapshot actually captured loading state. | Inspect all generated images; fix selector; add an actual one-row example plus a separate loading baseline. All four visual baseline scenarios pass. |

No public component, prop, event, dependency, or stable CSS variable was added by
these audit fixes. Documentation describes the corrected queue and virtual-table
behavior; generated agent artifacts are rebuilt from their sources.

## Browser workload measurement

Chromium 149 on this Windows host, documentation source-linked development
component. Deterministic row names `(id * 7919) % count`, one text column, client
mode, 10 rendered rows with page pagination. Measurement includes component
mount, client transforms, next Vue tick and forced layout. One warm-up plus five
samples; values below are medians. No hardware normalization or production/mobile
performance claim is implied.

| Rows / workload | Before, ms | After transform optimization, ms |
| --- | ---: | ---: |
| 10,000 / plain | 9.0 | 6.0 |
| 10,000 / natural string sort | 414.7 | 39.1 |
| 10,000 / text filter + sort | 54.5 | 10.0 |
| 50,000 / plain | 36.2 | 21.7 |
| 50,000 / natural string sort | 2833.9 | 283.7 |
| 50,000 / text filter + sort | 553.3 | 86.3 |

Raw samples: `data-table-benchmark.before.json` and
`data-table-benchmark.after.json`. The after samples precede the later virtual
window correction; the workload uses page pagination and exercises the same
transform path. Reproduce against the running source documentation server with
`node packages/ui/scripts/benchmark-data-table.mjs`; override
`H0N_DOCUMENTATION_URL` when using another origin. This is a diagnostic, not a
fixed timing gate.

## Priorities and coverage

Highest-priority correctness findings are upload queue accounting/lifetime,
blank virtual lists after data changes, and lost Select option semantics. The
remaining focus, observer, animation, layout and generated-contract findings are
medium-priority behavior/maintenance issues. Metadata drift and missing baseline
assets are verification gaps, not evidence of a security exploit.

Runtime review covers app-scoped theme/locale/toast ownership, motion sampling
cancellation, shared scroll-lock reference counts, focus/dismissal and async
floating positioning, form controls, collection navigation, table/select windows,
upload validation/concurrency, and observer/timer disposal. Existing runtime and
service tests plus new regressions exercise these boundaries. Node SSR tests
render ten runtime-heavy families without browser globals, twice with identical
output, and separately reject SSR preview allocation.

The reviewed public contract retains the root API, shared types and all 140
stable CSS variables. Source hashes include intentionally reviewed existing
formatting/default-style changes and the audit's compatible behavior fixes.
Consumer fixtures verify selective dependency/style closure, declarations and
archive exports. Visual baselines were inspected before acceptance; loading and
one-row table cases are separate.

## Build and loading costs

The final UI production build passes its existing size gates. Selected gzip
measurements: root Button consumer 2.78 KiB JS; TextShimmer 0.50 KiB JS;
DataTable consumer 18.69 KiB JS; FileUpload consumer 8.13 KiB JS; integration
consumer 63.58 KiB JS / 24.18 KiB CSS. Full UMD is 73.42 KiB gzip, full library
CSS 23.04 KiB gzip. The archive contains 506 files, 55 component subpaths and
11 individual composables. No new dependency or relaxed budget was required by
the audit fixes.

Documentation still loads all executable examples and raw example source eagerly
through src/content/examples.ts. Its production entry is 1488.14 kB raw /
406.68 kB gzip. The separately loaded icon catalog is 4187.62 kB raw / 821.08 kB
gzip and contains the complete icon collection. This catalog cost does not apply
to selective library icon imports. A useful next optimization is lazy-loading
documentation examples/source by route; retain searchable example metadata and
the generated agent records. The build's large-chunk warning remains visible.

## Verification

- Icons: generation and SVG safety check pass for 3769 icons; 11 unit tests pass.
- Root check and root production build pass, including SVG safety, source
  generation consistency, declarations, consumer fixtures, size budgets, archive
  validation and documentation artifact consistency.
- Final root typecheck passes for icons, UI source, DTS/consumer fixtures and
  documentation. Root tests pass: 11 icon tests, 294 UI tests across 48 files,
  and 7 documentation/agent tests. The public-contract freeze check passes.
- Complete Chromium suite passes: 120/120 scenarios, including palette controls,
  accessibility, motion profiles/software rendering, responsive/RTL layouts,
  nested overlays, selected virtual options, manual scroll preservation, table
  geometry, navigation, icon catalog and all visual baselines.
- The Select stress scenario completes 100 open/Escape cycles in 18558.5 ms with
  no mounted popover/overlay remaining. This includes automation overhead and
  is a DOM cleanup check, not proof of zero retained heap allocations.
- Generated artifacts match source records/pages; git diff --check passes.
  Builds completed before the full test runs. Earlier transient errors caused
  by concurrent icon regeneration were excluded and the full stable run repeated.
  The visual launcher reported a failed extra bind to port 5201 and used the
  already running source documentation server; all scenarios completed there.

## Limits and remaining optimization opportunities

This is source/worktree validation, not inspection of the published npm tarball
or a release approval. Firefox/WebKit were not run on this Windows setup. The
browser accessibility checks cover structural violations; they are not a full
manual assistive-technology review or a contrast matrix for every component.
Palette contrast checks cover primary colors and TextShimmer endpoints.
Heap profiling and exhaustive browser/platform coverage were not performed.

Large client tables still sort/filter on the UI thread. Use server mode for
datasets whose measured cost exceeds the application's interaction budget;
virtualization bounds rendered DOM, not client transform cost. Benchmark numbers
are host-specific and do not establish a mobile or production service-level bound.

Upload adapters must settle and honor cancellation. Changing/removing the upload
adapter during a pending batch is not a tested supported workflow: removing it
can leave idle items and a pending start promise until clear/reset or an explicit
restart with an adapter. Keep the adapter stable for a batch; clear/reset before
switching it. This remaining boundary was identified from pump/waiter source
inspection, rather than a browser adapter-switching test.

No audit can exclude every possible defect. The report records the inspected
scope, corrected findings, measured costs and concrete verification limits.
