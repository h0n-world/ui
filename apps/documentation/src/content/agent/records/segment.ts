import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const segmentAgentRecord = {
    schemaVersion: 1, component: 'H0Segment', status: 'migrated', summary: 'Controlled or uncontrolled radiogroup for a compact set of mutually exclusive modes with an animated indicator.',
    imports: { components: ['H0Segment'], types: ['H0IconSource', 'H0SegmentEmits', 'H0SegmentItem', 'H0SegmentProps', 'H0SegmentSize', 'H0SegmentValue', 'H0SegmentVariant'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'H0SegmentValue', default: 'undefined', description: 'Controlled selected value.' }, { name: 'defaultValue', type: 'H0SegmentValue', default: "''", description: 'Initial uncontrolled value.' }, { name: 'items', type: 'H0SegmentItem[]', description: 'Available mutually exclusive choices.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables every choice.' }, { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control size.' }, { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'ghost'", default: "'default'", description: 'Surface and indicator treatment.' },
        { name: 'iconExpand', type: 'boolean', default: 'false', description: 'Collapses labels for inactive icon items and expands the selected item.' }, { name: 'ariaLabel', type: 'string', default: "'Segmented control'", description: 'Accessible radiogroup name.' },
    ], events: [{ name: 'update:modelValue', type: 'H0SegmentValue', description: 'Requests selection update.' }, { name: 'change', type: 'H0SegmentValue', description: 'Reports a different enabled selection.' }], slots: [], exposed: [], types: [
        { name: 'H0SegmentValue', fields: [{ name: 'H0SegmentValue', type: 'string', description: 'Stable selection value type.' }] },
        { name: 'H0SegmentSize', fields: [{ name: 'H0SegmentSize', type: "'sm' | 'md' | 'lg'", description: 'Supported control sizes.' }] },
        { name: 'H0SegmentVariant', fields: [{ name: 'H0SegmentVariant', type: "'default' | 'secondary' | 'outline' | 'ghost'", description: 'Supported surface and indicator treatments.' }] },
        { name: 'H0SegmentItem', fields: [
            { name: 'label', type: 'string', description: 'Visible and accessible choice label.' }, { name: 'value', type: 'H0SegmentValue', description: 'Stable selection value.' }, { name: 'icon', type: 'H0IconSource | undefined', description: 'Optional leading legacy node or @h0nio/icons body definition.' }, { name: 'disabled', type: 'boolean | undefined', description: 'Disables this choice.' },
        ] },
    ] },
    useWhen: ['A small set of peer views or modes needs compact immediate selection.'], avoidWhen: ['Each choice controls a semantic tabpanel; use H0Tabs.', 'The choices are form data better represented by H0RadioGroup.'], ...standardNavigationGuidance,
    performance: ['Keep the item list short and stable.', 'Indicator measurements update on selection, size, items, and observed layout changes.'],
    examples: [{ key: 'components/segment/BasicExample', purpose: 'Controlled reporting-period selection.' }, { key: 'components/segment/AppearanceExample', purpose: 'Default, secondary, outline, and ghost variants.' }, { key: 'components/segment/SizesExample', purpose: 'Small, medium, and large controls.' }, { key: 'components/segment/IconsExample', purpose: 'Icon expansion and disabled item.' }], relatedComponents: ['H0Tabs', 'H0RadioGroup', 'H0ButtonGroup'],
} satisfies ComponentAgentRecordV1
