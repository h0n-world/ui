import type { ComponentAgentRecordV1 } from '../schema.ts'

export const infiniteScrollAgentRecord = {
    schemaVersion: 1,
    component: 'H0InfiniteScroll',
    status: 'migrated',
    summary: 'IntersectionObserver sentinel that requests bounded chunks in a page viewport or nearest scrollable ancestor.',
    imports: { components: ['H0InfiniteScroll'], types: ['H0InfiniteScrollEmits', 'H0InfiniteScrollProps', 'H0InfiniteScrollRoot'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'loading', type: 'boolean', default: 'false', description: 'Blocks duplicate requests and shows loading content; a true-to-false cycle unlocks the next request.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents load requests and reduces component opacity while preserving content.' },
            { name: 'hasMore', type: 'boolean', default: 'true', description: 'Allows load requests; false shows terminal completion content.' },
            { name: 'root', type: 'H0InfiniteScrollRoot', default: "'nearest'", description: 'Uses the nearest vertical scroll ancestor with viewport fallback, or always uses the viewport.' },
            { name: 'rootMargin', type: 'string', default: "'0px 0px 160px 0px'", description: 'IntersectionObserver CSS margin used to prefetch before the boundary.' },
            { name: 'threshold', type: 'number', default: '0', description: 'Unvalidated IntersectionObserver ratio from 0 to 1 required to request loading.' },
            { name: 'loadingText', type: 'string', default: 'Localized loading text', description: 'Accessible status label and default loader copy; an empty value uses locale fallback.' },
            { name: 'observeOnMount', type: 'boolean', default: 'true', description: 'Static mount-time flag for initial observer creation; no imperative start method is exposed.' },
        ],
        events: [{ name: 'load', type: '\u2014', description: 'Requests the next chunk without a payload when the sentinel intersects.' }],
        slots: [
            { name: 'default', type: '\u2014', description: 'Loaded collection content placed before the sentinel.' },
            { name: 'loading', type: '\u2014', description: 'Custom content inside the component-owned labeled status while loading is true.' },
            { name: 'complete', type: '\u2014', description: 'Custom terminal content when hasMore is false; not announced automatically.' },
        ],
        exposed: [],
        types: [{ name: 'H0InfiniteScrollRoot', fields: [{ name: 'H0InfiniteScrollRoot', type: "'nearest' | 'viewport'", description: 'Nearest vertical scroll ancestor with viewport fallback, or the page viewport.' }] }],
    },
    useWhen: ['A list or feed should append data near its scroll boundary.', 'The collection layout is owned by another component.'],
    avoidWhen: ['Users need numbered navigation or stable URLs for pages.', 'A huge retained collection lacks virtualization or another DOM-bounding strategy.', 'IntersectionObserver is unavailable and no separate loading control exists.'],
    accessibility: ['Use loadingText to label the component-owned status and avoid nested status regions.', 'Keep focus stable as items append.', 'Make custom overflow containers focusable and label them.', 'Provide an alternative to extremely long feeds when appropriate.', 'Announce completion explicitly only when required.'],
    styling: ['Style loaded and state content through slots.', 'Disabled state reduces opacity of the entire component.', 'Treat the sentinel and observer geometry as implementation details.'],
    responsive: ['The component follows its container; consumers own scroll height and content layout.'],
    performance: ['Append bounded chunks.', 'Keep loading true for the full request so the lock resets.', 'Expect automatic consecutive requests while the sentinel remains in the prefetch area.', 'Combine with virtualization for very large retained collections.'],
    examples: [
        { key: 'components/infinite-scroll/BasicExample', purpose: 'Keyboard-accessible nearest-container loading with progress and completion state.' },
        { key: 'components/infinite-scroll/ViewportExample', purpose: 'Viewport observation with custom geometry, request count, disabled control, and completion.' },
        { key: 'components/infinite-scroll/CustomStatesExample', purpose: 'Custom loading content using the component-owned status and custom completion content.' },
    ],
    relatedComponents: ['H0List', 'H0DataTable', 'H0Skeleton'],
} satisfies ComponentAgentRecordV1
