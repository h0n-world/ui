import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardLayoutGuidance } from './layout-shared.ts'

export const spacerAgentRecord = {
    schemaVersion: 1, component: 'H0Spacer', status: 'migrated', summary: 'Non-semantic horizontal or vertical token-sized space with responsive sizing.',
    imports: { components: ['H0Spacer'], types: ['H0Orientation', 'H0ResponsiveValue', 'H0Space', 'H0SpacerProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'axis', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Dimension occupied by the spacer.' }, { name: 'size', type: 'H0ResponsiveValue<H0Space>', default: "'md'", description: 'Responsive token size.' },
    ], events: [], slots: [], exposed: [], types: [] },
    useWhen: ['An intentional empty gap cannot be expressed by a parent gap or wrapper padding.'], avoidWhen: ['Stack, Inline, or Grid gap can own the relationship.'], ...standardLayoutGuidance,
    accessibility: ['The spacer is always aria-hidden.', 'Do not use empty space as the only indication of a content relationship.'],
    examples: [{ key: 'components/layout/BasicExample', purpose: 'Responsive spacing and semantic layout composition.' }], relatedComponents: ['H0Stack', 'H0Inline'],
} satisfies ComponentAgentRecordV1
