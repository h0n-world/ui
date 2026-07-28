import type { ComponentAgentRecordV1 } from '../schema.ts'
import { attributeRoutingProps, fieldProps, focusBlurEvents, standardFormGuidance } from './forms-shared.ts'

export const switchAgentRecord = {
    schemaVersion: 1, component: 'H0Switch', status: 'migrated', summary: 'Immediate boolean setting control with native checkbox semantics, switch role, label, hint, and validation state.',
    imports: { components: ['H0Switch'], types: ['H0SwitchEmits', 'H0SwitchProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'boolean', default: 'undefined', description: 'Controlled checked state.' }, { name: 'defaultValue', type: 'boolean', default: 'false', description: 'Initial state.' }, { name: 'value', type: 'string', default: "'on'", description: 'Native submitted value.' }, ...fieldProps, ...attributeRoutingProps,
    ], events: [{ name: 'update:modelValue', type: 'boolean', description: 'Requests state update.' }, { name: 'change', type: 'boolean', description: 'Reports state change.' }, ...focusBlurEvents], slots: [{ name: 'default', type: '—', description: 'Custom visible label.' }], exposed: [], types: [] },
    useWhen: ['A boolean setting takes effect immediately.'], avoidWhen: ['Users select items for later submission; use H0Checkbox.'], ...standardFormGuidance,
    examples: [{ key: 'components/switch/BasicExample', purpose: 'Controlled boolean preference.' }, { key: 'components/switch/StatesExample', purpose: 'Checked, disabled, invalid, and custom-label states.' }, { key: 'components/switch/FormExample', purpose: 'Named switch collected by H0Form.' }], relatedComponents: ['H0Checkbox', 'H0Form'],
} satisfies ComponentAgentRecordV1
