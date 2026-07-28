import type { ComponentAgentRecordV1 } from '../schema.ts'

export const toolbarItemAgentRecord = {
    schemaVersion: 1,
    component: 'H0ToolbarItem',
    status: 'migrated',
    summary: 'Compound toolbar command participating in the parent toolbar roving-focus sequence.',
    imports: {
        components: ['H0ToolbarItem'],
        types: ['H0ToolbarItemProps'],
        styles: ['@h0nio/ui/style.css'],
    },
    api: {
        props: [
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables activation and removes the command from roving focus.' },
            { name: 'pressed', type: 'boolean', default: 'undefined', description: 'Adds aria-pressed for an independent toggle command.' },
            { name: 'value', type: 'string | number', default: "''", description: 'Value emitted when the item is activated.' },
        ],
        events: [{ name: 'select', type: 'string | number', description: 'Emitted with value when the compound command is activated.' }],
        slots: [{ name: 'default', type: '—', description: 'Visible command label or custom content.' }],
        exposed: [],
        types: [],
    },
    useWhen: ['A compound toolbar command needs its own markup, state, or event handler.', 'Commands are organized with H0ToolbarGroup or H0ToolbarSeparator.'],
    avoidWhen: ['Uniform commands can be expressed more simply with the H0Toolbar items prop.', 'The control is rendered outside H0Toolbar.', 'The interaction represents one selected value rather than a command.'],
    accessibility: ['Keep visible content concise and understandable.', 'Use pressed only for toggle commands.', 'Let the parent toolbar manage tabindex and arrow-key focus.'],
    styling: ['Use the parent toolbar appearance and public tokens.', 'Treat data-h-toolbar-item as an implementation detail.'],
    responsive: ['Items inherit size, orientation, and full-width behavior from H0Toolbar.', 'Keep labels short enough for the available toolbar width.'],
    performance: ['Use stable values and avoid recreating complex slot content unnecessarily.'],
    examples: [{ key: 'components/toolbar/CompoundExample', purpose: 'Compound commands with local select handlers.' }],
    relatedComponents: ['H0Toolbar', 'H0ToolbarGroup', 'H0ToolbarSeparator'],
} satisfies ComponentAgentRecordV1
