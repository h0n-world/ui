---
title: Changelog
description: User-facing additions and fixes in each H0N UI library release.
path: /releases/changelog
group: Releases
section: Latest
order: 200
---

# Changelog

Track meaningful changes to `@h0nio/ui` here. Library versions reflect changes to the library itself; documentation-app and workspace-only changes do not require a library version bump. Add a dedicated migration guide only when a released breaking change requires one.

## Version 1.3.0

This minor release adds content-state, dropdown, and text-shimmer components, expands app-scoped appearance controls, and improves asynchronous component lifecycles.

### Added

- Added `H0ContentState` for switching a controlled content region between loading, error, empty, and resolved content slots with animated transitions and `aria-busy` feedback.
- Added `H0Dropdown` with controlled and uncontrolled opening, a custom trigger and content slots, configurable positioning and dimensions, teleport support, nested-overlay integration, outside dismissal, Escape handling, and focus restoration. Public methods expose `open`, `close`, and `toggle`.
- Added `H0TextShimmer` with configurable element, active state, and duration. Its text effect follows the app's animation quality and respects reduced motion and forced colors.
- Added `off`, `medium`, and `recommended` animation preferences alongside `low` and `high`. The theme service exposes resolved and recommended quality, evaluation status, recommendation reasons, and a refresh method; automatic recommendations account for motion preferences, data saving, device resources, graphics capabilities, and sampled frame timing.
- Added `useH0Animation` for sharing the app-scoped animation policy with application effects.
- Added `default`, `telegram`, and `uber` accent palettes through the theme service, with light and dark variants, `setAccent`, and optional persistence alongside the theme preference.
- Added `surface`, `secondary`, and `outline` variants to Alert, with `surface` as the default.

### Fixed and improved

- Aligned Alert Dialog with the shared overlay header, content, and footer structure, removing double panel padding and the absolutely positioned close control.
- Improved Select virtualization using measured viewport height, bounded virtual windows, and normalized overscan; CSS scroll-height values remain intact during positioning. Select now respects disabled state inherited from Field and closes when interaction becomes unavailable.
- Improved DataTable filtering and sorting by preparing active filters, reusing a collator, and resolving sort values once per row. Virtualization now measures viewport changes, bounds the rendered window when data shrinks, and falls back to regular rendering for invalid settings.
- Serialized FileUpload additions during asynchronous validation and guarded stale validation, upload progress, and completion callbacks after removal, clearing, reset, or unmount. Improved cancellation, concurrency accounting, upload-promise settlement, and browser-only preview URL creation.
- Prevented stale positioning, focus, dismissal, and observer callbacks from acting after floating surfaces and overlays close or unmount. Overlay focus selection excludes hidden controls, and handled Escape events remain scoped to the active child surface.
- Made InfiniteScroll respond to `observeOnMount` changes and ignore stale observer callbacks after reconfiguration or unmount.
- Made theme persistence tolerate unavailable browser storage and disposed fallback theme services with their component scope.
- Applied animation quality consistently to library transitions and continuous effects, including Carousel autoplay, Skeleton, Ripple, and overlay backdrops; reduced-motion preferences disable library motion.
- Corrected horizontal Field label and control placement, normalized Toast visibility limits including `maxVisible="0"`, refined Alert action styling, increased the SearchField icon size, and aligned Stepper labels of different heights.

## Version 1.2.0

This minor release adds Command and color-selection components, expands typography and overlay APIs, and improves shared overlay behavior without introducing breaking changes.

### Added

