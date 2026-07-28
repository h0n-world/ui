import type { ComponentAgentRecordV1 } from '../schema.ts'

export const descriptionAgentRecord = {
    schemaVersion: 1, component: 'H0Description', status: 'migrated', summary: 'Muted regular-weight supporting text preset for fields, cards, and metadata.',
    imports: { components: ['H0Description'], types: ['H0DescriptionElement', 'H0DescriptionProps', 'H0DescriptionVariant'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'as', type: 'H0DescriptionElement', default: "'p'", description: 'Rendered paragraph, inline span, or neutral block div.' }, { name: 'text', type: 'string | number', default: "''", description: 'String or numeric fallback used when the default slot is absent.' },
        { name: 'variant', type: 'H0DescriptionVariant', default: "'body-sm'", description: 'Body-small or body-extra-small presentation.' },
    ], events: [], slots: [{ name: 'default', type: '—', description: 'Supporting content that takes precedence over text.' }], exposed: [], types: [
        { name: 'H0DescriptionElement', fields: [{ name: 'H0DescriptionElement', type: "'p' | 'span' | 'div'", description: 'Supported semantic and neutral container elements.' }] },
        { name: 'H0DescriptionVariant', fields: [{ name: 'H0DescriptionVariant', type: "'body-sm' | 'body-xs'", description: 'Supported compact typography variants.' }] },
    ] },
    useWhen: ['Secondary copy supports a field, card, or value.'], avoidWhen: ['Text is a heading or primary body content.', 'The text is a validation error.'],
    accessibility: ['Use p for paragraphs, span for inline context, and div only as a neutral block.', 'Give the description an id and reference it explicitly with aria-describedby.'], styling: ['Use variant for density.', 'Use H0Typography for broader control.'],
    responsive: ['Allow supporting text to wrap.'], performance: ['Keep repeated descriptions concise.'], examples: [
        { key: 'components/description/BasicExample', purpose: 'Both sizes, all supported elements, and numeric text fallback.' },
        { key: 'components/description/FieldDescriptionExample', purpose: 'H0Input hint integration with an automatically connected H0Description.' },
    ],
    relatedComponents: ['H0Typography', 'H0Label', 'H0ErrorMessage'],
} satisfies ComponentAgentRecordV1
