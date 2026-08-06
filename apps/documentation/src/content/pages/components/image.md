---
title: Image
description: Render responsive media with lazy loading, skeleton state, and fallback content.
path: /components/image
group: Components
section: Content
order: 132
---

# Image

`H0Image` reserves media space, optionally waits for an intersection, displays loading feedback, and renders fallback content for empty or failed sources.

## Import

:::component-api imports
:::

## Usage

Provide meaningful `alt` text and an aspect ratio or explicit dimensions to prevent layout shift.

:::example components/image/BasicExample
:::

## Sizing and fit

Numbers become pixels; strings accept CSS sizes. `fit` and `objectPosition` control the native image inside its wrapper. The example uses a deliberately small, panoramic source so scaling, cropping, and stretching remain visible. `scale-down` selects whichever result is smaller between `none` and `contain`, so it can intentionally match one of them.

:::example components/image/SizingExample
:::

## Fallback

An empty or failed source displays the default error icon. Use the `fallback` slot when the unavailable state needs contextual text or a different visual. The slot receives the current `H0ImageStatus`.

:::example components/image/FallbackExample
:::

## Loading state

While an image is waiting for lazy intersection or actively loading, `H0Image` displays `H0Skeleton` by default. Disable it with `skeleton="false"`, override the preference with `showSkeleton`, or replace it through the `skeleton` slot.

:::example components/image/LoadingExample
:::

## Lifecycle events

Use `status-change` for the component lifecycle and `load` or `error` when the corresponding native image event matters. The lifecycle progresses through `idle → loading → loaded | error`; changing `src` starts observation and loading again.

:::example components/image/LifecycleExample
:::

## Lazy loading and responsive sources

`lazy` defaults to true, but an explicit `loading` value takes precedence. `rootMargin` accepts IntersectionObserver CSS margin syntax, while `threshold` must be between `0` and `1`. Pass `srcset` and `sizes` directly for responsive candidates.

## Events

:::component-api events
:::

## Props

:::component-api props
:::

`showSkeleton` takes precedence over `skeleton`. Numeric `width` and `height` become wrapper pixel sizes and native `<img>` dimensions; string values size only the wrapper through CSS. Other fallthrough attributes are applied to the root `<figure>`, not the internal `<img>`.

## Types

`H0ImageProps` represents the complete public prop object documented above.

`H0ImageEmits` maps `load` and `error` to `[event: Event]`, and `status-change` to `[status: H0ImageStatus]`.

### H0ImageFit

:::component-api type H0ImageFit
:::

### H0ImageLoading

:::component-api type H0ImageLoading
:::

### H0ImageStatus

:::component-api type H0ImageStatus
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

Use concise alt text describing the image purpose. Use `alt=""` for decorative successfully loaded images. The default fallback creates an image role and uses `alt` or “Image is not available” as its label. Consequently, a decorative image becomes announced if it fails; provide an `aria-hidden` custom fallback when failure should remain decorative. Use a custom fallback for localized unavailable-image text.

## Performance

Use correct `width`, `height`, `aspectRatio`, `srcset`, `sizes`, decoding, and fetch priority. Set `loading="eager"` and an appropriate priority only for above-the-fold critical media.

## Styling

Use public sizing, fit, radius, skeleton, and fallback APIs. Internal `.h-image` selectors and variables are implementation details.
