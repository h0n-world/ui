import type { ComponentAgentRecordV1 } from '../schema.ts'

export const imageAgentRecord = {
    schemaVersion: 1, component: 'H0Image', status: 'migrated', summary: 'Responsive image with intersection-based lazy loading, skeleton state, sizing, and fallback content.',
    imports: { components: ['H0Image'], types: ['H0ImageEmits', 'H0ImageFit', 'H0ImageLoading', 'H0ImageProps', 'H0ImageStatus'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'alt', type: 'string', default: "''", description: 'Native image alternative text and default fallback label.' }, { name: 'aspectRatio', type: 'number | string', default: "'16 / 9'", description: 'CSS aspect-ratio reserved by the figure.' },
            { name: 'crossorigin', type: "'' | 'anonymous' | 'use-credentials'", default: 'undefined', description: 'Native CORS credentials mode.' }, { name: 'decoding', type: "'async' | 'auto' | 'sync'", default: "'async'", description: 'Native decoding hint.' },
            { name: 'draggable', type: 'boolean', default: 'false', description: 'Native image draggable state.' }, { name: 'fetchpriority', type: "'high' | 'low' | 'auto'", default: "'auto'", description: 'Native fetch priority.' },
            { name: 'fit', type: 'H0ImageFit', default: "'cover'", description: 'CSS object-fit value.' }, { name: 'height', type: 'number | string', default: 'undefined', description: 'Wrapper height; numbers also set the native img height.' },
            { name: 'lazy', type: 'boolean', default: 'true', description: 'Uses IntersectionObserver before assigning src unless loading overrides it.' }, { name: 'loading', type: 'H0ImageLoading', default: 'undefined', description: 'Explicit native loading hint overriding lazy.' },
            { name: 'objectPosition', type: 'string', default: "'center'", description: 'CSS object-position.' }, { name: 'radius', type: 'string', default: "'var(--h0n-ui-radius-lg)'", description: 'Wrapper, skeleton, and fallback radius.' },
            { name: 'referrerpolicy', type: "'' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'", default: 'undefined', description: 'Native referrer policy.' }, { name: 'rootMargin', type: 'string', default: "'200px'", description: 'IntersectionObserver CSS margin syntax.' },
            { name: 'showSkeleton', type: 'boolean', default: 'undefined', description: 'Explicit skeleton visibility setting overriding skeleton.' }, { name: 'sizes', type: 'string', default: 'undefined', description: 'Native responsive sizes attribute.' },
            { name: 'skeleton', type: 'boolean', default: 'true', description: 'Default skeleton preference.' }, { name: 'src', type: 'string | null', default: "''", description: 'Image source; empty or failed sources render fallback.' },
            { name: 'srcset', type: 'string', default: 'undefined', description: 'Native responsive source candidates.' }, { name: 'threshold', type: 'number', default: '0', description: 'IntersectionObserver threshold from 0 to 1.' },
            { name: 'width', type: 'number | string', default: "'100%'", description: 'Wrapper width; numbers also set the native img width.' },
        ],
        events: [{ name: 'error', type: 'Event', description: 'Native image error.' }, { name: 'load', type: 'Event', description: 'Native image load.' }, { name: 'status-change', type: 'H0ImageStatus', description: 'Emitted when idle, loading, loaded, or error status changes.' }],
        slots: [{ name: 'skeleton', type: '{ status: H0ImageStatus }', description: 'Custom waiting state.' }, { name: 'fallback', type: '{ status: H0ImageStatus }', description: 'Custom empty or failed state.' }], exposed: [],
        types: [
            { name: 'H0ImageFit', fields: [{ name: 'H0ImageFit', type: "'contain' | 'cover' | 'fill' | 'none' | 'scale-down'", description: 'Supported CSS object-fit values.' }] },
            { name: 'H0ImageLoading', fields: [{ name: 'H0ImageLoading', type: "'eager' | 'lazy'", description: 'Supported native loading modes.' }] },
            { name: 'H0ImageStatus', fields: [{ name: 'H0ImageStatus', type: "'idle' | 'loading' | 'loaded' | 'error'", description: 'Observable image lifecycle status.' }] },
        ],
    },
    useWhen: ['Media needs lazy loading, reserved sizing, skeleton, or fallback behavior.'], avoidWhen: ['A user identity image needs initials fallback; use H0Avatar.', 'A CSS background is purely decorative.'],
    accessibility: ['Provide purpose-appropriate alt text.', 'Use empty alt for decorative successful images.', 'The default failed-image fallback is announced even when alt is empty.', 'Ensure custom fallback content communicates failure, or hide it when the image is decorative.'],
    styling: ['Use public sizing, fit, radius, skeleton, and slots.', 'Treat image selectors as implementation details.'],
    responsive: ['Use aspectRatio, srcset, and sizes.', 'Avoid fixed widths wider than narrow containers.'],
    performance: ['Reserve dimensions to prevent layout shift.', 'Use eager/high priority only for critical above-the-fold media.', 'Prefer correctly sized responsive sources.'],
    examples: [
        { key: 'components/image/BasicExample', purpose: 'Responsive image with reserved ratio and observable status.' },
        { key: 'components/image/SizingExample', purpose: 'All object-fit values with numeric and CSS dimensions.' },
        { key: 'components/image/FallbackExample', purpose: 'Default and custom failed-image fallbacks.' },
        { key: 'components/image/LoadingExample', purpose: 'Default skeleton while a lazy image waits to load.' },
        { key: 'components/image/LifecycleExample', purpose: 'Successful and failed reloads with status-change, load, and error telemetry.' },
    ],
    relatedComponents: ['H0Avatar', 'H0Skeleton'],
} satisfies ComponentAgentRecordV1
