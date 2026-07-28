import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const sideNavItemAgentRecord = {
    schemaVersion: 1, component: 'H0SideNavItem', status: 'migrated', summary: 'Polymorphic sidebar destination with explicit or router-derived active state and optional trailing indicator.',
    imports: { components: ['H0SideNavItem'], types: ['H0SideNavItemElement', 'H0SideNavItemProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'title', type: 'string', default: "''", description: 'Fallback destination label.' }, { name: 'active', type: 'boolean', default: 'false', description: 'Marks the destination current and adds aria-current.' }, { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables destination interaction.' },
        { name: 'as', type: 'string | Component', default: "'a'", description: 'Native anchor or router-compatible component.' }, { name: 'indicator', type: 'boolean', default: 'true', description: 'Shows the default trailing arrow when no end slot is supplied.' },
    ], events: [], slots: [
        { name: 'start', type: '—', description: 'Leading icon or visual.' }, { name: 'default', type: '—', description: 'Custom destination title.' }, { name: 'end', type: '—', description: 'Custom trailing status or indicator.' },
    ], exposed: [], types: [
        { name: 'H0SideNavItemElement', fields: [{ name: 'H0SideNavItemElement', type: 'string | Component', description: 'Native tag name or compatible Vue component.' }] },
    ] },
    useWhen: ['A destination belongs inside H0SideNav and may use native or router navigation.'], avoidWhen: ['The row performs a non-navigation action.'], ...standardNavigationGuidance,
    examples: [{ key: 'components/side-nav/BasicExample', purpose: 'Controlled active destinations.' }, { key: 'components/side-nav/StatesExample', purpose: 'Start and end slots, active and disabled states.' }], relatedComponents: ['H0SideNav', 'H0SideNavGroup', 'H0ListItem', 'H0Link'],
} satisfies ComponentAgentRecordV1
