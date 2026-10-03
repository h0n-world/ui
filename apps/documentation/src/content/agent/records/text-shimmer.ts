import type { ComponentAgentRecordV1 } from '../schema.ts'

export const textShimmerAgentRecord = {
    schemaVersion: 1, component: 'H0TextShimmer', status: 'migrated',
    summary: 'Readable status text with a subtle moving highlight in the High animation profile.',
    imports: { components: ['H0TextShimmer'], types: ['H0TextShimmerProps', 'H0TextShimmerElement'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'as', type: 'H0TextShimmerElement', default: "'span'", description: 'Root text element: span, p, or div.' },
            { name: 'active', type: 'boolean', default: 'true', description: 'Allows shimmer when the library animation policy permits it. False renders static text.' },
            { name: 'duration', type: 'number', default: '2000', description: 'Sweep duration in milliseconds. Non-positive or non-finite values fall back to 2000.' },
        ],
        events: [],
        slots: [{ name: 'default', type: '—', description: 'Text content, optionally with simple inline markup inheriting the text color. Do not place controls or independently colored elements inside.' }],
        exposed: [],
        types: [
            { name: 'H0TextShimmerElement', fields: [{ name: 'H0TextShimmerElement', type: "'span' | 'p' | 'div'", description: 'Supported root elements.' }] },
            { name: 'H0TextShimmerProps', fields: [{ name: 'as', type: 'H0TextShimmerElement', description: 'Root element.' }, { name: 'active', type: 'boolean', description: 'Effect activation.' }, { name: 'duration', type: 'number', description: 'Positive sweep duration in milliseconds.' }] },
        ],
    },
    useWhen: ['A short label describes ongoing loading, thinking, processing, or streaming.', 'Text should remain readable when motion is disabled.'],
    avoidWhen: ['Progress needs a numerical value or completion estimate.', 'Content contains interactive controls.', 'Essential information would be communicated by animation alone.'],
    accessibility: ['Real slot text remains present once in the accessibility tree.', 'No live region is created automatically. Add role status or aria-live when actual text updates need announcements.', 'Reduced motion, forced colors, and unsupported text clipping retain readable static text.'],
    styling: ['Typography inherits from the surrounding context; native attributes/classes/styles reach the root.', 'Existing secondary/text tokens define the base and moving highlight. Private effect selectors and variables are not public API.'],
    responsive: ['Text wraps within the available width; shimmer does not change its dimensions.', 'Direction is inherited; use dir rtl for RTL text.'],
    performance: ['CSS-only animation; no JavaScript timers, observers or duplicate text.', 'Decorative shimmer runs only in effective High, like Skeleton shimmer. Off, Low and Medium are static.'],
    examples: [
        { key: 'components/text-shimmer/BasicExample', purpose: 'Status labels with live animation-profile controls.' },
        { key: 'components/text-shimmer/CustomExample', purpose: 'Duration, active state, inherited typography and multiline RTL text.' },
    ],
    relatedComponents: ['H0Spinner', 'H0Skeleton', 'H0Typography'],
} satisfies ComponentAgentRecordV1
