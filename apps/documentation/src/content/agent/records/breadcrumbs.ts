import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const breadcrumbsAgentRecord = {
    schemaVersion: 1, component: 'H0Breadcrumbs', status: 'migrated', summary: 'Ordered location trail with native or router-compatible ancestor links and current-page semantics.',
    imports: { components: ['H0Breadcrumbs'], types: ['H0BreadcrumbItem', 'H0BreadcrumbsProps', 'H0BreadcrumbTarget'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'items', type: 'H0BreadcrumbItem[]', description: 'Ordered ancestors followed by the current page.' }, { name: 'ariaLabel', type: 'string', default: "'Breadcrumbs'", description: 'Accessible navigation name.' },
        { name: 'linkComponent', type: 'string | Component', default: "'a'", description: 'Native anchor or router-compatible component for ancestor links.' }, { name: 'separator', type: 'string', default: "'›'", description: 'Decorative separator text.' },
    ], events: [], slots: [
        { name: 'item', type: '{ item: H0BreadcrumbItem; index: number; current: boolean }', description: 'Custom content for every path item.' }, { name: 'separator', type: '{ item: H0BreadcrumbItem; index: number }', description: 'Custom decorative separator after an ancestor.' },
    ], exposed: [], types: [
        { name: 'H0BreadcrumbTarget', fields: [{ name: 'H0BreadcrumbTarget', type: 'string | Record<string, unknown>', description: 'Router-compatible destination.' }] },
        { name: 'H0BreadcrumbItem', fields: [
            { name: 'label', type: 'string', description: 'Visible item label.' }, { name: 'to', type: 'H0BreadcrumbTarget | undefined', description: 'Router-compatible target.' }, { name: 'href', type: 'string | undefined', description: 'Native anchor destination.' }, { name: 'disabled', type: 'boolean | undefined', description: 'Renders an ancestor as non-interactive.' },
        ] },
    ] },
    useWhen: ['A page belongs to a meaningful navigable hierarchy.'], avoidWhen: ['The interface represents sequential progress rather than location; use H0Stepper.'], ...standardNavigationGuidance,
    responsive: ['Long paths remain in one horizontal scroll row.', 'Keep the current item and nearest useful ancestors visible when space is constrained.'],
    examples: [{ key: 'components/breadcrumbs/BasicExample', purpose: 'Hierarchical documentation location.' }, { key: 'components/breadcrumbs/SlotsExample', purpose: 'Custom content and disabled ancestor.' }, { key: 'components/breadcrumbs/LongPathExample', purpose: 'Long horizontally scrollable path.' }], relatedComponents: ['H0Link'],
} satisfies ComponentAgentRecordV1
