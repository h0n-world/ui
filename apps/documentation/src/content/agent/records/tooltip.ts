import type { ComponentAgentRecordV1 } from '../schema.ts'

export const tooltipAgentRecord = {
    schemaVersion: 1,
    component: 'H0Tooltip',
    status: 'migrated',
    summary: 'Concise non-interactive description shown on hover or keyboard focus.',
    imports: { components: ['H0Tooltip'], types: ['H0FloatingPlacement', 'H0TooltipProps'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'modelValue', type: 'boolean', default: 'undefined', description: 'Controlled open state.' },
            { name: 'defaultValue', type: 'boolean', default: 'false', description: 'Initial uncontrolled open state.' },
            { name: 'content', type: 'string', default: "''", description: 'Plain tooltip text before locale fallback.' },
            { name: 'placement', type: 'H0FloatingPlacement', default: "'top'", description: 'Preferred position relative to the trigger.' },
            { name: 'openDelay', type: 'number', default: '500', description: 'Delay before opening in milliseconds.' },
            { name: 'closeDelay', type: 'number', default: '100', description: 'Delay before closing in milliseconds.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents the tooltip from opening.' },
            { name: 'teleportTo', type: 'string | HTMLElement', default: "'body'", description: 'Teleport destination.' },
            { name: 'teleportDisabled', type: 'boolean', default: 'false', description: 'Renders the tooltip in place.' },
            { name: 'id', type: 'string', default: 'Generated with useId()', description: 'Stable tooltip ID used by aria-describedby.' },
        ],
        events: [
            { name: 'update:modelValue', type: 'boolean', description: 'Requests controlled state changes.' },
            { name: 'open', type: '—', description: 'Reports transition to open after the delay.' },
            { name: 'close', type: '—', description: 'Reports transition to closed after the delay.' },
        ],
        slots: [
            { name: 'trigger', type: '{ triggerAttrs: Record<string, unknown>; open: boolean }', description: 'Preferred trigger slot with accessibility and interaction attributes.' },
            { name: 'default', type: '—', description: 'Fallback trigger content when the named trigger slot is absent.' },
            { name: 'content', type: '—', description: 'Tooltip content replacing the content prop.' },
        ],
        exposed: [],
        types: [
            { name: 'H0FloatingPlacement', fields: [{ name: 'H0FloatingPlacement', type: "'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'", description: 'Preferred side and alignment for floating content.' }] },
        ],
    },
    useWhen: ['A control benefits from a short supplementary description.', 'An icon needs concise hover and focus help in addition to its accessible name.'],
    avoidWhen: ['Information is essential and should remain visible.', 'Content contains interactive controls.', 'A control lacks an accessible name.'],
    accessibility: ['Bind triggerAttrs to the focusable trigger.', 'Keep content non-interactive.', 'Do not use tooltip text as the only visible label.'],
    styling: ['Use public text, surface, radius, and typography tokens.', 'Treat tooltip selectors as implementation details.'],
    responsive: ['Keep essential guidance visible on touch-only interfaces.'],
    performance: ['Timers are cleared on unmount and content mounts only while open.'],
    examples: [
        { key: 'components/tooltip/BasicExample', purpose: 'Hover and focus tooltip with required trigger attributes.' },
        { key: 'components/tooltip/PlacementsExample', purpose: 'Preferred tooltip placement on every side of the trigger.' },
        { key: 'components/tooltip/StatesExample', purpose: 'Custom content, open-state feedback, keyboard dismissal, and disabled state.' },
    ],
    relatedComponents: ['H0Button'],
} satisfies ComponentAgentRecordV1
