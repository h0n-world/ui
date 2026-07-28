import type { ComponentAgentRecordV1 } from '../schema.ts'
import { fieldProps, focusBlurEvents, standardFormGuidance } from './forms-shared.ts'

export const imageUploadAgentRecord = {
    schemaVersion: 1, component: 'H0ImageUpload', status: 'migrated', summary: 'Single-image picker with preview, drag and drop, preset dimensions, validation, and removable controlled state.',
    imports: { components: ['H0ImageUpload'], types: ['H0ImageUploadEmits', 'H0ImageUploadError', 'H0ImageUploadErrorCode', 'H0ImageUploadFit', 'H0ImageUploadPreset', 'H0ImageUploadProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'File | null', default: 'undefined', description: 'Controlled selected file.' }, { name: 'defaultValue', type: 'File | null', default: 'null', description: 'Initial file.' },
        { name: 'src', type: 'string', default: "''", description: 'Controlled preview URL.' }, { name: 'accept', type: 'string', default: "'image/png,image/jpeg,image/webp'", description: 'Accepted image MIME types.' },
        { name: 'maxSize', type: 'number', default: '5242880', description: 'Maximum bytes.' }, { name: 'preset', type: 'H0ImageUploadPreset', default: "'banner'", description: 'Preview shape preset.' },
        { name: 'width', type: 'string | number', default: 'undefined', description: 'Custom preview width.' }, { name: 'height', type: 'string | number', default: 'undefined', description: 'Custom preview height.' },
        { name: 'radius', type: 'string | number', default: 'undefined', description: 'Custom preview radius.' }, { name: 'fit', type: 'H0ImageUploadFit', default: "'cover'", description: 'Preview object-fit.' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'Shows pending state.' }, { name: 'dropLabel', type: 'string', default: 'Localized', description: 'Drop-zone instruction.' },
        { name: 'browseLabel', type: 'string', default: 'Localized', description: 'Browse action text.' }, { name: 'removeLabel', type: 'string', default: 'Localized', description: 'Remove action label.' }, ...fieldProps,
    ], events: [
        { name: 'update:modelValue', type: 'File | null', description: 'Requests file update.' }, { name: 'update:src', type: 'string', description: 'Requests preview URL update.' }, { name: 'change', type: 'File | null', description: 'Reports committed image.' },
        { name: 'drop', type: 'File', description: 'Reports a dropped image.' }, { name: 'invalid', type: 'H0ImageUploadError', description: 'Reports invalid input.' }, { name: 'remove', type: '—', description: 'Reports removal.' }, ...focusBlurEvents,
    ], slots: [], exposed: [], types: [
        { name: 'H0ImageUploadPreset', fields: [{ name: 'H0ImageUploadPreset', type: "'avatar' | 'banner' | 'square' | 'vertical' | 'custom'", description: 'Supported preview geometry presets.' }] },
        { name: 'H0ImageUploadFit', fields: [{ name: 'H0ImageUploadFit', type: "'contain' | 'cover'", description: 'Supported image object-fit modes.' }] },
        { name: 'H0ImageUploadErrorCode', fields: [{ name: 'H0ImageUploadErrorCode', type: "'format' | 'size' | 'empty'", description: 'Supported validation categories.' }] },
        { name: 'H0ImageUploadError', fields: [
            { name: 'code', type: 'H0ImageUploadErrorCode', description: 'Validation category.' }, { name: 'file', type: 'File | undefined', description: 'Rejected file, when available.' }, { name: 'message', type: 'string', description: 'Human-readable reason.' },
        ] },
    ] },
    useWhen: ['A form accepts one image and should preview it before upload.'], avoidWhen: ['Multiple arbitrary files or upload progress are needed; use H0FileUpload.'], ...standardFormGuidance,
    examples: [{ key: 'components/image-upload/BasicExample', purpose: 'Single-image selection and preview.' }, { key: 'components/image-upload/PresetsExample', purpose: 'Avatar, square, and banner presets.' }, { key: 'components/image-upload/StatesExample', purpose: 'Loading, disabled, custom, and error states.' }], relatedComponents: ['H0FileUpload', 'H0Image', 'H0Form'],
} satisfies ComponentAgentRecordV1
