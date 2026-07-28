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

Use `avatar`, `square`, `banner`, or `vertical` for common geometry. `custom` combines explicit width, height, radius, and object fit.

:::example components/image-upload/PresetsExample
:::

## Loading, disabled, and error states

Use `loading` while application upload or processing is pending. `error` belongs to form validation; rejected files emit the structured `invalid` event.

:::example components/image-upload/StatesExample
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

- Use a task-specific label and visible format and size hint.
- Provide custom action labels when the active locale does not fit the context.
- Loading, browse, and remove controls remain announced and keyboard accessible.

## Responsive behavior

Banner uses fluid width; avatar, square, and vertical presets use fixed geometry unless overridden.

## Performance

Object URLs are revoked automatically. Resize or compress large images in application upload logic when appropriate.

## Styling

Prefer presets, fit, dimensions, and radius props before custom selectors.
