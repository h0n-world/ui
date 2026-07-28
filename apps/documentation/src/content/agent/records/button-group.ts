import type { ComponentAgentRecordV1 } from '../schema.ts'

export const buttonGroupAgentRecord = {
    schemaVersion: 1,
    component: 'H0ButtonGroup',
    status: 'migrated',
    summary: 'Accessible group of adjacent H0Button controls for a short set of closely related actions.',
    imports: {
        components: ['H0ButtonGroup'],
        types: ['H0ButtonGroupEmits', 'H0ButtonGroupItem', 'H0ButtonGroupProps'],
        styles: ['@h0nio/ui/style.css'],
    },
    api: {
        props: [
            { name: 'variant', type: 'H0ButtonVariant', default: "'solid'", description: 'Shared visual emphasis passed to each button.' },
            { name: 'tone', type: 'H0ButtonTone', default: "'default'", description: 'Shared semantic intent passed to each button.' },
            { name: 'size', type: 'H0ButtonSize', default: "'md'", description: 'Shared size passed to each button.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables items that do not provide their own disabled value.' },
            { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Makes the group fill its container and distributes items evenly.' },
            { name: 'buttons', type: 'H0ButtonGroupItem[]', default: '[{}, {}, {}]', description: 'Defines item count, fallback labels, slot names, keys, and per-item overrides.' },
            { name: 'ariaLabel', type: 'string', default: "'Button group'", description: 'Accessible name applied to the root role="group".' },
        ],
        events: [{ name: 'button-click', type: '[button: H0ButtonGroupItem, index: number]', description: 'Emitted after an enabled, non-loading button is activated.' }],
        slots: [
            { name: 'btn-1, btn-2, btn-3', type: '{ button: H0ButtonGroupItem, index: number }', description: 'Default named slots created by the default three-item configuration.' },
            { name: 'Custom item slot', type: '{ button: H0ButtonGroupItem, index: number }', description: "Any name assigned through an item's slot field." },
        ],
        exposed: [],
        types: [
            {
                name: 'H0ButtonGroupItem',
                description: 'Configuration for one rendered button.',
                fields: [
                    { name: 'key', type: 'string', default: 'Generated slot name', description: 'Stable Vue key for the item.' },
                    { name: 'label', type: 'string', default: "'Button 1', …", description: 'One-based fallback label when the matching slot is not provided.' },
                    { name: 'slot', type: 'string', default: "'btn-1', …", description: 'One-based generated slot name used to render the item content.' },
                    { name: 'variant', type: 'H0ButtonVariant', default: 'Group variant', description: 'Overrides the group appearance for this item.' },
                    { name: 'tone', type: 'H0ButtonTone', default: 'Group tone', description: 'Overrides the group semantic tone for this item.' },
                    { name: 'size', type: 'H0ButtonSize', default: 'Group size', description: 'Overrides the group size for this item.' },
                    { name: 'disabled', type: 'boolean', default: 'Group disabled', description: 'Overrides the inherited disabled state.' },
                    { name: 'loading', type: 'boolean', default: 'false', description: 'Displays the button spinner and prevents interaction.' },
                    { name: 'loadingText', type: 'string', default: 'undefined', description: 'Replaces the item content while loading.' },
                    { name: 'fullWidth', type: 'boolean', default: 'Group fullWidth', description: 'Overrides the inherited full-width behavior.' },
                ],
            },
            {
                name: 'H0ButtonGroupEmits',
                description: 'Named events emitted by the group.',
                fields: [{ name: 'button-click', type: '[button: H0ButtonGroupItem, index: number]', description: 'Payload emitted when an enabled, non-loading item is activated.' }],
            },
        ],
    },
    useWhen: ['A short row of actions belongs to the same task or object.', 'Actions need connected edges, shared appearance, and coordinated sizing.'],
    avoidWhen: ['Commands are unrelated.', 'The control represents a single selected value; use H0Segment, radio controls, or another selection component.', 'Only one action is present.'],
    accessibility: ['Provide a concise ariaLabel describing the relationship between actions.', 'Keep every visible item label clear and action-oriented.', 'Preserve the logical order of the buttons array because it defines keyboard order.'],
    styling: ['Use group props and public H0N design tokens before local styles.', 'Treat .h-button-group, its elements, and --h-button-group-separator as implementation details.'],
    responsive: ['Use fullWidth when the group should fill a narrow container.', 'Keep the number of adjacent actions small enough to fit without clipping.'],
    performance: ['Keep the buttons array stable when its contents have not changed.', 'Use stable item keys for data-driven groups.'],
    examples: [
        { key: 'components/button-group/BasicExample', purpose: 'Default connected action group.' },
        { key: 'components/button-group/AppearanceExample', purpose: 'Supported tones and variants.' },
        { key: 'components/button-group/SizesExample', purpose: 'Shared size propagation.' },
        { key: 'components/button-group/ConfigurationExample', purpose: 'Data-driven items, named slots, and emitted actions.' },
        { key: 'components/button-group/StatesExample', purpose: 'Inherited and item-level disabled and loading states.' },
        { key: 'components/button-group/FullWidthExample', purpose: 'Equal-width actions in a fluid group.' },
    ],
    relatedComponents: ['H0Button', 'H0Segment'],
} satisfies ComponentAgentRecordV1
