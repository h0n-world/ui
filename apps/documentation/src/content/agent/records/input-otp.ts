import type { ComponentAgentRecordV1 } from '../schema.ts'
import { fieldProps, focusBlurEvents, standardFormGuidance } from './forms-shared.ts'

export const inputOtpAgentRecord = {
    schemaVersion: 1, component: 'H0InputOTP', status: 'migrated', summary: 'Segmented one-time-code input with paste distribution, validation, completion events, and accessible grouped semantics.',
    imports: { components: ['H0InputOTP'], types: ['H0InputOTPEmits', 'H0InputOTPLength', 'H0InputOTPProps', 'H0InputOTPSize', 'H0InputOTPValidation', 'H0InputOTPValidator', 'H0InputOTPVariant'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'string', default: 'undefined', description: 'Controlled code.' }, { name: 'defaultValue', type: 'string', default: "''", description: 'Initial code.' },
        { name: 'length', type: '4 | 6', default: '6', description: 'Number of cells.' }, { name: 'size', type: 'H0InputOTPSize', default: "'md'", description: 'Cell size.' }, { name: 'variant', type: "'secondary' | 'surface'", default: "'secondary'", description: 'Visual treatment.' },
        { name: 'validation', type: "'numeric' | 'alphanumeric'", default: "'numeric'", description: 'Built-in character rule.' }, { name: 'validator', type: 'H0InputOTPValidator', default: 'undefined', description: 'Custom code validator.' },
        { name: 'invalidText', type: 'string', default: 'Localized', description: 'Validation message.' }, { name: 'autoComplete', type: 'boolean', default: 'true', description: 'Enables one-time-code autocomplete.' }, ...fieldProps,
    ], events: [
        { name: 'update:modelValue', type: 'string', description: 'Requests code update.' }, { name: 'change', type: 'string', description: 'Reports code changes.' }, { name: 'complete', type: 'string', description: 'Reports a filled valid code.' },
        { name: 'invalid', type: '[string, string]', description: 'Reports the rejected code and validation message.' }, ...focusBlurEvents,
    ], slots: [{ name: 'label', type: '—', description: 'Custom group label.' }], exposed: [
        { name: 'confirm', type: '() => boolean', description: 'Validates and emits completion when valid.' }, { name: 'focus', type: '() => void', description: 'Focuses the next available cell.' }, { name: 'validate', type: '() => boolean', description: 'Runs current validation.' },
    ], types: [
        { name: 'H0InputOTPLength', fields: [{ name: 'H0InputOTPLength', type: '4 | 6', description: 'Supported verification-code lengths.' }] },
        { name: 'H0InputOTPSize', fields: [{ name: 'H0InputOTPSize', type: "'sm' | 'md' | 'lg'", description: 'Supported cell sizes.' }] },
        { name: 'H0InputOTPVariant', fields: [{ name: 'H0InputOTPVariant', type: "'secondary' | 'surface'", description: 'Supported cell surface variants.' }] },
        { name: 'H0InputOTPValidation', fields: [{ name: 'H0InputOTPValidation', type: "'numeric' | 'alphanumeric'", description: 'Built-in character normalization rule.' }] },
        { name: 'H0InputOTPValidator', fields: [{ name: 'H0InputOTPValidator', type: '(value: string) => boolean | string', description: 'Returns true for a valid code, false for the fallback message, or a custom message.' }] },
    ] },
    useWhen: ['A verification flow requests a short one-time code.'], avoidWhen: ['The value is an ordinary password or arbitrary text.'], ...standardFormGuidance,
    examples: [{ key: 'components/input-otp/BasicExample', purpose: 'Six-digit verification code.' }, { key: 'components/input-otp/VariantsExample', purpose: 'Four and six cells with both validation modes.' }, { key: 'components/input-otp/SizesExample', purpose: 'Small, medium, and large OTP cells.' }, { key: 'components/input-otp/ValidationExample', purpose: 'Custom validation and manual confirmation.' }], relatedComponents: ['H0Input', 'H0Form'],
} satisfies ComponentAgentRecordV1
