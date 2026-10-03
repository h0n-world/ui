# H0Dropdown implementation plan

Add a supported floating disclosure with exactly one consumer-owned trigger in
the default slot and arbitrary `content`. Clone the trigger's VNode to route
interaction/ARIA without adding a button. Support controlled/uncontrolled open
state, imperative open/close/toggle, disabled state, placement, teleport, and
min/max width/height. Reuse Floating UI and the dismissable-layer stack; preserve
app theme tokens, overlay layering, reduced motion, SSR, and listener cleanup.

Use a non-modal dialog for arbitrary content, initial focus, Escape/restoration,
outside dismissal, and Tab exit. Consumers own action layout and semantic menus;
do not manufacture menuitems or close on every content click. Native and custom
triggers must retain handlers, refs, attributes, and accessible names.

Synchronize family/root exports and registry, manifest, typed record, Markdown,
live examples, generated artifacts, consumer/DTS fixtures and reviewed contract.
Verify behavior, positioning/sizing, keyboard/disabled/control/SSR/cleanup,
responsive palettes and animation profiles in the documentation route. Preserve
pre-existing edits and distinguish their existing contract/icon gate failures.

## Reviewed implementation and validation

- Added H0Dropdown, H0DropdownProps and H0DropdownExpose with root/plugin,
  manifest and selective package entries. No new stable CSS tokens or dependency.
- Defaults: bottom-start, 6px gap, min/max width 160/360px, min/max height 0/320px.
  Maximum constraints and viewport space take priority over minimum dimensions.
- Three live examples cover custom actions, image/form content, and nested
  Modal/Select with scrolling and disabled state. Agent sources regenerated.
- Floating helpers guard delayed setup after close/unmount; dismissal supports
  initial-open state and logical teleported children. Parent overlays respect
  consumed keyboard events. Browser transition focus restoration is verified.
- 13 new unit tests pass. Complete UI suite: 244 pass; one pre-existing component
  freeze mismatch remains from unrelated local component edits. The reviewed
  snapshot includes Dropdown and the earlier Avatar/Alert/Carousel changes against
  HEAD, preserving those unrelated edits without accepting them into the contract.
- 16 browser checks pass: ten Dropdown checks plus six animation regressions.
  Covers keyboard, focus, outside dismissal, nested Escape ordering, sizing/scroll,
  RTL, Off motion, accessibility, mobile bounds and all six palettes. Mobile
  light/dark screenshots inspected.
- UI/documentation production builds, selective consumer packaging, size budgets,
  and all seven agent tests pass. Root typecheck retains the prior stale icon-data
  failure; package-specific source/type checks are run separately.
