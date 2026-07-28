import type { ComponentAgentRecordV1 } from '../schema.ts'

export const listItemAgentRecord = {
    schemaVersion: 1, component: 'H0ListItem', status: 'migrated', summary: 'Interactive or static polymorphic row with structured text, start/end slots, state, and sizing.',
    imports: { components: ['H0ListItem'], types: ['H0ListItemBorderRadius', 'H0ListItemElement', 'H0ListItemProps', 'H0ListItemSize'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'title', type: 'string', default: "''", description: 'Fallback primary text.' }, { name: 'description', type: 'string', default: "''", description: 'Fallback secondary text.' }, { name: 'value', type: 'string', default: "''", description: 'Fallback trailing text.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables native buttons or applies blocked aria-disabled behavior to other roots.' }, { name: 'active', type: 'boolean', default: 'false', description: 'Applies visual active state without adding selection semantics.' },
        { name: 'interactive', type: 'boolean', default: 'true', description: 'Enables button default, focus, hover, pointer, and ripple behavior.' }, { name: 'as', type: 'H0ListItemElement', default: 'button when interactive, otherwise div', description: 'Polymorphic root element or component.' },
        { name: 'size', type: 'H0ListItemSize', default: "'md'", description: 'Small, medium, or large minimum row height.' }, { name: 'borderRadius', type: 'H0ListItemBorderRadius', default: '0', description: 'CSS radius; numbers become pixels.' },
    ], events: [], slots: [
        { name: 'start', type: '—', description: 'Leading icon, avatar, or media.' }, { name: 'default', type: '—', description: 'Custom main content replacing built-in title and description.' },
        { name: 'title', type: '—', description: 'Custom primary content.' }, { name: 'description', type: '—', description: 'Custom secondary content.' }, { name: 'end', type: '—', description: 'Trailing value, icon, or metadata.' },
    ], exposed: [], types: [
        { name: 'H0ListItemSize', fields: [{ name: 'H0ListItemSize', type: "'sm' | 'md' | 'lg'", description: 'Supported minimum row-height presets.' }] },
        { name: 'H0ListItemBorderRadius', fields: [{ name: 'H0ListItemBorderRadius', type: 'number | string', description: 'CSS radius value; numbers become pixels.' }] },
        { name: 'H0ListItemElement', fields: [{ name: 'H0ListItemElement', type: 'string | Component', description: 'Native element tag or Vue component used as the root.' }] },
    ] },
    useWhen: ['A collection row needs interaction or structured content.', 'A polymorphic button, link, or static row needs shared visuals.'], avoidWhen: ['A standalone button is sufficient.', 'Definition metadata belongs in a semantic definition list.'],
    accessibility: ['Interactive defaults to a native button.', 'Use anchor with href or router-link with to for navigation.', 'Set interactive=false and leave as unset for static rows.', 'Active is visual only; provide aria-current, aria-selected, or aria-pressed as appropriate.', 'Forward suitable accessible names and native attributes.'],
    styling: ['Use size, active, disabled, and borderRadius.', 'Treat list-item selectors as implementation details.'], responsive: ['Keep end content compact.', 'Use custom content when intentional wrapping is required.'],
    performance: ['Avoid heavy slot trees in very large lists.', 'Use stable keys from the parent render loop.'],
    examples: [{ key: 'components/list/StatesExample', purpose: 'Managed active state, disabled and static rows, and all sizes.' }, { key: 'components/list/RichRowExample', purpose: 'Static avatar row with custom main content and trailing metadata.' }, { key: 'components/list/NavigationExample', purpose: 'Native anchor and RouterLink polymorphic roots.' }], relatedComponents: ['H0List', 'H0Avatar', 'H0Icon'],
} satisfies ComponentAgentRecordV1
