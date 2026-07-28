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

Numbers become pixels; strings accept CSS sizes. `fit` and `objectPosition` control the native image inside its wrapper.

:::example components/image/SizingExample
:::

## Fallback and status

The `fallback` and `skeleton` slots receive the current `H0ImageStatus`. The lifecycle progresses through `idle → loading → loaded | error`; changing `src` starts observation and loading again. `load`, `error`, and `status-change` support application telemetry and state.

:::example components/image/FallbackExample
:::

## Lifecycle events

Use `status-change` for the component lifecycle and `load` or `error` when the corresponding native image event matters.

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
