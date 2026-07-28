---
title: Badge
description: Mark compact statuses, categories, and short metadata.
path: /components/badge
group: Components
section: Content
order: 122
---

# Badge

`H0Badge` renders a compact, non-interactive label. Use semantic tones for status and neutral tones for categories or metadata.

## Import

:::component-api imports
:::

## Tones

Use `default` and `neutral` for categories or metadata, `primary` for an emphasized or informational label, and `success`, `warning`, or `danger` only when the text carries the corresponding status meaning.

:::example components/badge/AppearanceExample
:::

## Sizes and status dots

Use `sm` in dense metadata and `md` for ordinary status labels. A dot supplements the visible text; it does not replace it.

:::example components/badge/SizesExample
:::

## Props

:::component-api props
:::

## Types

`H0BadgeProps` represents the complete prop object documented above.

### H0BadgeTone

:::component-api type H0BadgeTone
:::

### H0BadgeSize

`H0BadgeSize` uses the shared H0N size scale without its large option.

:::component-api type H0BadgeSize
:::

## Events

:::component-api events
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

Badge has no interactive role. Keep status text explicit and do not communicate meaning through color or the dot alone. Use a button or link when the label must be actionable.

Badge is not a live region and dynamic text changes are not announced automatically. When an update must be communicated immediately, place the badge in an application-owned container with the appropriate `aria-live` behavior.

## Styling

Badge uses public semantic color and typography tokens. Keep labels short enough to remain on one line and treat `.h-badge` selectors as implementation details.
