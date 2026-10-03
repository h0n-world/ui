# H0TextShimmer plan

Add a small CSS-only text effect with consumer-owned slot text, an optional
span/p/div tag, active switch and positive duration in milliseconds. Inherit
typography, use existing secondary/text color tokens, retain one real text node
and forward native/ARIA attributes to the root. No generated text, timers or
automatic live-region announcements.

Treat shimmer like the existing decorative Skeleton shimmer: animate only in
effective High. Off/Low/Medium, system reduced motion, forced colors, inactive
state, and unsupported text clipping render readable static text. Preserve SSR.

Synchronize family/root/plugin, manifest, Markdown, examples, typed agent record,
generated outputs, consumer and DTS fixtures, and reviewed contract hashes.
Verify state/attribute/SSR behavior and browser motion, multiline/RTL, contrast,
all palettes, fallback and responsive layout. Preserve unrelated local changes
and their known icon/contract gates.

## Reviewed result

The additive API includes H0TextShimmer, H0TextShimmerProps and
H0TextShimmerElement. No dependency, runtime service, or stable CSS token was
added. The base blends existing secondary/text colors to keep both gradient
endpoints at least 4.5:1 against the surface in all six palette combinations.
Root and component snapshots include the reviewed component and the preceding
Dropdown/Avatar/Alert/Carousel work, excluding unrelated pre-existing edits.

Seven behavior/SSR tests and twelve browser checks cover motion profiles,
activation, durations, live system reduction, forced colors, contrast, layout,
RTL/wrapping and accessibility. The selective entry has explicit JS/CSS budgets;
the full consumer CSS allowance increases from 24 to 24.5 KiB gzip for the new
components (measured growth approximately 0.25 KiB for TextShimmer).

Current focused verification: UI and documentation typechecks pass; all seven
TextShimmer behavior/SSR tests and twelve Chromium browser checks pass. The mobile
preview was inspected. Agent artifacts match their sources. The UI production
build passes consumer fixtures, size budgets and package archive validation;
the selective TextShimmer JavaScript entry is 0.50 KiB gzip. These focused checks
do not claim a complete workspace test run or publication to the registry.
