import type { ComponentAgentRecordV1 } from '../schema.ts'
import { polymorphicSlot, standardLayoutGuidance } from './layout-shared.ts'

export const stackAgentRecord = {
    schemaVersion: 1, component: 'H0Stack', status: 'migrated', summary: 'Polymorphic vertical flex layout with responsive gap, cross-axis alignment, distribution, and wrapping.',
    imports: { components: ['H0Stack'], types: ['H0LayoutAlign', 'H0LayoutJustify', 'H0ResponsiveValue', 'H0Space', 'H0StackProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'as', type: 'string | Component', default: "'div'", description: 'Semantic root element or Vue component.' }, { name: 'gap', type: 'H0ResponsiveValue<H0Space>', default: "'md'", description: 'Responsive space between children.' },
        { name: 'align', type: 'H0ResponsiveValue<H0LayoutAlign>', default: "'stretch'", description: 'Responsive cross-axis alignment.' }, { name: 'justify', type: 'H0ResponsiveValue<H0LayoutJustify>', default: "'start'", description: 'Responsive main-axis distribution.' }, { name: 'wrap', type: 'H0ResponsiveValue<boolean>', default: 'false', description: 'Responsive flex wrapping.' },
    ], events: [], slots: polymorphicSlot, exposed: [], types: [] },
    useWhen: ['Sibling elements form a vertical sequence with consistent spacing.'], avoidWhen: ['Children should flow horizontally; use H0Inline.'], ...standardLayoutGuidance,
    examples: [{ key: 'components/layout/BasicExample', purpose: 'Responsive spacing and semantic layout composition.' }], relatedComponents: ['H0Inline', 'H0Grid'],
} satisfies ComponentAgentRecordV1
