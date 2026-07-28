import type { ComponentAgentRecordV1 } from '../schema.ts'
import { attributeRoutingProps, standardFormGuidance } from './forms-shared.ts'

export const searchFieldAgentRecord = {
    schemaVersion: 1, component: 'H0SearchField', status: 'migrated', summary: 'Compact native search control with clear action, controlled value, icon customization, and imperative focus helpers.',
    imports: { components: ['H0SearchField'], types: ['H0SearchFieldEmits', 'H0SearchFieldProps', 'H0SearchFieldVariant'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'string', default: 'undefined', description: 'Controlled query.' }, { name: 'defaultValue', type: 'string', default: "''", description: 'Initial query.' }, { name: 'variant', type: "'secondary' | 'surface'", default: "'surface'", description: 'Shared H0Input background treatment.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'sm'", description: 'Shared H0Input control size.' }, { name: 'label', type: 'string', default: "''", description: 'Visible field label.' }, { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Empty control copy.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the field.' }, { name: 'readonly', type: 'boolean', default: 'false', description: 'Prevents editing.' }, { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' }, { name: 'error', type: 'string', default: "''", description: 'Visible validation error.' }, { name: 'hint', type: 'string', default: "''", description: 'Supporting field description.' }, { name: 'clearable', type: 'boolean', default: 'true', description: 'Shows a clear action.' },
        { name: 'id', type: 'string', default: "''", description: 'Control id.' }, { name: 'name', type: 'string', default: "''", description: 'Form field name.' }, { name: 'autocomplete', type: 'string', default: "'off'", description: 'Native autocomplete hint.' }, { name: 'ariaLabel', type: 'string', default: "''", description: 'Accessible name override.' }, ...attributeRoutingProps,
    ], events: [{ name: 'update:modelValue', type: 'string', description: 'Requests query update.' }, { name: 'input', type: '[string, Event]', description: 'Reports native input.' }, { name: 'clear', type: '—', description: 'Reports clearing.' }, { name: 'focus', type: 'FocusEvent', description: 'Reports focus.' }, { name: 'blur', type: 'FocusEvent', description: 'Reports blur.' }], slots: [{ name: 'icon', type: '—', description: 'Custom search icon.' }], exposed: [
        { name: 'clear', type: '() => void', description: 'Clears the query.' }, { name: 'focus', type: '() => void', description: 'Focuses the input.' }, { name: 'setValue', type: '(value: string) => void', description: 'Sets the query.' },
    ], types: [
        { name: 'H0SearchFieldVariant', fields: [{ name: 'H0SearchFieldVariant', type: "'secondary' | 'surface'", description: 'Supported search-field surface treatments.' }] },
    ] },
    useWhen: ['Users filter or search content with a compact query field.'], avoidWhen: ['A fixed option selection is required; use H0Select.'], ...standardFormGuidance,
    examples: [{ key: 'components/search-field/BasicExample', purpose: 'Clearable controlled search.' }, { key: 'components/search-field/VariantsExample', purpose: 'Surface variants and interaction states.' }, { key: 'components/search-field/ApiExample', purpose: 'Input events and imperative helpers.' }], relatedComponents: ['H0Select', 'H0Input'],
} satisfies ComponentAgentRecordV1
