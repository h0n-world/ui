import type { ComponentAgentRecordV1 } from '../schema.ts'
import { attributeRoutingProps, standardFormGuidance } from './forms-shared.ts'

export const radioAgentRecord = {
    schemaVersion: 1, component: 'H0Radio', status: 'migrated', summary: 'Standalone native radio control with surface variants, label, description, validation, and programmatic focus.',
    imports: { components: ['H0Radio'], types: ['H0RadioEmits', 'H0RadioProps', 'H0RadioValidator', 'H0RadioValue', 'H0RadioVariant'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'H0RadioValue', default: 'undefined', description: 'Controlled selected value.' }, { name: 'defaultValue', type: 'H0RadioValue', default: 'undefined', description: 'Initial selected value.' }, { name: 'value', type: 'H0RadioValue', description: 'Value represented by this radio.' }, { name: 'variant', type: 'H0RadioVariant', default: "'surface'", description: 'Unchecked indicator surface treatment.' },
        { name: 'label', type: 'string', default: "''", description: 'Visible label.' }, { name: 'description', type: 'string', default: "''", description: 'Supporting copy.' }, { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables selection.' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Marks selection as required.' }, { name: 'error', type: 'string', default: "''", description: 'Validation error.' }, { name: 'validator', type: 'H0RadioValidator', default: 'undefined', description: 'Custom value validator.' },
        { name: 'invalidText', type: 'string', default: 'Localized', description: 'Fallback validation copy.' }, { name: 'ariaLabel', type: 'string', default: "''", description: 'Accessible label when visible copy is absent.' }, { name: 'id', type: 'string', default: "''", description: 'Control id.' }, { name: 'name', type: 'string', default: "''", description: 'Native group name.' }, ...attributeRoutingProps,
    ], events: [
        { name: 'update:modelValue', type: 'H0RadioValue', description: 'Requests selected value update.' }, { name: 'change', type: '[H0RadioValue, Event]', description: 'Reports native selection.' },
    ], slots: [{ name: 'default', type: '—', description: 'Custom label.' }, { name: 'description', type: '—', description: 'Custom description.' }], exposed: [
        { name: 'focus', type: '() => void', description: 'Focuses the radio.' }, { name: 'validate', type: '() => boolean', description: 'Runs validation.' },
    ], types: [
        { name: 'H0RadioValue', fields: [{ name: 'H0RadioValue', type: 'string | number', description: 'Supported option and model value.' }] },
        { name: 'H0RadioVariant', fields: [{ name: 'H0RadioVariant', type: "'surface' | 'secondary'", description: 'Unchecked indicator surface treatment.' }] },
        { name: 'H0RadioValidator', fields: [{ name: 'H0RadioValidator', type: '(value: H0RadioValue | null | undefined) => boolean | string', description: 'Returns true for valid selection, false for fallback feedback, or a custom message.' }] },
    ] },
    useWhen: ['A radio participates in a custom composition not driven by an options array.'], avoidWhen: ['Several choices form one field; prefer H0RadioGroup.'], ...standardFormGuidance,
    examples: [{ key: 'components/radio/BasicExample', purpose: 'Standalone and card choices.' }, { key: 'components/radio/VariantsExample', purpose: 'Surface and secondary standalone radios.' }, { key: 'components/radio/GroupExample', purpose: 'Horizontal list group.' }, { key: 'components/radio/ValidationExample', purpose: 'Required card group and exposed validation.' }], relatedComponents: ['H0RadioGroup', 'H0Form'],
} satisfies ComponentAgentRecordV1