- Added `H0CellColorPicker` with controlled and uncontrolled HEX values, `standard` and `minimal` trigger layouts, configurable swatch placement, `surface`, `secondary`, and `ghost` variants, and `sm`, `md`, and `lg` sizes.
- Added `H0Command` with configurable trigger variants and sizes, modal window sizes and backdrops, hotkey opening, searchable grouped commands, and keyboard navigation.
- Added a custom saturation and brightness plane with a hue slider, pointer and touch interaction, keyboard controls, accessible slider semantics, and localized labels.
- Added form submission through the `name` prop, disabled behavior, popup teleport and positioning options, and the public `open`, `close`, `focus`, and `setValue` methods.
- Added the `lineHeight` prop to `H0Typography` for unitless numeric and explicit CSS line-height overrides.
- Added `letterSpacing` and `textTransform` props to `H0Typography`, including pixel-based numeric tracking and explicit CSS values.
- Added standard `subtitle` support to Modal, Drawer, and Sheet headers.
- Added a standard close control and `footer` slot to Sheet, aligning its built-in overlay API with Modal and Drawer.
- Added direct support for tree-shakeable definitions from `@h0nio/icons` across `H0Icon` and every component icon prop, while retaining legacy node definitions and the `@h0nio/ui/icons` compatibility facade.

### Fixed and improved

- Prevented document scrolling behind Command, Select, Modal, Sheet, Drawer, and AlertDialog overlays without replacing the body positioning, preserving sticky page regions, nested-overlay locks, scrollbar compensation, and the original page position. Command search focus no longer requests a second scrollable focus transition when opening the system keyboard.
- Unified Modal, Drawer, and Sheet around shared header, content, and footer layouts with consistent 16px spacing, predictable bordered sections, and correct content padding when optional regions are omitted.
- Replaced duplicated UI system SVG definitions with individual `@h0nio/icons` subpath imports. Body-based SVG definitions preserve their authored solid, stroke, and duotone geometry and receive deterministic per-instance IDs for SSR-safe definitions and clip paths.

## Version 1.1.0

This minor release expands form-control consistency, improves overlay behavior, and refreshes component examples without introducing breaking API changes.

### Added

- Added `surface` and `secondary` variants to Select, Textarea, FileUpload, Checkbox, and Radio, with `surface` remaining the default.
- Added `sm`, `md`, and `lg` sizes to Checkbox and InputOTP, with `md` as the default.
- Added overlay-level context so Select popovers and their dimming layer render correctly inside Modal, Sheet, and Drawer.

### Fixed and improved

- Aligned Select and InputOTP sizing with the shared input-control dimensions, including improved OTP character centering.
- Prevented page and fixed-component shifts when AlertDialog, Modal, Sheet, or Drawer locks body scrolling.
- Added animated horizontal and vertical Tabs indicators and corrected the vertical indicator position.
- Corrected Tooltip positioning for top, right, bottom, and left placements in grouped layouts.
- Improved ImageUpload geometry across presets, loading, disabled, and error states; upload constraints and supporting text now remain readable outside compact drop zones.
- Corrected Stepper marker centering and vertical connector alignment.
- Improved Image fallback feedback with a clear error icon and preserved the default skeleton while media is waiting or loading.

### Documentation

- Published a versioned AI installation prompt for inspecting, installing, configuring, and validating H0N UI in existing Vue projects.
- Expanded `llms.txt` and the consumer `AGENTS.md` template with installation guidance and links between the available agent resources.
- Strengthened the typed component catalog validation so every manifest component has a complete agent record with imports, styles, and implementation guidance.
- Expanded Layout guidance with focused examples for Container, Stack, Inline, Spacer, and Divider.
- Separated combined variant, size, color, and state demonstrations across Select, SearchField, Segment, Stepper, Checkbox, Radio, PasswordInput, NumberInput, FileUpload, and Textarea.
- Reworked ImageUpload presets and states into focused examples for compact, banner, vertical, loading, disabled, and error use cases.
- Added clearer Image examples for object-fit behavior, fallback content, lifecycle events, and loading skeletons.

## Version 1.0.0

- Established the stable `@h0nio/ui` public API and semantic-versioning baseline.
- Consolidated package architecture, public API conventions, styling contracts, and Codex workspace guidance.
- Retained generated component metadata and agent artifacts as derived documentation outputs.
