import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardLayoutGuidance } from './layout-shared.ts'

export const dividerAgentRecord = {
    schemaVersion: 1, component: 'H0Divider', status: 'migrated', summary: 'Horizontal or vertical separator with optional label content, responsive inset, and decorative mode.',
    imports: { components: ['H0Divider'], types: ['H0DividerProps', 'H0Orientation', 'H0ResponsiveValue', 'H0Space'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Separator and layout direction.' }, { name: 'inset', type: 'H0ResponsiveValue<H0Space>', default: "'none'", description: 'Responsive logical inset.' }, { name: 'decorative', type: 'boolean', default: 'false', description: 'Removes separator semantics when the line is purely visual.' },
    ], events: [], slots: [{ name: 'default', type: '—', description: 'Optional label between the two line segments.' }], exposed: [], types: [] },
    useWhen: ['Adjacent content groups need a meaningful or visual boundary.'], avoidWhen: ['Spacing alone already communicates the grouping.'], ...standardLayoutGuidance,
    accessibility: ['Keep meaningful boundaries as separators.', 'Set decorative when the line adds no structural information.', 'Do not place essential content in a decorative divider.'],
    examples: [{ key: 'components/layout/BasicExample', purpose: 'Responsive spacing and semantic layout composition.' }], relatedComponents: ['H0Stack'],
} satisfies ComponentAgentRecordV1
