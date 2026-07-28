import type { ComponentAgentRecordV1 } from '../schema.ts'
import { polymorphicSlot, standardLayoutGuidance } from './layout-shared.ts'

export const inlineAgentRecord = {
    schemaVersion: 1, component: 'H0Inline', status: 'migrated', summary: 'Polymorphic horizontal flex layout with responsive gap, alignment, distribution, and wrapping.',
    imports: { components: ['H0Inline'], types: ['H0InlineProps', 'H0LayoutAlign', 'H0LayoutJustify', 'H0ResponsiveValue', 'H0Space'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'as', type: 'string | Component', default: "'div'", description: 'Semantic root element or Vue component.' }, { name: 'gap', type: 'H0ResponsiveValue<H0Space>', default: "'md'", description: 'Responsive space between children.' },
        { name: 'align', type: 'H0ResponsiveValue<H0LayoutAlign>', default: "'center'", description: 'Responsive cross-axis alignment.' }, { name: 'justify', type: 'H0ResponsiveValue<H0LayoutJustify>', default: "'start'", description: 'Responsive main-axis distribution.' }, { name: 'wrap', type: 'H0ResponsiveValue<boolean>', default: 'true', description: 'Responsive flex wrapping.' },
    ], events: [], slots: polymorphicSlot, exposed: [], types: [] },
    useWhen: ['Sibling elements form a horizontal row that may wrap.'], avoidWhen: ['Children form a vertical sequence; use H0Stack.'], ...standardLayoutGuidance,
    examples: [{ key: 'components/layout/BasicExample', purpose: 'Responsive spacing and semantic layout composition.' }], relatedComponents: ['H0Stack', 'H0Grid'],
} satisfies ComponentAgentRecordV1
