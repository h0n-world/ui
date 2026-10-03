# Animation quality

## Scope and architecture

Extend app-scoped theme appearance with `off | low | medium | high | recommended`.
Retain the existing `low` default. A private controller owns recommendation,
system preference listeners, and bounded browser sampling; the public
`useH0Animation` composable exposes the same state used by the library.

The requested setting and effective quality are separate. System reduced motion
always resolves to `off`, including for manual `high`. SSR Recommended starts at
`low`; resource/graphics probes and frame sampling start after mount. No device
fingerprint, renderer string, measurement, or recommendation is persisted or sent.

## Quality behavior

- Off: zero transitions/keyframes, no ripple or carousel autoplay; controls,
  overlays, loading indicators, focus and cleanup still work.
- Low: short feedback transitions, static loading indicators, no decorative loops.
- Medium: standard transitions and simple loading rotations; no ripple/shimmer
  or animated backdrop blur.
- High: full existing motion, ripple/shimmer, and rich overlay motion.
- Recommended: uses the controller's concrete quality, never a CSS pseudo-level.

## Recommendation policy

Reduced motion wins. Low CPU/memory hints or Save-Data cap at low; moderate
resources cap at medium. Check WebGL major performance caveat/software renderer
when permitted and immediately release the context. Unavailable/hidden graphics
information cannot prove hardware acceleration; use conservative fallback.
Measure a bounded foreground rAF window after warm-up, combine frame cadence and
slow-frame fraction with resource caps, and expose the reason. Pause hidden tabs,
retry on foreground/system/data preference changes, and offer explicit refresh.
Avoid ongoing frame loops and duplicate samples within one app service.

## Delivery and verification

Audit every component CSS/JS motion path, especially custom carousel duration,
input caret, ripple, skeleton, loading icons, teleported overlays and TransitionGroup.
Add documentation with an executable example and Header selector; synchronize
typed styling guidance, generated artifacts, exports, DTS and reviewed snapshot.
Test recommended branches, resource privacy/missing APIs, cleanup, SSR/isolation,
live reduced-motion changes, off-mode overlay lifecycle, and browser mode matrix.
Run package typechecks, tests, builds, consumer/size gates, agent checks and visual
checks. Preserve existing unrelated local edits and report their known gates.

## Reviewed contract and results

The additive API exports `useH0Animation`, `H0AnimationQuality`, and
`H0AnimationRecommendationReason`, extends `H0AnimationLevel`, and adds effective
and recommended state to the theme service. Existing root exports and stable CSS
token names are retained. The reviewed component snapshot includes the Carousel
autoplay change plus the preceding Avatar/Alert palette fixes, against HEAD. It
does not accept pre-existing Card, Field, FileUpload, Layout, Skeleton, or Tabs edits.

- 21 recommendation/service tests cover all levels, system priority, resource and
  graphics limits, frame cadence/jank, unknown APIs, bounded deadlines, hidden-tab
  handling, cleanup, isolation, SSR/hydration, shared composables, and autoplay.
- 15 browser tests pass: seven motion checks (including real GPU-disabled Chromium,
  full mode matrix, focus/Escape/scroll restoration and responsive Header) and
  eight palette regression checks. Header verified at 360/768/900/1280 pixels.
- UI and documentation typechecks/builds pass; consumer fixtures include the new
  composable's root and individual subpath. Package and bundle/CSS budgets pass.
- Agent artifacts regenerated; all seven generator tests pass.
- Complete UI suite: 231 pass, one existing component-freeze mismatch from the
  excluded local edits. Root typecheck remains subject to the stale local icon
  catalog/names outputs. Those unrelated inputs are preserved.

Browser-only quality must not change SSR markup: a client reduced-motion request
can resolve to Off immediately while the server has no such signal. Recommendations
are heuristics and refresh on return/preferences or explicit re-evaluation; they
are not guarantees for all later application workloads or definitive GPU settings.
