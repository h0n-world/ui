---
title: Design principles
description: The decisions behind the documentation experience.
path: /docs/design-principles
group: Getting started
section: Handbook
order: 40
---

# Design principles

The interface is intentionally quiet. It creates hierarchy through spacing, typography, and subtle surfaces rather than decorative noise.

## Content owns the center

Navigation frames the reading experience but never competes with it. The article column stays comfortably narrow while examples can use the available width.

## Progressive disclosure

Desktop readers see the complete documentation map and page outline. On smaller screens both sidebars become lightweight, dismissible panels.

## Tokens over literals

Template SCSS uses `--h0n-ui-color-*`, spacing, typography, radius, animation, and shadow tokens from the UI library. A theme change updates the entire shell consistently.

## Familiar interaction

Links look like links, active navigation has a stable marker, and search can be opened from the header or with the `/` shortcut.
