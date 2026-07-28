import type { ComponentAgentRecordV1 } from '../schema.ts'

export const messageAgentRecord = {
    schemaVersion: 1, component: 'H0Message', status: 'migrated', summary: 'Compact supporting or status text with an optional tone-specific decorative icon.',
    imports: { components: ['H0Message'], types: ['H0MessageProps', 'H0MessageTone'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'tone', type: 'H0MessageTone', default: "'default'", description: 'Selects presentation and the mapped info, error, success, or warning icon.' }, { name: 'text', type: 'string | number', default: "''", description: 'String or numeric fallback used when the default slot is absent.' },
        { name: 'icon', type: 'boolean', default: 'true', description: 'Shows or hides the mapped decorative icon; custom definitions are not accepted.' },
    ], events: [], slots: [{ name: 'default', type: '—', description: 'Message content that takes precedence over text.' }], exposed: [], types: [{ name: 'H0MessageTone', fields: [{ name: 'H0MessageTone', type: "'default' | 'error' | 'success' | 'warning'", description: 'Supported message tones and icon mappings.' }] }] },
    useWhen: ['Compact status or informational copy benefits from an icon.'], avoidWhen: ['A field validation error needs the dedicated H0ErrorMessage preset.', 'A full alert surface is required.'],
    accessibility: ['Visible text carries meaning; the icon is decorative.', 'Persistent messages need no live-region role.', 'Use role=status for non-urgent dynamic feedback and role=alert only for urgent errors.', 'Avoid recreating alerts on every input change.', 'Do not rely on tone alone.'], styling: ['Use tone and icon.', 'Use H0Typography for broader control.'],
    responsive: ['Allow message text to wrap.'], performance: ['Keep repeated status text concise.'], examples: [
        { key: 'components/message/TonesExample', purpose: 'All tone and icon states with slot and text content.' },
        { key: 'components/message/AnnouncementsExample', purpose: 'Dynamic non-urgent status and urgent alert semantics.' },
    ],
    relatedComponents: ['H0Alert', 'H0Description', 'H0ErrorMessage', 'H0Icon', 'H0Typography'],
} satisfies ComponentAgentRecordV1
