import type { ComponentAgentRecordV1 } from '../schema.ts'

export const labelAgentRecord = {
    schemaVersion: 1, component: 'H0Label', status: 'migrated', summary: 'Consistent form label preset supporting label, legend, and span semantics.',
    imports: { components: ['H0Label'], types: ['H0LabelElement', 'H0LabelProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'as', type: 'H0LabelElement', default: "'label'", description: 'Rendered label, legend, or span.' }, { name: 'htmlFor', type: 'string', default: "''", description: 'Control ID applied only when rendering label; ignored for legend and span.' },
        { name: 'text', type: 'string | number', default: "''", description: 'String or numeric fallback used when the default slot is absent.' }, { name: 'required', type: 'boolean', default: 'false', description: 'Adds an aria-hidden visual asterisk without changing control state.' },
    ], events: [], slots: [{ name: 'default', type: '—', description: 'Visible label content that takes precedence over text.' }], exposed: [], types: [
        { name: 'H0LabelElement', fields: [{ name: 'H0LabelElement', type: "'label' | 'legend' | 'span'", description: 'Supported control, group, and component-owned label elements.' }] },
    ] },
    useWhen: ['A form control or fieldset needs a visible label.', 'A component-owned relationship needs consistent label typography.'], avoidWhen: ['Text is a page heading or arbitrary caption.'],
    accessibility: ['Associate label with exactly one labelable control.', 'Keep legend directly inside fieldset for groups.', 'Reference span labels explicitly through aria-labelledby.', 'Required is visual only; set control required or aria-required separately.'], styling: ['Label presentation is intentionally constrained.'],
    responsive: ['Allow long labels to wrap.'], performance: ['Use stable unique control IDs.'], examples: [{ key: 'components/label/SemanticsExample', purpose: 'label, legend, and span usage.' }],
    relatedComponents: ['H0Description', 'H0ErrorMessage', 'H0Field', 'H0Input', 'H0RadioGroup', 'H0Typography'],
} satisfies ComponentAgentRecordV1
