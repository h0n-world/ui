import type { ComponentAgentRecordV1 } from '../schema.ts'

export const accordionAgentRecord = {
    schemaVersion: 1,
    component: 'H0Accordion',
    status: 'migrated',
    summary: 'Uncontrolled stack of accessible disclosure sections for progressively revealing related content.',
    imports: {
        components: ['H0Accordion'],
        types: ['H0AccordionItem', 'H0AccordionProps'],
        styles: ['@h0nio/ui/style.css'],
    },
    api: {
        props: [
            { name: 'items', type: 'H0AccordionItem[]', description: 'Ordered disclosure items rendered by the component.' },
            { name: 'id', type: 'string', default: 'Generated with useId()', description: 'Stable prefix for trigger and panel IDs. Must be unique when supplied.' },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows more than one panel to remain open.' },
            { name: 'defaultOpen', type: 'number[]', default: '[]', description: 'Zero-based indexes opened only during initialization. Single mode uses only the first index.' },
        ],
        events: [],
        slots: [
            {
                name: 'item',
                type: '{ item: H0AccordionItem & { title: string; content: string }; index: number; open: boolean }',
                description: 'Replaces panel content and receives the normalized item, its index, and current open state.',
            },
        ],
        exposed: [],
        types: [
            {
                name: 'H0AccordionItem',
                description: 'Content and availability for one disclosure section.',
                fields: [
                    { name: 'title', type: 'string', default: "''", description: 'Preferred visible label for the disclosure trigger. Required unless question provides the label.' },
                    { name: 'content', type: 'string', default: "''", description: 'Preferred fallback panel content when the item slot is not used.' },
                    { name: 'question', type: 'string', default: 'undefined', description: 'Compatibility label alias used when title is absent.' },
                    { name: 'answer', type: 'string', default: 'undefined', description: 'Compatibility alias used when content is absent.' },
                    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the native trigger and prevents state changes.' },
                ],
            },
        ],
    },
    useWhen: ['Related supporting content should be progressively disclosed.', 'An FAQ or settings surface benefits from compact stacked sections.', 'Users may need to compare multiple sections by enabling multiple mode.'],
    avoidWhen: ['Content is essential and should remain continuously visible.', 'The interface requires externally controlled open state or change events.', 'The content represents navigation between peer views; use H0Tabs instead.'],
    accessibility: [
        'Use concise, distinguishable item titles.',
        'Triggers expose aria-expanded and aria-controls; panels expose role=region and aria-labelledby.',
        'Closed panels are aria-hidden and inert so custom controls cannot receive focus.',
        'Place the component under an appropriate page heading because item triggers do not create heading levels.',
    ],
    styling: ['Use a wrapper or H0Card when a bordered surface is required.', 'Use public H0N tokens and treat .h-accordion selectors as implementation details.'],
    responsive: ['Let Accordion fill a fluid container on narrow screens.', 'Ensure custom slot content wraps without horizontal scrolling.'],
    performance: ['Keep the items array stable when its data has not changed.', 'Collapsed content remains mounted, so avoid many expensive panel subtrees.', 'Avoid reordering open index-based items unless disclosure state is intentionally reassigned.'],
    examples: [
        { key: 'components/accordion/BasicExample', purpose: 'Single-open FAQ with an initial panel.' },
        { key: 'components/accordion/MultipleExample', purpose: 'Multiple panels initialized in the open state.' },
        { key: 'components/accordion/StatesExample', purpose: 'Native disabled disclosure item.' },
        { key: 'components/accordion/CustomContentExample', purpose: 'Structured slot content and open slot state.' },
    ],
    relatedComponents: ['H0Card', 'H0Tabs'],
} satisfies ComponentAgentRecordV1
