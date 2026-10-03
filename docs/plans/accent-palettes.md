# Accent palettes

## Architecture and scope

The app-scoped `theme.ts` service owns appearance. `_palettes.scss` owns raw
colors and `_theme.scss` maps them to the stable semantic CSS tokens. The
documentation app uses workspace source. Existing user edits stay in place.

## Implementation

1. Add independent `accent: default | telegram | uber` configuration, readonly
   state, and `setAccent`; apply `data-h0n-accent` to the same target as the theme.
2. Keep Default colors unchanged. Add light/dark surface, text, border, focus,
   and primary colors for Telegram and Uber. Keep status colors independent of
   the primary foreground, especially for Uber's white primary in dark mode.
3. When theme persistence is enabled, store accent under `<storageKey>:accent`.
   Projects can disable storage and configure accent directly.
4. Add a labeled palette selector to the documentation Header. Document the
   configuration and runtime API in Colors, README, and ARCHITECTURE.
5. Review the additive public export change and update its contract hash.

## Validation

Run service tests for isolation, persistence, SSR, and system-theme changes;
typecheck and build both maintained surfaces; regenerate documentation outputs;
inspect all six combinations and narrow Header layout in the browser. Verify
primary foreground contrast and status/colored avatar independence.

## Contract review

The root API adds only `H0AccentName`; existing exports and stable token names
are retained. Alert status action text and Avatar gradient text no longer derive
their foreground from the primary accent. The component snapshot includes these
two reviewed changes against HEAD. It deliberately excludes pre-existing edits
in Card, Field, FileUpload, Layout, Skeleton, and Tabs, which require their own
contract review. Consequently the full working-tree freeze check still reports
those earlier local edits rather than silently accepting them here.

## Verification results

- UI and documentation typechecks and production builds pass. UI consumer
  fixtures, package contents, and bundle/CSS size budgets pass.
- Five accent service tests pass; the complete UI suite has 210 passing tests
  and one freeze failure from the pre-existing local component edits described above.
- Eight browser checks pass across six palette/mode combinations, primary text
  contrast, status foreground independence, mobile Header, keyboard selection,
  and persistence. All six rendered combinations were visually inspected.
- Documentation agent generation/check and all seven generator tests pass;
  generation produces no changed artifacts for the prose/API additions here.
- Root typecheck stops at the pre-existing stale icons names/catalog outputs.
  Existing Form/Modal/Toast screenshot comparisons cannot run successfully
  because their baseline PNG files are absent. Automatically produced baselines
  were removed rather than accepted as reviewed reference images.
