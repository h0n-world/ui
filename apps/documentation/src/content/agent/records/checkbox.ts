import type { ComponentAgentRecordV1 } from '../schema.ts'
import { attributeRoutingProps, fieldProps, focusBlurEvents, standardFormGuidance } from './forms-shared.ts'

export const checkboxAgentRecord = {
    schemaVersion: 1,
    component: 'H0Checkbox',
    status: 'migrated',
    summary: 'Controlled or uncontrolled native boolean checkbox with surface variants, indeterminate, validation, sizing, and Form integration.',
    imports: { components: ['H0Checkbox'], types: ['H0CheckboxEmits', 'H0CheckboxProps', 'H0CheckboxSize', 'H0CheckboxVariant'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'modelValue', type: 'boolean', default: 'undefined', description: 'Controlled checked state.' },
            { name: 'defaultValue', type: 'boolean', default: 'false', description: 'Initial uncontrolled state.' },
            { name: 'size', type: 'H0CheckboxSize', default: "'md'", description: 'Checkbox and label size.' },
            { name: 'variant', type: 'H0CheckboxVariant', default: "'surface'", description: 'Unchecked box surface treatment.' },
            { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Visual mixed state.' },
            { name: 'value', type: 'string', default: "'on'", description: 'Native submitted checked value.' },
            ...fieldProps,
            ...attributeRoutingProps,
        ],
        events: [
            { name: 'update:modelValue', type: 'boolean', description: 'Requests checked-state update.' },
            { name: 'change', type: 'boolean', description: 'Reports user change.' },
            ...focusBlurEvents,
        ],
        slots: [{ name: 'default', type: '—', description: 'Custom label content.' }],
        exposed: [],
        types: [
            { name: 'H0CheckboxSize', fields: [{ name: 'H0CheckboxSize', type: "'sm' | 'md' | 'lg'", description: 'Supported standalone checkbox sizes.' }] },
            { name: 'H0CheckboxVariant', fields: [{ name: 'H0CheckboxVariant', type: "'surface' | 'secondary'", description: 'Unchecked box surface treatment.' }] },
        ],
    },
    useWhen: ['One independent boolean choice is required.'],
    avoidWhen: ['A setting takes effect immediately; consider H0Switch.'],
    ...standardFormGuidance,
    examples: [
        { key: 'components/checkbox/BasicExample', purpose: 'Controlled checkbox and group.' },
        { key: 'components/checkbox/VariantsExample', purpose: 'Surface and secondary standalone checkboxes.' },
        { key: 'components/checkbox/SizesExample', purpose: 'Small, medium, and large standalone checkboxes.' },
        { key: 'components/checkbox/StatesExample', purpose: 'Indeterminate aggregate and field states.' },
        { key: 'components/checkbox/GroupExample', purpose: 'Multiple values with H0CheckboxGroup.' },
    ],
    relatedComponents: ['H0CheckboxGroup', 'H0Switch', 'H0Form'],
} satisfies ComponentAgentRecordV1
