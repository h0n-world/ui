import type { ComponentAgentRecordV1 } from '../schema.ts'

export const toolbarGroupAgentRecord = {
    schemaVersion: 1,
    component: 'H0ToolbarGroup',
    status: 'migrated',
    summary: 'Accessible subgroup for related compound toolbar commands.',
    imports: {
        components: ['H0ToolbarGroup'],
        types: ['H0ToolbarGroupProps'],
        styles: ['@h0nio/ui/style.css'],
    },
    api: {
        props: [{ name: 'ariaLabel', type: 'string', default: "''", description: 'Optional accessible name for this related subset of toolbar commands.' }],
        events: [],
        slots: [{ name: 'default', type: '—', description: 'H0ToolbarItem controls belonging to the subgroup.' }],
        exposed: [],
        types: [],
    },
    useWhen: ['A compound toolbar contains distinct subsets of related commands.', 'A subset benefits from its own accessible name.'],
    avoidWhen: ['The toolbar has one undivided set of actions.', 'The group would be rendered outside H0Toolbar.'],
    accessibility: ['Provide ariaLabel when the subgroup relationship is not obvious from surrounding context.', 'Keep grouped commands adjacent in DOM and visual order.'],
    styling: ['Use H0ToolbarSeparator between major groups when a visual boundary is needed.', 'Treat .h-toolbar-group as an implementation detail.'],
    responsive: ['Groups inherit orientation and full-width behavior from H0Toolbar.', 'Keep groups compact and preserve their command order on narrow screens.'],
    performance: ['Avoid unnecessary wrapper groups that do not convey a meaningful relationship.'],
    examples: [{ key: 'components/toolbar/CompoundExample', purpose: 'Named history and clipboard command groups inside one toolbar.' }],
    relatedComponents: ['H0Toolbar', 'H0ToolbarItem', 'H0ToolbarSeparator'],
} satisfies ComponentAgentRecordV1
