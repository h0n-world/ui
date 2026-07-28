---
title: EmptyState
description: Explain an empty surface and provide a clear next step.
path: /components/emptystate
group: Components
section: Feedback
order: 151
---

# EmptyState

`H0EmptyState` explains why content is absent and gives users a useful next step. It combines a visual, title, description, and optional actions without forcing product-specific copy or imagery.

## Import

:::component-api imports
:::

## Usage

Pass action labels when the default two-button layout is sufficient. `primaryAction` and `secondaryAction` emit events; they do not perform navigation or mutate application state.

:::example components/empty-state/BasicExample
:::

## Layout variants

- `inline` adds spacing without drawing another container. Use it inside cards, tables, and filtered collections.
- `surface` adds a bordered surface and radius when the empty state is itself the content container.
- `page` reserves at least half of the viewport block size for page-level absence.

:::example components/empty-state/VariantsExample
:::

## Custom composition

The `visual`, `title`, `description`, and `actions` slots replace their corresponding defaults. Reuse H0N components such as `H0Icon`, `H0Typography`, and `H0Button` inside these slots so typography, focus, and theme behavior remain consistent.

:::example components/empty-state/CustomExample
:::

## Content precedence

- `visual` slot → `image` → `icon`.
- `title` slot → `title` prop → localized empty-state title.
- `description` slot → `description` prop → no description.
- `actions` slot → generated primary and secondary buttons → no action row.

When `image` is present, `icon` is ignored. Give informative images useful `imageAlt`; use an empty value for decorative images.

## Events

:::component-api events
:::

Both events have no payload. Keep loading, navigation, and dismissal state in the parent.

## Props

:::component-api props
:::

## Types

`H0EmptyStateProps` represents the complete public prop object.

### H0EmptyStateVariant

:::component-api type H0EmptyStateVariant
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Use a meaningful title; the localized fallback is intentionally generic.
- Decorative custom visuals should be hidden from assistive technology.
- Give informative images useful alternative text and decorative images an empty `imageAlt`.
- Keep the primary action specific, such as “Create project” rather than “Continue”.
- Do not use an empty state while data is still loading or when a recoverable request has failed.

## Responsive behavior

Content is centered and actions wrap on narrow screens. Images are capped at the container width and 240px. The `page` variant uses block-size rather than a fixed pixel height.

## Performance

Prefer imported SVG icon definitions or optimized images. Avoid mounting data-heavy content behind an empty state.

## Styling

Use `variant` for the container treatment and public tokens in custom slots. Internal layout selectors are implementation details.

> [!INFO] Loading and errors
> Use `H0Skeleton` or `H0Spinner` while content is loading. Use `H0Alert` for a request failure with recovery guidance.
