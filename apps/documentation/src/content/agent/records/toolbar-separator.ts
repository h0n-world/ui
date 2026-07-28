import type { ComponentAgentRecordV1 } from '../schema.ts'

export const toolbarSeparatorAgentRecord = {
    schemaVersion: 1,
    component: 'H0ToolbarSeparator',
    status: 'migrated',
    summary: 'Orientation-aware visual and semantic separator between compound toolbar command groups.',
    imports: {
        components: ['H0ToolbarSeparator'],
        types: [],
        styles: ['@h0nio/ui/style.css'],
    },
    api: {
        props: [],
        events: [],
        slots: [],
        exposed: [],
        types: [],
    },
    useWhen: ['A compound toolbar needs a boundary between meaningful command groups.'],
    avoidWhen: ['Commands already form one coherent group.', 'Spacing alone provides sufficient grouping.'],
    accessibility: ['The component exposes role="separator" and derives aria-orientation from the parent toolbar.', 'Use it only where the boundary communicates a real grouping change.'],
    styling: ['Use the provided separator rather than recreating its internal border selector.'],
    responsive: ['The separator switches between vertical and horizontal boundaries with the parent toolbar orientation.'],
    performance: ['Separators are static; include only those required by the command structure.'],
    examples: [{ key: 'components/toolbar/CompoundExample', purpose: 'Semantic boundary between history and clipboard groups.' }],
    relatedComponents: ['H0Toolbar', 'H0ToolbarGroup', 'H0ToolbarItem'],
} satisfies ComponentAgentRecordV1
