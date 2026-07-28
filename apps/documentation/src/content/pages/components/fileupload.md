---
title: FileUpload
description: Validate, queue, upload, retry, cancel, and reorder one or many files.
path: /components/fileupload
group: Components
section: Forms
order: 165
---

# FileUpload

`H0FileUpload` supports file selection and drop, validation, controlled queues, optional upload adapters, progress, cancellation, retry, and reordering.

## Import

:::component-api imports
:::

## Usage

Without an upload adapter, `v-model` exposes accepted `File[]` values for application-managed submission.

:::example components/file-upload/BasicExample
:::

## Validation

Validation runs accept, size, count, then the synchronous or asynchronous `validator`. The `invalid` event reports one structured reason at a time.

:::example components/file-upload/ValidationExample
:::

## Upload queue

Provide an `H0UploadAdapter` to enable progress, retry, cancellation, and queue state. With manual upload, the component renders one **Upload files** action; use `autoUpload` for immediate transfer instead. The exposed `start()` method is available when a custom external action is required and resolves after the queued uploads settle. `concurrency` limits simultaneous uploads.

:::example components/file-upload/QueueExample
:::

## Types

`H0FileUploadProps<Result>` and `H0FileUploadEmits<Result>` preserve the result type returned by the upload adapter.

### H0FileUploadValidationError

:::component-api type H0FileUploadValidationError
:::

### H0UploadStatus

:::component-api type H0UploadStatus
:::

### H0UploadAdapterContext

:::component-api type H0UploadAdapterContext
:::

### H0UploadAdapter

:::component-api type H0UploadAdapter
:::

### H0UploadItem

:::component-api type H0UploadItem
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

## Accessibility

- State accepted formats, maximum size, and maximum count in the hint.
- Keep retry, cancel, remove, and browse actions clearly named in custom slots.
- Do not rely on drag and drop; the native picker remains the keyboard-accessible path.

## Responsive behavior

File rows wrap or truncate long names. The drop area fills its container.

## Performance

Limit file count and concurrency, abort transfers on removal, and avoid reading large files into memory.

## Styling

Use slots and public tokens; hidden input, queue, and drag-state selectors are implementation details.
