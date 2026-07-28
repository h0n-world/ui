import type { ComponentAgentRecordV1 } from '../schema.ts'

export const rippleAgentRecord = {
    schemaVersion: 1, component: 'H0Ripple', status: 'migrated', summary: 'Low-level pointer-origin animation for custom positioned interactive surfaces.',
    imports: { components: ['H0Ripple'], types: ['H0RippleProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [{ name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents creation of new ripples.' }, { name: 'duration', type: 'number', default: '620', description: 'Animation and cleanup duration in milliseconds.' }, { name: 'opacity', type: 'number', default: '0.24', description: 'Peak ripple opacity.' }], events: [], slots: [], exposed: [{ name: 'create', type: '(event: PointerEvent) => void', description: 'Creates a ripple from a host pointer event when high animation is enabled.' }], types: [] },
    useWhen: ['A custom interactive surface needs optional pointer-origin feedback.'], avoidWhen: ['A library control already provides its own feedback.', 'The effect would be the only activation or focus signal.'], accessibility: ['The host owns semantics, focus, keyboard support, and non-motion feedback.', 'Ripple requires app-scoped high animation and remains disabled for the system reduced-motion preference.', 'Keep the ripple itself inert and unlabeled.'], styling: ['Set positioning, clipping, radius, and currentColor on the host.'], responsive: ['Ripple measures and covers the current host bounds.'], performance: ['Create ripples only on deliberate pointer activation.', 'Temporary nodes and timers are cleaned up automatically.'], examples: [
        { key: 'components/ripple/BasicExample', purpose: 'Required template-ref and pointerdown integration for a custom host.' },
        { key: 'components/ripple/BuiltInExample', purpose: 'Button, Card, and ListItem integrations that already include ripple behavior.' },
        { key: 'components/ripple/ConfigurationExample', purpose: 'Duration, opacity, and disabled behavior.' },
    ], relatedComponents: ['H0Button', 'H0Card', 'H0ListItem'],
} satisfies ComponentAgentRecordV1
