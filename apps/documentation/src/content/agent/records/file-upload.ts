import type { ComponentAgentRecordV1 } from '../schema.ts'
import { fieldProps, focusBlurEvents, standardFormGuidance } from './forms-shared.ts'

export const fileUploadAgentRecord = {
    schemaVersion: 1, component: 'H0FileUpload', status: 'migrated', summary: 'Accessible file picker and drop zone with validation, upload queue state, progress, retry, cancellation, and optional reordering.',
    imports: { components: ['H0FileUpload'], types: ['H0FileUploadEmits', 'H0FileUploadProps', 'H0FileUploadValidationError', 'H0FileUploadVariant', 'H0UploadAdapter', 'H0UploadAdapterContext', 'H0UploadItem', 'H0UploadStatus'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'File[]', default: 'undefined', description: 'Controlled selected files.' }, { name: 'defaultValue', type: 'File[]', default: '[]', description: 'Initial files.' },
        { name: 'accept', type: 'string', default: "''", description: 'Native file accept filter.' }, { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows multiple files.' },
        { name: 'maxFiles', type: 'number', default: 'undefined', description: 'Maximum file count.' }, { name: 'maxSize', type: 'number', default: 'undefined', description: 'Maximum bytes per file.' },
        { name: 'validator', type: '(file: File, files: readonly File[]) => string | null | undefined | Promise<string | null | undefined>', default: 'undefined', description: 'Custom validation callback.' }, { name: 'upload', type: 'H0UploadAdapter<Result>', default: 'undefined', description: 'Async upload adapter.' },
        { name: 'autoUpload', type: 'boolean', default: 'false', description: 'Starts uploads after selection.' }, { name: 'concurrency', type: 'number', default: '3', description: 'Maximum simultaneous uploads.' }, { name: 'reorderable', type: 'boolean', default: 'false', description: 'Enables queue reordering.' }, { name: 'variant', type: 'H0FileUploadVariant', default: "'surface'", description: 'Drop-area background treatment.' },
        ...fieldProps,
    ], events: [
        { name: 'update:modelValue', type: 'File[]', description: 'Requests file value update.' }, { name: 'change', type: 'File[]', description: 'Reports the complete file list.' }, { name: 'add', type: 'File[]', description: 'Reports accepted files.' },
        { name: 'remove', type: 'File', description: 'Reports a removed file.' }, { name: 'clear', type: '—', description: 'Reports clearing the queue.' }, { name: 'invalid', type: 'H0FileUploadValidationError', description: 'Reports rejected input.' },
        { name: 'upload-start', type: 'H0UploadItem<Result>', description: 'Reports an upload start.' }, { name: 'progress', type: 'H0UploadItem<Result>', description: 'Reports upload progress.' },
        { name: 'success', type: 'H0UploadItem<Result>', description: 'Reports upload completion.' }, { name: 'error', type: 'H0UploadItem<Result>', description: 'Reports upload failure.' },
        { name: 'cancel', type: 'H0UploadItem<Result>', description: 'Reports cancellation.' }, { name: 'reorder', type: 'File[]', description: 'Reports queue order.' }, ...focusBlurEvents,
    ], slots: [
        { name: 'drop', type: '{ open }', description: 'Drop-zone content and picker action.' }, { name: 'item', type: '{ item, index, remove, retry, cancel }', description: 'Custom queue item.' },
    ], exposed: [
        { name: 'open', type: '() => void', description: 'Opens the native file picker.' }, { name: 'start', type: '(id?: string) => Promise<void>', description: 'Starts queued uploads.' },
        { name: 'retry', type: '(id: string) => void', description: 'Retries a failed upload.' }, { name: 'cancel', type: '(id: string) => void', description: 'Cancels an upload.' },
        { name: 'remove', type: '(target: File | string) => void', description: 'Removes an item by its file or generated ID.' }, { name: 'clear', type: '() => void', description: 'Clears all items.' },
        { name: 'reorder', type: '(from: number, to: number) => void', description: 'Moves an item.' }, { name: 'queue', type: 'H0UploadItem<Result>[]', description: 'Reactive upload queue.' },
    ], types: [
        { name: 'H0FileUploadVariant', fields: [{ name: 'H0FileUploadVariant', type: "'secondary' | 'surface'", description: 'Supported drop-area surface treatments.' }] },
        { name: 'H0FileUploadValidationError', fields: [
            { name: 'code', type: "'accept' | 'size' | 'count' | 'custom'", description: 'Validation category.' }, { name: 'file', type: 'File | undefined', description: 'Rejected file, when available.' }, { name: 'message', type: 'string', description: 'Human-readable reason.' },
        ] },
        { name: 'H0UploadStatus', fields: [{ name: 'H0UploadStatus', type: "'idle' | 'uploading' | 'success' | 'error' | 'cancelled'", description: 'Lifecycle state of one queued upload.' }] },
        { name: 'H0UploadAdapterContext', fields: [
            { name: 'signal', type: 'AbortSignal', description: 'Aborts the transfer when the item is cancelled or removed.' },
            { name: 'onProgress', type: '(progress: number) => void', description: 'Reports progress from zero to one hundred.' },
        ] },
        { name: 'H0UploadAdapter', fields: [{ name: 'H0UploadAdapter<Result>', type: '(file: File, context: H0UploadAdapterContext) => Promise<Result>', description: 'Application-owned asynchronous transfer function.' }] },
        { name: 'H0UploadItem', fields: [
            { name: 'id', type: 'string', description: 'Generated queue identifier.' },
            { name: 'file', type: 'File', description: 'Source file.' },
            { name: 'status', type: 'H0UploadStatus', description: 'Current lifecycle state.' },
            { name: 'progress', type: 'number', description: 'Current progress from zero to one hundred.' },
            { name: 'result', type: 'Result | undefined', description: 'Resolved adapter result.' },
            { name: 'error', type: 'string | undefined', description: 'Transfer failure message.' },
        ] },
    ] },
    useWhen: ['Users select or upload one or more files with visible validation and progress.'], avoidWhen: ['Only one image preview is needed; use H0ImageUpload.'], ...standardFormGuidance,
    examples: [{ key: 'components/file-upload/BasicExample', purpose: 'Validated multi-file selection.' }, { key: 'components/file-upload/VariantsExample', purpose: 'Surface and secondary drop-area treatments.' }, { key: 'components/file-upload/ValidationExample', purpose: 'Built-in and custom rejection feedback.' }, { key: 'components/file-upload/QueueExample', purpose: 'Manual upload adapter, progress, and queue controls.' }], relatedComponents: ['H0Form', 'H0ImageUpload'],
} satisfies ComponentAgentRecordV1
