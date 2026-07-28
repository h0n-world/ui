import type { ComponentAgentRecordV1 } from '../schema.ts'

export const alertAgentRecord = {
    schemaVersion: 1,
    component: 'H0Alert',
    status: 'migrated',
    summary: 'Persistent assertive inline feedback with semantic tones, compact and loading states, actions, dismissal, and rich content.',
    imports: { components: ['H0Alert'], types: ['H0AlertEmits', 'H0AlertProps', 'H0AlertTone'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'tone', type: 'H0AlertTone', default: "'default'", description: 'Semantic visual intent and default icon; meaning must also be present in text.' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Applies loading visual treatment without disabling action or close controls.' },
            { name: 'title', type: 'string', default: "''", description: 'Primary alert message and fallback for the title slot.' },
            { name: 'text', type: 'string', default: "''", description: 'Secondary plain-text description and fallback for the default slot.' },
            { name: 'closable', type: 'boolean', default: 'false', description: 'Shows the close control without owning visibility state.' },
            { name: 'actionText', type: 'string', default: "''", description: 'Shows the component-owned action button and supplies fallback action content.' },
            { name: 'closeAriaLabel', type: 'string', default: "'Close alert'", description: 'Non-localized accessible close-control label; override with contextual product copy.' },
        ],
        events: [
            { name: 'action', type: '\u2014', description: 'Reports component-owned action-button activation without a payload.' },
            { name: 'close', type: '\u2014', description: 'Requests parent-owned dismissal without a payload.' },
        ],
        slots: [
            { name: 'icon', type: '\u2014', description: 'Replaces the tone or loading icon with decorative custom content.' },
            { name: 'title', type: '\u2014', description: 'Replaces title content inside component-owned strong typography.' },
            { name: 'default', type: '\u2014', description: 'Rich description inside component-owned description typography.' },
            { name: 'action', type: '\u2014', description: 'Replaces only the content of the component-owned action button; interactive descendants are invalid.' },
        ],
        exposed: [],
        types: [{ name: 'H0AlertTone', fields: [{ name: 'H0AlertTone', type: "'default' | 'info' | 'success' | 'warning' | 'danger'", description: 'Available semantic visual tones.' }] }],
    },
    useWhen: ['Important feedback should remain in the page flow.', 'A warning or error needs context and an optional recovery action.'],
    avoidWhen: ['Feedback is transient and global; use H0Toast.', 'The message requires a blocking decision; use H0AlertDialog.', 'Routine background progress does not justify an assertive role=alert announcement.'],
    accessibility: ['Use alerts deliberately because role=alert is assertive, including during loading.', 'Pair tone with explicit text.', 'Loading rotation runs only in high animation mode and stops for the system reduced-motion preference.', 'Give repeated close controls contextual localized labels.', 'Restore focus after removing a focused close control.', 'Keep action-slot content non-interactive and handle activation through the action event.'],
    styling: ['Use public tones and slots.', 'Provide text and actionText fallbacks when rich slots require non-compact layout.', 'Treat the alert grid and state selectors as implementation details.'],
    responsive: ['Actions and close controls move below content on narrow screens.', 'Allow the alert to fill a fluid container.'],
    performance: ['Avoid mounting many alerts for one validation group.', 'Keep rich slot trees lightweight.'],
    examples: [
        { key: 'components/alert/TonesExample', purpose: 'All semantic visual tones with explicit textual meaning.' },
        { key: 'components/alert/ActionsExample', purpose: 'Component-owned action, parent-owned dismissal, and focus restoration.' },
        { key: 'components/alert/ContentStatesExample', purpose: 'Compact, rich, custom icon and action content, and controlled loading states.' },
    ],
    relatedComponents: ['H0Toast', 'H0AlertDialog', 'H0Icon'],
} satisfies ComponentAgentRecordV1
