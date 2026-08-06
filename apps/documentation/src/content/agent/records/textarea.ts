import type { ComponentAgentRecordV1 } from '../schema.ts'
import { attributeRoutingProps, fieldProps, focusBlurEvents, standardFormGuidance } from './forms-shared.ts'

export const textareaAgentRecord = {
    schemaVersion: 1,
    component: 'H0Textarea',
    status: 'migrated',
    summary: 'Multiline text control with automatic height, optional manual resizing, character count, and shared H0N form feedback.',
    imports: { components: ['H0Textarea'], types: ['H0TextareaEmits', 'H0TextareaInputMode', 'H0TextareaProps', 'H0TextareaSize', 'H0TextareaVariant'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'modelValue', type: 'string', default: 'undefined', description: 'Controlled text.' },
            { name: 'defaultValue', type: 'string', default: "''", description: 'Initial uncontrolled text.' },
            { name: 'size', type: 'H0TextareaSize', default: "'md'", description: 'Control size.' },
            { name: 'variant', type: 'H0TextareaVariant', default: "'surface'", description: 'Control background treatment.' },
            { name: 'placeholder', type: 'string', default: "''", description: 'Empty control copy.' },
            { name: 'readonly', type: 'boolean', default: 'false', description: 'Prevents editing while preserving focus.' },
            { name: 'autocomplete', type: 'string', default: "''", description: 'Native autocomplete hint.' },
            { name: 'inputmode', type: 'H0TextareaInputMode', default: 'undefined', description: 'Virtual keyboard hint.' },
            { name: 'maxlength', type: 'number', default: 'undefined', description: 'Native character limit and counter source.' },
            { name: 'minRows', type: 'number', default: '2', description: 'Minimum visible rows.' },
            { name: 'maxHeight', type: 'number | string', default: '220', description: 'Automatic resize ceiling.' },
            { name: 'resize', type: 'boolean', default: 'false', description: 'Allows manual vertical resizing.' },
            { name: 'autoResize', type: 'boolean', default: 'true', description: 'Fits height to content.' },
            { name: 'spellcheck', type: 'boolean', default: 'true', description: 'Enables browser spellcheck.' },
            ...fieldProps,
            ...attributeRoutingProps,
        ],
        events: [
            { name: 'update:modelValue', type: 'string', description: 'Requests text update.' },
            { name: 'input', type: 'Event', description: 'Reports native input.' },
            { name: 'change', type: 'string', description: 'Reports every text update.' },
            ...focusBlurEvents,
        ],
        slots: [{ name: 'label', type: '—', description: 'Custom label.' }],
        exposed: [],
        types: [
            { name: 'H0TextareaInputMode', fields: [{ name: 'H0TextareaInputMode', type: "'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url'", description: 'Supported native virtual-keyboard hints.' }] },
            { name: 'H0TextareaSize', fields: [{ name: 'H0TextareaSize', type: "'sm' | 'md' | 'lg'", description: 'Supported control sizes.' }] },
            { name: 'H0TextareaVariant', fields: [{ name: 'H0TextareaVariant', type: "'secondary' | 'surface'", description: 'Supported control surface treatments.' }] },
        ],
    },
    useWhen: ['A form accepts free-form multiline text.'],
    avoidWhen: ['A single short value fits H0Input.'],
    ...standardFormGuidance,
    examples: [
        { key: 'components/textarea/BasicExample', purpose: 'Auto-resizing message with character count.' },
        { key: 'components/textarea/VariantsExample', purpose: 'Surface and secondary control treatments.' },
        { key: 'components/textarea/SizesExample', purpose: 'Small, medium, and large controls.' },
        { key: 'components/textarea/ResizeExample', purpose: 'Automatic and manual resizing.' },
        { key: 'components/textarea/StatesExample', purpose: 'Read-only, disabled, invalid, and spellcheck states.' },
    ],
    relatedComponents: ['H0Input', 'H0Form'],
} satisfies ComponentAgentRecordV1
