---
title: ImageUpload
description: Select and preview an image with presets, validation, removal, and loading state.
path: /components/imageupload
group: Components
section: Forms
order: 167
---

# ImageUpload

`H0ImageUpload` is a specialized single-image surface with drag and drop, object URL preview, preset geometry, validation, and Form integration.

## Import

:::component-api imports
:::

## Usage

Use `src` for an existing image and `v-model` for a newly selected file. Removing or replacing a preview emits `update:src` with an empty string.

:::example components/image-upload/BasicExample
:::

## Presets

Use `avatar`, `square`, `banner`, or `vertical` for common geometry. `custom` combines explicit width, height, radius, and object fit. Format and size restrictions remain outside the image surface, so compact presets do not have to contain supporting copy.

### Compact and custom presets

Avatar, square, and custom frames are useful for bounded images embedded in forms, cards, and profile settings.

:::example components/image-upload/PresetsExample
:::

### Banner preset

Banner fills the available inline width while preserving its preset height.

:::example components/image-upload/BannerPresetExample
:::

### Vertical preset

Vertical provides a tall fixed frame for portrait artwork and covers.

:::example components/image-upload/VerticalPresetExample
:::

## Loading

Use `loading` while application upload or processing is pending. The centered spinner is the only visual loading indicator; `loadingLabel` supplies its accessible status name.

:::example components/image-upload/LoadingExample
:::

## Disabled

Disabled upload surfaces remain visible but cannot open the file dialog or accept drops.

:::example components/image-upload/DisabledExample
:::

## Error

Use `error` for application or form validation. Files rejected by `accept` or `maxSize` also emit the structured `invalid` event.

:::example components/image-upload/ErrorExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Types

`H0ImageUploadProps` and `H0ImageUploadEmits` describe the component prop and event contracts.

### H0ImageUploadPreset

:::component-api type H0ImageUploadPreset
:::

### H0ImageUploadFit

:::component-api type H0ImageUploadFit
:::

### H0ImageUploadErrorCode

:::component-api type H0ImageUploadErrorCode
:::

### H0ImageUploadError

:::component-api type H0ImageUploadError
:::

## Accessibility

- Use a task-specific label. Accepted formats and maximum size remain visible below the image surface.
- Provide custom action labels when the active locale does not fit the context.
- Loading, browse, and remove controls remain announced and keyboard accessible. Loading text is visually omitted because the spinner already communicates the pending state.

## Responsive behavior

Banner uses fluid width; avatar, square, and vertical presets use fixed geometry unless overridden. Compact surfaces omit internal copy while retaining their accessible label and visible restrictions.

## Performance

Object URLs are revoked automatically. Resize or compress large images in application upload logic when appropriate.

## Styling

Prefer presets, fit, dimensions, and radius props before custom selectors.
