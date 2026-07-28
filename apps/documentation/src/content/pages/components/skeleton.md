---
title: Skeleton
description: Preserve content geometry with lightweight loading placeholders.
path: /components/skeleton
group: Components
section: Feedback
order: 154
---

# Skeleton

`H0Skeleton` renders a decorative placeholder while the shape of upcoming content is known. It preserves geometry and reduces layout movement without pretending to expose actual progress.

## Import

:::component-api imports
:::

## Variants

- `block` is the default for media, panels, and arbitrary rectangles.
- `text` enforces a useful minimum line height for text-shaped placeholders.
- `circle` creates a circular placeholder when width and height are equal.
- The `circle` boolean also forces circular radius and takes precedence over the selected variant’s radius.

:::example components/skeleton/VariantsExample
:::

## Composite placeholder

Compose multiple skeletons to mirror the final layout. Put one accessible loading status on the containing region because individual skeletons are hidden from assistive technology.

:::example components/skeleton/ProfileExample
:::

## Card geometry

Width, height, and radius accept CSS strings. Match the final card closely enough to avoid layout shifts without reproducing every visual detail.

:::example components/skeleton/CardExample
:::

## Replacing loading content

Use one parent-owned loading state and replace the complete placeholder group when content arrives. Match the major dimensions of the final component, not every line or decoration.

:::example components/skeleton/LoadingStateExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

Width, height, and radius are passed to CSS custom properties without runtime validation. Use valid CSS lengths or percentages.

## Types

`H0SkeletonProps` represents the complete public prop object.

### H0SkeletonVariant

:::component-api type H0SkeletonVariant
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Skeletons are `aria-hidden`; label the surrounding loading region once.
- Set `aria-busy="true"` on the region whose content is being replaced when that relationship is useful.
- Do not render both readable stale content and skeletons as competing states.
- Shimmer runs only in the global `high` animation mode and is also disabled when the user requests reduced motion.

## Responsive behavior

Use percentages for fluid text and block placeholders. Fixed circular dimensions should match the avatar or icon they replace.

## Performance

Prefer a small structural approximation over dozens of placeholder nodes. Replace the entire group when content resolves; do not keep hidden skeleton trees mounted.

## Styling

Use width, height, radius, variant, and public tokens. The shimmer pseudo-element and `--h-skeleton-*` variables are implementation details.
