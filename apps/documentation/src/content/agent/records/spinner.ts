import type { ComponentAgentRecordV1 } from '../schema.ts'

export const spinnerAgentRecord = {
    schemaVersion: 1, component: 'H0Spinner', status: 'migrated', summary: 'Compact indeterminate status indicator with CSS sizing, current-color styling, and accessible label.',
    imports: { components: ['H0Spinner'], types: ['H0SpinnerProps', 'H0SpinnerSize'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [{ name: 'size', type: 'H0SpinnerSize', default: "'18px'", description: 'Equal CSS width and height.' }, { name: 'label', type: 'string', default: "'Loading'", description: 'Accessible status label.' }], events: [], slots: [], exposed: [], types: [{ name: 'H0SpinnerSize', fields: [{ name: 'H0SpinnerSize', type: 'H0CssSize', description: 'Public CSS size value.' }] }] },
    useWhen: ['A short operation has no measurable completion value.', 'A compact control needs an inline loading indicator.'], avoidWhen: ['Content geometry should remain stable; use H0Skeleton.', 'Completion can be measured; use determinate progress.'], accessibility: ['Use a task-specific label.', 'Avoid several independently announced spinners for one loading region.', 'Prevent duplicate actions while work is active.', 'Rotation stops in low animation mode and for the system reduced-motion preference while the static status remains visible.'], styling: ['Spinner inherits currentColor.', 'Treat border, rotation selectors, and internal CSS variables as implementation details.'], responsive: ['Spinner keeps equal fixed dimensions selected through size.'], performance: ['Use one spinner per loading context.', 'Remove it when work completes or fails.'], examples: [
        { key: 'components/spinner/SizesExample', purpose: 'Common spinner dimensions and labels.' },
        { key: 'components/spinner/ContextExample', purpose: 'Spinner with visible task context.' },
        { key: 'components/spinner/ButtonExample', purpose: 'Preferred H0Button loading integration.' },
        { key: 'components/spinner/AsyncExample', purpose: 'Parent-owned asynchronous loading state.' },
    ], relatedComponents: ['H0Skeleton', 'H0Button'],
} satisfies ComponentAgentRecordV1
