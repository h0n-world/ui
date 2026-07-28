import type { ComponentAgentRecordV1 } from '../schema.ts'
import { polymorphicSlot, standardLayoutGuidance } from './layout-shared.ts'

export const gridAgentRecord = {
    schemaVersion: 1, component: 'H0Grid', status: 'migrated', summary: 'Polymorphic CSS grid with common page and collection presets plus explicit column and row templates.',
    imports: { components: ['H0Grid'], types: ['H0GridGap', 'H0GridProps', 'H0GridVariant'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'as', type: "'div' | 'section' | 'article' | 'main'", default: "'div'", description: 'Semantic root element.' }, { name: 'variant', type: 'H0GridVariant', default: "'auto-fit'", description: 'Named grid-template preset.' },
        { name: 'gap', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Token gap between rows and columns.' }, { name: 'columns', type: 'string', default: 'undefined', description: 'Explicit grid-template-columns value or declaration.' }, { name: 'rows', type: 'string', default: 'undefined', description: 'Explicit grid-template-rows value or declaration.' },
    ], events: [], slots: polymorphicSlot, exposed: [], types: [
        { name: 'H0GridVariant', fields: [
            { name: 'default', type: "'default'", description: 'Unopinionated grid for explicit templates.' }, { name: 'auto-fit', type: "'auto-fit'", description: 'Fluid columns with a 220px minimum.' }, { name: 'vertical', type: "'vertical'", description: 'Single-column grid.' }, { name: 'three', type: "'three'", description: 'Three equal columns.' },
            { name: 'center-wide', type: "'center-wide'", description: 'Wide center column between fluid side columns.' }, { name: 'sidebar-left', type: "'sidebar-left'", description: 'Fixed left sidebar and fluid content.' }, { name: 'sidebar-right', type: "'sidebar-right'", description: 'Fluid content and fixed right sidebar.' },
        ] },
        { name: 'H0GridGap', fields: [{ name: 'H0GridGap', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", description: 'Supported spacing-token gaps.' }] },
    ] },
    useWhen: ['Content needs two-dimensional alignment or a reusable page-shell template.'], avoidWhen: ['Only one row or column relationship exists; use H0Inline or H0Stack.'], ...standardLayoutGuidance,
    responsive: ['Auto-fit adapts naturally to available width.', 'Fixed three-column and sidebar presets need an appropriate container or explicit responsive override.'],
    examples: [{ key: 'components/grid/BasicExample', purpose: 'Fluid auto-fit card collection.' }, { key: 'components/grid/VariantsExample', purpose: 'Named content and page-shell presets.' }, { key: 'components/grid/TemplatesExample', purpose: 'Explicit column and row templates.' }], relatedComponents: ['H0Container', 'H0Stack', 'H0Inline'],
} satisfies ComponentAgentRecordV1
