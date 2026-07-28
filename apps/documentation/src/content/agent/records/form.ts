import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardFormGuidance } from './forms-shared.ts'

export const formAgentRecord = {
    schemaVersion: 1, component: 'H0Form', status: 'migrated', summary: 'Form coordinator for H0N fields with shared values, validation errors, reset behavior, and typed submit payloads.',
    imports: { components: ['H0Form'], types: ['H0FormEmits', 'H0FormErrors', 'H0FormInvalidPayload', 'H0FormProps', 'H0FormSubmitPayload', 'H0FormValue', 'H0FormValues'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'H0FormValues', default: '{}', description: 'Aggregate form values synchronized by field name.' }, { name: 'errors', type: 'H0FormErrors', default: '{}', description: 'Controlled field errors, including server errors.' },
        { name: 'validateOnSubmit', type: 'boolean', default: 'true', description: 'Runs registered and native constraint validation on submit.' }, { name: 'clearErrorOnInput', type: 'boolean', default: 'true', description: 'Clears a field error when its value changes.' },
        { name: 'novalidate', type: 'boolean', default: 'true', description: 'Disables native browser validation UI.' }, { name: 'id', type: 'string', default: "''", description: 'Native form id.' }, { name: 'name', type: 'string', default: "''", description: 'Native form name.' },
    ], events: [
        { name: 'update:modelValue', type: 'H0FormValues', description: 'Requests an aggregate values update when collected values differ.' }, { name: 'update:errors', type: 'H0FormErrors', description: 'Requests an error map update when errors differ.' },
        { name: 'change', type: 'H0FormValues', description: 'Reports one normalized aggregate update per field change or completed reset, but not submit.' }, { name: 'invalid', type: 'H0FormInvalidPayload', description: 'Reports failed validation.' },
        { name: 'reset', type: 'Event', description: 'Reports the native reset event; preventing it cancels coordinated reset.' }, { name: 'submit', type: 'H0FormSubmitPayload', description: 'Reports a valid submit.' },
    ], slots: [{ name: 'default', type: '{ errors, hasErrors, values, submit, reset, setErrors, clearFieldError }', description: 'Form contents and coordinator state.' }], exposed: [
        { name: 'submit', type: '() => void', description: 'Requests native form submission and coordinated validation.' }, { name: 'reset', type: '() => void', description: 'Requests native reset of registered and unregistered controls.' },
        { name: 'setErrors', type: '(errors: H0FormErrors) => H0FormErrors', description: 'Replaces field errors and returns the current map.' }, { name: 'clearFieldError', type: '(name: string) => void', description: 'Clears one error.' },
        { name: 'setFieldValue', type: '(name: string, value: H0FormValue) => void', description: 'Updates one value.' }, { name: 'getFieldError', type: '(name: string) => string | undefined', description: 'Reads one error.' },
        { name: 'collectValues', type: '() => H0FormValues', description: 'Collects registered and native values and synchronizes the model when they differ.' }, { name: 'registerField', type: '(name: string, getState: () => H0FormFieldState) => () => void', description: 'Registers a form-aware control and returns its cleanup function.' },
        { name: 'values', type: 'H0FormValues', description: 'Reactive values.' }, { name: 'errors', type: 'H0FormErrors', description: 'Reactive errors.' }, { name: 'hasErrors', type: 'boolean', description: 'Whether errors exist.' },
    ], types: [
        { name: 'H0FormValue', fields: [{ name: 'H0FormValue', type: 'string | number | boolean | File | null | Array<string | number | boolean | File | null>', description: 'One scalar or multi-value field.' }] },
        { name: 'H0FormValues', fields: [{ name: 'H0FormValues', type: 'Record<string, H0FormValue>', description: 'Normalized values keyed by field name.' }] },
        { name: 'H0FormErrors', fields: [{ name: 'H0FormErrors', type: 'Record<string, string>', description: 'Validation messages keyed by field name.' }] },
        { name: 'H0FormSubmitPayload', fields: [
            { name: 'event', type: 'SubmitEvent', description: 'Native submit event.' },
            { name: 'errors', type: 'H0FormErrors', description: 'Current validation errors.' },
            { name: 'formData', type: 'FormData', description: 'Native serialized form data.' },
            { name: 'valid', type: 'boolean', description: 'Whether validation passed.' },
            { name: 'values', type: 'H0FormValues', description: 'Normalized field values.' },
        ] },
        { name: 'H0FormInvalidPayload', fields: [{ name: 'H0FormInvalidPayload', type: 'H0FormSubmitPayload', description: 'Alias used by the invalid event.' }] },
    ] },
    useWhen: ['Several H0N controls need coordinated validation, reset, and submit state.'], avoidWhen: ['A native form without coordinated state is sufficient.'], ...standardFormGuidance,
    examples: [{ key: 'components/form/BasicExample', purpose: 'Coordinated values and submit.' }, { key: 'components/form/ValidationExample', purpose: 'Valid and invalid submission flows.' }, { key: 'components/form/ServerErrorsExample', purpose: 'Controlled server errors and reset.' }], relatedComponents: ['H0Field', 'H0Input', 'H0Button'],
} satisfies ComponentAgentRecordV1
