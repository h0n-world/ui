import type { ComponentAgentRecordV1 } from '../schema.ts'

export const emptyStateAgentRecord = {
    schemaVersion: 1, component: 'H0EmptyState', status: 'migrated', summary: 'Centered empty-content explanation with visual, description, actions, and inline, surface, or page layout.',
    imports: { components: ['H0EmptyState'], types: ['H0EmptyStateProps', 'H0EmptyStateVariant', 'H0IconSource'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'title', type: 'string', default: 'Localized empty-state title', description: 'Primary explanation.' }, { name: 'description', type: 'string', default: "''", description: 'Supporting explanation.' },
            { name: 'icon', type: 'H0IconSource', default: 'undefined', description: 'Imported legacy node or @h0nio/icons body definition shown when no image or visual slot exists.' }, { name: 'image', type: 'string', default: "''", description: 'Image URL for the visual.' }, { name: 'imageAlt', type: 'string', default: "''", description: 'Alternative text for the image.' },
            { name: 'primaryAction', type: 'string', default: "''", description: 'Primary action label.' }, { name: 'secondaryAction', type: 'string', default: "''", description: 'Secondary action label.' }, { name: 'variant', type: 'H0EmptyStateVariant', default: "'inline'", description: 'Container and page-height treatment.' },
        ],
        events: [{ name: 'primaryAction', type: '—', description: 'Reports primary action activation.' }, { name: 'secondaryAction', type: '—', description: 'Reports secondary action activation.' }],
        slots: [{ name: 'visual', type: '—', description: 'Replaces image or icon.' }, { name: 'title', type: '—', description: 'Replaces title content.' }, { name: 'description', type: '—', description: 'Replaces description content.' }, { name: 'actions', type: '—', description: 'Replaces generated action buttons.' }], exposed: [],
        types: [{ name: 'H0EmptyStateVariant', fields: [{ name: 'H0EmptyStateVariant', type: "'inline' | 'surface' | 'page'", description: 'Empty-state layout treatments.' }] }],
    },
    useWhen: ['A collection or page has no content and needs explanation.', 'Users can take a clear next step.'], avoidWhen: ['Data is still loading; use H0Skeleton or H0Spinner.', 'A request failed; use an error alert with recovery guidance.'],
    accessibility: ['Use a meaningful title.', 'Hide decorative custom visuals.', 'Provide useful alt text only for informative images.', 'Use specific action labels.'], styling: ['Choose a variant before custom styling.', 'Use public tokens in slots.'], responsive: ['Actions wrap and images remain within the container.'], performance: ['Prefer imported icons or optimized images.', 'Do not retain hidden data-heavy content.'],
    examples: [
        { key: 'components/empty-state/BasicExample', purpose: 'Generated actions with parent-owned event handling.' },
        { key: 'components/empty-state/VariantsExample', purpose: 'Inline, surface, and page layout treatments.' },
        { key: 'components/empty-state/CustomExample', purpose: 'Custom slots composed from H0N icon, typography, and button components.' },
    ], relatedComponents: ['H0Alert', 'H0Skeleton', 'H0Spinner', 'H0Button', 'H0Icon', 'H0Typography'],
} satisfies ComponentAgentRecordV1
