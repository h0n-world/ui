import type { ComponentAgentRecordV1 } from '../schema.ts'

export const badgeAgentRecord = {
    schemaVersion: 1, component: 'H0Badge', status: 'migrated', summary: 'Compact non-interactive status, category, or metadata label.',
    imports: { components: ['H0Badge'], types: ['H0BadgeProps', 'H0BadgeSize', 'H0BadgeTone'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'tone', type: 'H0BadgeTone', default: "'default'", description: 'Semantic or neutral color treatment.' },
            { name: 'size', type: 'H0BadgeSize', default: "'md'", description: 'Compact small or medium sizing.' },
            { name: 'dot', type: 'boolean', default: 'false', description: 'Adds a decorative leading status dot.' },
            { name: 'text', type: 'string', default: "''", description: 'Fallback content when the default slot is empty.' },
        ],
        events: [], slots: [{ name: 'default', type: '—', description: 'Visible badge label, overriding text.' }], exposed: [],
        types: [
            { name: 'H0BadgeTone', fields: [{ name: 'H0BadgeTone', type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'neutral'", description: 'Supported badge tones.' }] },
            { name: 'H0BadgeSize', fields: [{ name: 'H0BadgeSize', type: "'sm' | 'md'", description: 'Shared H0Size scale without the large option.' }] },
        ],
    },
    useWhen: ['A status, category, or count needs compact emphasis.'], avoidWhen: ['The label must be interactive.', 'A filter must expose selected state; use H0Chip.'],
    accessibility: ['Keep explicit visible text.', 'Do not rely on color or the dot alone.'], styling: ['Use tone and size.', 'Treat .h-badge selectors as implementation details.'],
    responsive: ['Keep labels short and place groups in a wrapping container.'], performance: ['Prefer simple text slot content for large badge collections.'],
    examples: [{ key: 'components/badge/AppearanceExample', purpose: 'All semantic and neutral tones.' }, { key: 'components/badge/SizesExample', purpose: 'Small and medium badges with a status dot.' }],
    relatedComponents: ['H0Chip'],
} satisfies ComponentAgentRecordV1
