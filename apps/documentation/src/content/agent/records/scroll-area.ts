import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardLayoutGuidance } from './layout-shared.ts'

export const scrollAreaAgentRecord = {
    schemaVersion: 1, component: 'H0ScrollArea', status: 'migrated', summary: 'Focusable native scroll region with shared scrollbar styling, bounded axes, stable gutter, edge fades, and boundary events.',
    imports: { components: ['H0ScrollArea'], types: ['H0CssSize', 'H0Orientation', 'H0ScrollAreaProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'orientation', type: "'horizontal' | 'vertical' | 'both'", default: "'vertical'", description: 'Enabled scroll axes.' }, { name: 'maxHeight', type: 'H0CssSize', default: 'undefined', description: 'Viewport maximum block size; numbers become pixels.' }, { name: 'maxWidth', type: 'H0CssSize', default: 'undefined', description: 'Viewport maximum inline size; numbers become pixels.' },
        { name: 'stableGutter', type: 'boolean', default: 'true', description: 'Reserves scrollbar gutter space.' }, { name: 'fadeEdges', type: 'boolean', default: 'false', description: 'Shows visual overflow fades away from boundaries.' }, { name: 'ariaLabel', type: 'string', default: "''", description: 'Accessible region name, falling back to localized copy.' },
    ], events: [
        { name: 'scroll', type: 'Event', description: 'Reports native viewport scrolling.' }, { name: 'reach-start', type: '—', description: 'Reports entering the start boundary.' }, { name: 'reach-end', type: '—', description: 'Reports entering the end boundary.' },
    ], slots: [{ name: 'default', type: '—', description: 'Scrollable content.' }], exposed: [
        { name: 'scrollTo', type: '(options: ScrollToOptions) => void', description: 'Scrolls the viewport to an absolute position.' }, { name: 'scrollBy', type: '(options: ScrollToOptions) => void', description: 'Scrolls relative to the current position.' }, { name: 'viewport', type: 'HTMLElement | null', description: 'Viewport template ref.' },
    ], types: [
        { name: 'H0Orientation', fields: [{ name: 'H0Orientation', type: "'horizontal' | 'vertical'", description: 'Shared single-axis orientation type.' }] },
        { name: 'H0CssSize', fields: [{ name: 'H0CssSize', type: 'number | string', description: 'CSS size where numeric values are converted to pixels.' }] },
    ] },
    useWhen: ['Content needs a bounded, explicitly labeled scroll region.', 'Code needs boundary events or imperative native scrolling.'], avoidWhen: ['The document itself can scroll naturally.', 'A large collection needs virtualization rather than only overflow.'], ...standardLayoutGuidance,
    accessibility: ['Provide a specific ariaLabel.', 'The viewport remains keyboard focusable.', 'Avoid nested scroll regions unless each has a distinct purpose.'],
    examples: [{ key: 'components/scroll-area/BasicExample', purpose: 'Bounded vertical activity feed with edge fades.' }, { key: 'components/scroll-area/HorizontalExample', purpose: 'Keyboard-focusable horizontal card strip.' }, { key: 'components/scroll-area/ApiExample', purpose: 'Imperative scrolling and boundary events.' }], relatedComponents: ['H0Stack', 'H0InfiniteScroll'],
} satisfies ComponentAgentRecordV1
