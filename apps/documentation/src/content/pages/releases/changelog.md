---
title: Changelog
description: User-facing additions, fixes, and documentation improvements in each H0N UI release.
path: /releases/changelog
group: Releases
section: Latest
order: 200
---

# Changelog

Track meaningful changes here. Keep entries focused on what users gain. Add a dedicated migration guide only when a released breaking change requires one.

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
