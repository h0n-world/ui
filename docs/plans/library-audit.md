# Library audit: correctness, cost and optimization

Audit the current maintained workspace: packages/ui, packages/icons and
apps/documentation. Preserve all existing edits; do not publish a release.

1. Establish authoritative baseline with root generation/check/typecheck/test/
   build commands and relevant browser checks. Identify which failures are source
   bugs, stale generated artifacts, incomplete contracts, or missing baselines.
2. Review shared state, SSR, focus/dismissal/positioning, animation and generated
   styles; inspect controls, collection navigation/virtualization, uploads and
   runtime service cleanup. Validate findings with targeted regression evidence.
3. Inspect dependency closure, selective imports, package contents and build-size
   budgets. Measure representative browser workloads and document limitations;
   avoid speculative micro-optimizations or claims from tests that do not cover it.
4. Fix confirmed defects within the existing public contract. Synchronize docs,
   typed records and generated outputs when behavior or API guidance changes.
   Review pre-existing public edits before accepting contract snapshot changes.
5. Re-run affected checks and full integration gates, inspect changed visuals,
   and save a report with severity, evidence, fixes, measured costs and open risks.

Completion means the requested audit areas have current source/runtime evidence,
confirmed actionable defects are fixed or explicitly documented with their impact,
and final verification accurately distinguishes passing checks and limitations.

## Completed verification

The report is saved at docs/audits/library-audit-2026-10-03.md, with original and
optimized table measurements alongside it. Confirmed queue, virtual-list,
positioning, focus, observer, ARIA and styling defects have regression coverage
and compatible fixes. All 55 families' source contract hashes were intentionally
reviewed; the root API, shared types and 140 stable CSS variables are unchanged.

Final root check, typecheck, test and build pass. Tests: 11 icons, 294 UI,
7 documentation/agent; complete Chromium integration: 120/120. Production
consumer fixtures, size budgets, archive validation and generated artifacts pass.
Visual baseline images were inspected before acceptance. The report records
remaining documentation loading cost, client transform cost, adapter-switching
boundary and browser/SSR/accessibility scope; no registry publication was made.
