---
title: Avatar
description: Represent people and accounts with images or deterministic initials.
path: /components/avatar
group: Components
section: Content
order: 121
---

# Avatar

`H0Avatar` displays a user image with skeleton loading and an initials fallback. Failed and loaded image states can be cached in `sessionStorage` for the current browser session.

## Import

:::component-api imports
:::

## Usage

Provide `src` and meaningful `alt` text for an image. When the source is empty or fails, initials come from `fallback`, `username`, or `name` in that order. The `alt` prop supplies the accessible label but does not generate initials, so image avatars should also provide an identity or explicit fallback.

:::example components/avatar/BasicExample
:::

## Fallback colors

Set `color` to choose an initials background explicitly. Without it, Avatar deterministically derives a color from `username`, `name`, or `fallback` so the same identity keeps a consistent fallback.

:::example components/avatar/ColorsExample
:::

## Size and shape

`size` accepts numbers in pixels or any CSS size string. `radius` controls circular, rounded-square, or custom shapes.

:::example components/avatar/SizingExample
:::

## Props

:::component-api props
:::

## Types

`H0AvatarProps` represents the complete prop object documented above. `H0AvatarStatus` describes the exported loading and cache-status union used internally; the current component does not expose its live status through props, events, or an imperative API.

### H0AvatarColor

:::component-api type H0AvatarColor
:::

### H0AvatarStatus

:::component-api type H0AvatarStatus
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

- The wrapper exposes `role="img"` and uses `alt`, `name`, or `username` as its accessible label.
- Write `alt` as the person's name or purpose; avoid descriptions of visual appearance.
- Decorative avatars still require an intentional labeling strategy because the component always creates an image role.

## Performance and caching

Keep `cache` enabled for repeated sources in one session. Disable it when a URL can change its response without changing the URL. Image status caching stores only `loaded` or `failed`; it does not cache image bytes.

## Styling

Use `size`, `radius`, and `color` before local styles. Automatic fallback colors are deterministic from the identity text. Internal avatar classes and `--h-avatar-*` variables are implementation details.
