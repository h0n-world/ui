import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardFormGuidance } from './forms-shared.ts'

export const radioGroupAgentRecord = {
    schemaVersion: 1, component: 'H0RadioGroup', status: 'migrated', summary: 'Single-choice fieldset generated from options with responsive layout, validation, and custom option rendering.',
    imports: { components: ['H0RadioGroup'], types: ['H0RadioGroupEmits', 'H0RadioGroupProps', 'H0RadioGroupVariant', 'H0RadioOption', 'H0RadioOrientation', 'H0RadioValue'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'H0RadioValue', default: 'undefined', description: 'Controlled selected value.' }, { name: 'defaultValue', type: 'H0RadioValue', default: 'undefined', description: 'Initial selected value.' }, { name: 'options', type: 'H0RadioOption[]', default: '[]', description: 'Available choices.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Choice flow.' }, { name: 'variant', type: "'list' | 'cards'", default: "'list'", description: 'Choice presentation.' }, { name: 'columns', type: 'number', default: 'undefined', description: 'Card-grid column count.' },
        { name: 'label', type: 'string', default: "''", description: 'Fieldset legend.' }, { name: 'description', type: 'string', default: "''", description: 'Supporting copy.' }, { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all choices.' }, { name: 'required', type: 'boolean', default: 'false', description: 'Requires one choice.' },
        { name: 'error', type: 'string', default: "''", description: 'Validation error.' }, { name: 'validator', type: 'H0RadioValidator', default: 'undefined', description: 'Custom validator.' }, { name: 'invalidText', type: 'string', default: 'Localized', description: 'Fallback validation copy.' }, { name: 'id', type: 'string', default: "''", description: 'Fieldset id base.' }, { name: 'name', type: 'string', default: "''", description: 'Native radio name.' },
    ], events: [
        { name: 'update:modelValue', type: 'H0RadioValue | null', description: 'Requests selected value update.' }, { name: 'change', type: 'H0RadioValue', description: 'Reports selection.' }, { name: 'invalid', type: '[H0RadioValue | null, string]', description: 'Reports the value and validation message.' },
    ], slots: [
        { name: 'label', type: '—', description: 'Custom legend.' }, { name: 'description', type: '—', description: 'Custom description.' }, { name: 'option', type: '{ option, selected }', description: 'Custom option content.' },
    ], exposed: [{ name: 'validate', type: '() => boolean', description: 'Runs group validation.' }], types: [
        { name: 'H0RadioOrientation', fields: [{ name: 'H0RadioOrientation', type: "'vertical' | 'horizontal'", description: 'Supported option flow directions.' }] },
        { name: 'H0RadioGroupVariant', fields: [{ name: 'H0RadioGroupVariant', type: "'list' | 'cards'", description: 'Supported option presentations.' }] },
        { name: 'H0RadioOption', fields: [
            { name: 'title', type: 'string', description: 'Visible option title.' }, { name: 'value', type: 'H0RadioValue', description: 'Submitted value.' }, { name: 'description', type: 'string | undefined', description: 'Supporting copy.' }, { name: 'price', type: 'string | number | undefined', description: 'Optional price metadata.' }, { name: 'disabled', type: 'boolean | undefined', description: 'Disables this option.' },
        ] },
    ] },
    useWhen: ['A field offers one choice from a known option list.'], avoidWhen: ['A single boolean setting should use H0Switch or H0Checkbox.'], ...standardFormGuidance,
    examples: [{ key: 'components/radio/BasicExample', purpose: 'Card choices with metadata.' }, { key: 'components/radio/GroupExample', purpose: 'Horizontal list group.' }, { key: 'components/radio/ValidationExample', purpose: 'Required group and exposed validation.' }], relatedComponents: ['H0Radio', 'H0CheckboxGroup', 'H0Form'],
} satisfies ComponentAgentRecordV1
