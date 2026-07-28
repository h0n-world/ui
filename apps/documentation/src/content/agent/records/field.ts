import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardFormGuidance } from './forms-shared.ts'

export const fieldAgentRecord = {
    schemaVersion: 1, component: 'H0Field', status: 'migrated', summary: 'Form layout primitive that connects a label, control, hint, and validation error through accessible attributes.',
    imports: { components: ['H0Field'], types: ['H0FieldProps', 'H0Orientation'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'id', type: 'string', default: "''", description: 'Identifier shared with the slotted control.' }, { name: 'name', type: 'string', default: "''", description: 'Field name exposed to the slot.' },
        { name: 'label', type: 'string', default: "''", description: 'Visible field label.' }, { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Marks the field as disabled.' }, { name: 'error', type: 'string', default: "''", description: 'Validation error.' },
        { name: 'hint', type: 'string', default: "''", description: 'Supporting description.' }, { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Label and control layout.' },
    ], events: [], slots: [
        { name: 'default', type: '{ controlAttrs, id, messageId, invalid }', description: 'Form control with generated accessibility attributes.' }, { name: 'label', type: '—', description: 'Custom label.' },
        { name: 'error', type: '—', description: 'Custom error content.' }, { name: 'hint', type: '—', description: 'Custom hint content.' },
    ], exposed: [], types: [
        { name: 'H0Orientation', fields: [{ name: 'H0Orientation', type: "'horizontal' | 'vertical'", description: 'Shared layout orientation accepted by Field.' }] },
    ] },
    useWhen: ['A custom control needs the same label, hint, and error contract as built-in fields.'], avoidWhen: ['A built-in H0N form control already provides the complete field shell.'], ...standardFormGuidance,
    examples: [{ key: 'components/field/BasicExample', purpose: 'Context composition with H0Input.' }, { key: 'components/field/LayoutExample', purpose: 'Vertical, horizontal, and validation layouts.' }, { key: 'components/field/SlotsExample', purpose: 'Custom label and hint content.' }], relatedComponents: ['H0Form', 'H0Input', 'H0Label'],
} satisfies ComponentAgentRecordV1
