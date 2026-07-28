import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const sideNavAgentRecord = {
    schemaVersion: 1, component: 'H0SideNav', status: 'migrated', summary: 'Grouped sidebar navigation surface with configurable group spacing and animated item indicators.',
    imports: { components: ['H0SideNav'], types: ['H0SideNavGap', 'H0SideNavProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'gap', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Space between navigation groups.' }, { name: 'animatedIndicator', type: 'boolean', default: 'true', description: 'Animates item indicators on active, focus, and hover states.' },
    ], events: [], slots: [{ name: 'default', type: '—', description: 'H0SideNavGroup and H0SideNavItem content.' }], exposed: [], types: [
        { name: 'H0SideNavGap', fields: [{ name: 'H0SideNavGap', type: "'sm' | 'md' | 'lg'", description: 'Supported spacing between navigation groups.' }] },
    ] },
    useWhen: ['A persistent sidebar contains related groups of page destinations.'], avoidWhen: ['Destinations belong in the global top navigation or a compact tab set.'], ...standardNavigationGuidance,
    accessibility: ['Pass a native aria-label to the root nav.', 'Use group labels that explain each destination set.', 'Ensure exactly one current destination when the navigation represents pages.'],
    examples: [{ key: 'components/side-nav/BasicExample', purpose: 'Grouped destinations with controlled active state.' }, { key: 'components/side-nav/StatesExample', purpose: 'Icons, custom trailing content, disabled and active items.' }, { key: 'components/side-nav/GapExample', purpose: 'Small, medium, and large group spacing.' }], relatedComponents: ['H0SideNavGroup', 'H0SideNavItem', 'H0List'],
} satisfies ComponentAgentRecordV1
