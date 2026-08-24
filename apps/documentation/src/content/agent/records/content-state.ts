import type { ComponentAgentRecordV1 } from '../schema.ts'

export const contentStateAgentRecord = {
    schemaVersion: 1,
    component: 'H0ContentState',
    status: 'migrated',
    summary: 'Controlled state region that transitions between loading, error, empty, and resolved content slots.',
    imports: {
        components: ['H0ContentState'],
        types: ['H0ContentStateProps', 'H0ContentStateValue'],
        styles: ['@h0nio/ui/style.css']
    },
    api: {
        props: [{ name: 'state', type: 'H0ContentStateValue', description: 'Controlled state whose matching slot is mounted.' }],
        events: [],
        slots: [
            { name: 'loading', type: '—', description: 'Loading feedback such as labeled skeletons or a spinner.' },
            { name: 'error', type: '—', description: 'Failure feedback and an optional recovery action.' },
            { name: 'empty', type: '—', description: 'Successful no-results or no-content feedback.' },
            { name: 'content', type: '—', description: 'Successfully resolved content.' },
            { name: 'default', type: '—', description: 'Fallback used for content when no content slot exists.' }
        ],
        exposed: [],
        types: [
            {
                name: 'H0ContentStateValue',
                fields: [{ name: 'H0ContentStateValue', type: "'loading' | 'error' | 'empty' | 'content'", description: 'Mutually exclusive content-region states.' }]
            }
        ]
    },
    useWhen: ['One region replaces request feedback with an empty result or resolved content.', 'The parent already owns the asynchronous or application state.'],
    avoidWhen: ['Multiple states need to remain visible simultaneously.', 'Inactive stateful content must remain mounted without lifting its state to the parent.'],
    accessibility: ['The component marks the region busy only during loading.', 'Give loading feedback one concise accessible name.', 'Use an alert role only for failures that require immediate announcement.', 'Do not move focus solely because the visual state changed.'],
    styling: ['Compose slots from public components and semantic tokens.', 'Treat transition selectors as implementation details.'],
    responsive: ['The region and active view fill the available inline width.', 'Reserve an application-appropriate min-block-size when differently sized states must not move surrounding layout.', 'Define responsive layout inside each slot.'],
    performance: ['Inactive slots are unmounted after the transition.', 'Keep persistent state and expensive resources outside replaceable slots.'],
    examples: [
        { key: 'components/content-state/StatesExample', purpose: 'All four states composed from feedback and content components.' },
        { key: 'components/content-state/AsyncExample', purpose: 'Parent-controlled loading, success, retry, and failure flow.' }
    ],
    relatedComponents: ['H0Skeleton', 'H0Spinner', 'H0Alert', 'H0EmptyState']
} satisfies ComponentAgentRecordV1
