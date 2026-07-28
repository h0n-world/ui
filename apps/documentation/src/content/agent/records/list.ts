import type { ComponentAgentRecordV1 } from '../schema.ts'

export const listAgentRecord = {
    schemaVersion: 1, component: 'H0List', status: 'migrated', summary: 'Grouped collection wrapper with optional accessible label, spacing, and item separators.',
    imports: { components: ['H0List'], types: ['H0ListGap', 'H0ListProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'divided', type: 'boolean', default: 'true', description: 'Adds separators between H0ListItem children.' }, { name: 'label', type: 'string', default: "''", description: 'Visible label that also names the group.' },
        { name: 'gap', type: 'H0ListGap', default: "'none'", description: 'Spacing between label and rows and between rows.' },
    ], events: [], slots: [{ name: 'label', type: '—', description: 'Custom visible group label.' }, { name: 'default', type: '—', description: 'H0ListItem children or other row content.' }], exposed: [], types: [
        { name: 'H0ListGap', fields: [{ name: 'H0ListGap', type: "'none' | 'sm' | 'md'", description: 'Supported spacing presets between labels and rows.' }] },
    ] },
    useWhen: ['Actions, navigation, or rich rows form a visual group.'], avoidWhen: ['Label/value metadata belongs in a semantic definition list.', 'Native ordered or unordered prose lists are sufficient.'],
    accessibility: ['Provide label when the collection needs a group name.', 'The root is a div and does not provide ul or ol semantics.', 'Choose correct semantics on each item.'], styling: ['Use gap and divided.', 'Treat list selectors as implementation details.'],
    responsive: ['Let the list fill its container.'], performance: ['Keep long item collections virtualized outside the component when necessary.'],
    examples: [{ key: 'components/list/ContentExample', purpose: 'Labeled list of navigational rows with primary, secondary, and end content.' }, { key: 'components/list/NavigationExample', purpose: 'Native anchor and RouterLink navigation roots.' }], relatedComponents: ['H0ListItem'],
} satisfies ComponentAgentRecordV1
