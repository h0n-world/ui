import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const sideNavGroupAgentRecord = {
    schemaVersion: 1, component: 'H0SideNavGroup', status: 'migrated', summary: 'Labeled list grouping for related destinations inside H0SideNav.',
    imports: { components: ['H0SideNavGroup'], types: ['H0SideNavGroupProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [{ name: 'label', type: 'string', default: "''", description: 'Accessible and visible group label.' }], events: [], slots: [
        { name: 'label', type: '—', description: 'Custom group label.' }, { name: 'default', type: '—', description: 'H0SideNavItem destinations.' },
    ], exposed: [], types: [] },
    useWhen: ['Sidebar destinations form a meaningful labeled subset.'], avoidWhen: ['A wrapper would not communicate a real grouping.'], ...standardNavigationGuidance,
    examples: [{ key: 'components/side-nav/BasicExample', purpose: 'Labeled sidebar groups.' }, { key: 'components/side-nav/StatesExample', purpose: 'Custom group label.' }, { key: 'components/side-nav/GapExample', purpose: 'Group-spacing comparison.' }], relatedComponents: ['H0SideNav', 'H0SideNavItem', 'H0List'],
} satisfies ComponentAgentRecordV1
