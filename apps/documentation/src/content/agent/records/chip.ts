import type { ComponentAgentRecordV1 } from '../schema.ts'

export const chipAgentRecord = {
    schemaVersion: 1, component: 'H0Chip', status: 'migrated', summary: 'Selectable and optionally removable token with separate primary and remove actions.',
    imports: { components: ['H0Chip'], types: ['H0ChipEmits', 'H0ChipProps', 'H0ChipTone'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'tone', type: 'H0ChipTone', default: "'default'", description: 'Color intent used most visibly when selected.' },
            { name: 'selected', type: 'boolean', default: 'false', description: 'Controls aria-pressed and selected appearance.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables primary and remove buttons.' },
            { name: 'removable', type: 'boolean', default: 'false', description: 'Renders a separate remove button.' },
            { name: 'text', type: 'string', default: "''", description: 'Fallback primary label used when the default slot is absent.' },
            { name: 'ariaLabel', type: 'string', default: "''", description: 'Optional accessible name for the primary button.' },
            { name: 'removeAriaLabel', type: 'string', default: "'Remove'", description: 'Accessible name for the remove button.' },
        ],
        events: [{ name: 'click', type: 'MouseEvent', description: 'Emitted from the primary action without changing selected automatically.' }, { name: 'remove', type: 'MouseEvent', description: 'Emitted after propagation is stopped, without also emitting click or updating the collection.' }],
        slots: [{ name: 'default', type: '—', description: 'Visible primary button content, overriding text.' }], exposed: [],
        types: [{ name: 'H0ChipTone', fields: [{ name: 'H0ChipTone', type: "'default' | 'primary' | 'success' | 'warning' | 'danger'", description: 'Supported chip tones.' }] }],
    },
    useWhen: ['A filter or token needs selected state.', 'A token can be removed from a collection.'], avoidWhen: ['The label is purely informational; use H0Badge.', 'Only one binary setting exists; use H0Switch.', 'Exactly one option must remain selected; use H0RadioGroup or H0Segment.'],
    accessibility: ['Keep the visible label descriptive.', 'Give remove buttons contextual removeAriaLabel values.', 'Selected state is exposed through aria-pressed.', 'A removable chip has two separately focusable buttons.'],
    styling: ['Use tone and selected.', 'Treat chip element selectors as implementation details.'], responsive: ['Wrap chip collections in consumer layout.'],
    performance: ['Use stable keys when rendering removable collections.'],
    examples: [{ key: 'components/chip/SelectionExample', purpose: 'Application-owned independent filters across all tones.' }, { key: 'components/chip/RemovalExample', purpose: 'Contextual removal and disabled state.' }],
    relatedComponents: ['H0Badge', 'H0RadioGroup', 'H0Segment', 'H0Switch'],
} satisfies ComponentAgentRecordV1
