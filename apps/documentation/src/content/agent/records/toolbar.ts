import type { ComponentAgentRecordV1 } from '../schema.ts'

export const toolbarAgentRecord = {
    schemaVersion: 1,
    component: 'H0Toolbar',
    status: 'migrated',
    summary: 'Keyboard-navigable command surface for a compact set of related actions.',
    imports: {
        components: ['H0Toolbar'],
        types: ['H0Size', 'H0ToolbarEmits', 'H0ToolbarItemDefinition', 'H0ToolbarOrientation', 'H0ToolbarProps'],
        styles: ['@h0nio/ui/style.css'],
    },
    api: {
        props: [
            { name: 'items', type: 'readonly H0ToolbarItemDefinition[]', default: '[]', description: 'Provides data-driven toolbar buttons. Do not combine with compound children.' },
            { name: 'orientation', type: 'H0ToolbarOrientation', default: "'horizontal'", description: 'Controls layout, aria-orientation, and the arrow keys used for navigation.' },
            { name: 'size', type: 'H0Size', default: "'md'", description: 'Controls command height, padding, and typography and is inherited by compound items.' },
            { name: 'loop', type: 'boolean', default: 'true', description: 'Wraps arrow-key focus from the last enabled item to the first and back.' },
            { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Fills the available width and distributes data items or compound children.' },
            { name: 'ariaLabel', type: 'string', default: "''", description: 'Accessible toolbar name. Falls back to the localized toolbar label.' },
        ],
        events: [{ name: 'select', type: 'H0ToolbarItemDefinition', description: 'Emitted with the original item after a data-driven button is activated.' }],
        slots: [
            { name: 'default', type: '—', description: 'Compound H0ToolbarGroup, H0ToolbarItem, and H0ToolbarSeparator children. Rendered only when items is empty.' },
            { name: 'item', type: '{ item: H0ToolbarItemDefinition, index: number }', description: 'Custom content for every data-driven toolbar button.' },
        ],
        exposed: [],
        types: [
            {
                name: 'H0ToolbarItemDefinition',
                description: 'Configuration for one data-driven toolbar action.',
                fields: [
                    { name: 'value', type: 'string | number', default: 'Required', description: 'Stable, unique item identity, Vue key, and application value.' },
                    { name: 'label', type: 'string', default: 'Required', description: 'Visible fallback content for the item button.' },
                    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables activation and removes the item from roving focus.' },
                    { name: 'pressed', type: 'boolean', default: 'undefined', description: 'Adds aria-pressed for an independent toggle action.' },
                ],
            },
            {
                name: 'H0ToolbarOrientation',
                description: 'Supported toolbar layout and keyboard-navigation axes.',
                fields: [{ name: 'H0ToolbarOrientation', type: "'horizontal' | 'vertical'", description: 'Horizontal uses Left and Right Arrow; vertical uses Up and Down Arrow.' }],
            },
            {
                name: 'H0Size',
                description: 'Shared H0N component size scale.',
                fields: [{ name: 'H0Size', type: "'sm' | 'md' | 'lg'", description: 'Supported compact, default, and large control sizes.' }],
            },
            {
                name: 'H0ToolbarEmits',
                description: 'Named events emitted in data-driven mode.',
                fields: [{ name: 'select', type: '[item: H0ToolbarItemDefinition]', description: 'Payload emitted when an enabled data-driven item is activated.' }],
            },
        ],
    },
    useWhen: ['A compact set of commands belongs to one task or editor surface.', 'Users should enter the command set with one Tab stop and move within it using arrow keys.', 'Actions need data-driven or explicitly grouped compound composition.'],
    avoidWhen: ['Actions are unrelated or distributed across a layout.', 'The interface represents one selected value; use H0Segment or radio controls.', 'A single action can use H0Button.', 'Commands need menu-style disclosure rather than remaining directly available.'],
    accessibility: ['Provide a specific ariaLabel for the command set.', 'Use pressed only for independent toggle actions.', 'Preserve DOM order because it defines visual and keyboard order.', 'Horizontal toolbars use Left and Right Arrow; vertical toolbars use Up and Down Arrow; both support Home and End.'],
    styling: ['Prefer public H0N tokens and surrounding layout styles.', 'Treat toolbar classes and data-h-toolbar-item as implementation details.'],
    responsive: [
        'Toolbars intentionally do not wrap commands.',
        'Use shorter labels, vertical orientation, or an explicit scroll container on narrow screens.',
        'H0ToolbarSeparator automatically renders a perpendicular boundary for the current toolbar orientation.',
    ],
    performance: ['Keep item arrays and item objects stable when values do not change.', 'Keyboard queries are scoped to enabled toolbar items inside the root.'],
    examples: [
        { key: 'components/toolbar/BasicExample', purpose: 'Data-driven toggle commands and select handling.' },
        { key: 'components/toolbar/StatesExample', purpose: 'Disabled commands and roving-focus behavior.' },
        { key: 'components/toolbar/ItemSlotExample', purpose: 'Custom data-driven command content and shortcut hints.' },
        { key: 'components/toolbar/OrientationExample', purpose: 'Horizontal looping and vertical non-looping keyboard navigation.' },
        { key: 'components/toolbar/SizesExample', purpose: 'Small, medium, and large toolbar sizing.' },
        { key: 'components/toolbar/FullWidthExample', purpose: 'Equal-width data items and compound command groups in fluid toolbars.' },
        { key: 'components/toolbar/CompoundExample', purpose: 'Explicit groups, items, separators, and compound item events.' },
    ],
    relatedComponents: ['H0Button', 'H0ButtonGroup', 'H0Segment'],
} satisfies ComponentAgentRecordV1
