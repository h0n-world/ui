import type { ComponentAgentRecordV1 } from '../schema.ts'

export const errorMessageAgentRecord = {
    schemaVersion: 1, component: 'H0ErrorMessage', status: 'migrated', summary: 'Danger-colored text preset for persistent validation and action errors.',
    imports: { components: ['H0ErrorMessage'], types: ['H0ErrorMessageElement', 'H0ErrorMessageProps'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [{ name: 'as', type: 'H0ErrorMessageElement', default: "'p'", description: 'Rendered paragraph, inline span, or neutral block div.' }, { name: 'text', type: 'string | number', default: "''", description: 'String or numeric fallback used when the default slot is absent.' }], events: [], slots: [{ name: 'default', type: '—', description: 'Error content that takes precedence over text.' }], exposed: [], types: [
        { name: 'H0ErrorMessageElement', fields: [{ name: 'H0ErrorMessageElement', type: "'p' | 'span' | 'div'", description: 'Supported standalone, inline, and neutral block elements.' }] },
    ] },
    useWhen: ['A field or action needs concise dedicated error text.'], avoidWhen: ['A broader status message with an icon is needed.', 'The message is not an error.'],
    accessibility: ['Reference persistent errors from their controls.', 'Use aria-errormessage together with aria-invalid=true.', 'Add role=alert only for newly rendered urgent errors.', 'Use recovery-oriented language.'], styling: ['The error preset is intentionally fixed.', 'Use H0Typography for custom presentation.'],
    responsive: ['Allow errors to wrap near their related control.'], performance: ['Avoid repeatedly recreating live alerts on every keystroke.'], examples: [
        { key: 'components/error-message/BasicExample', purpose: 'Supported elements, text fallback, and an opt-in dynamic alert.' },
        { key: 'components/error-message/InputIntegrationExample', purpose: 'H0Input validation with automatically connected and announced error text.' },
    ],
    relatedComponents: ['H0Description', 'H0Field', 'H0Input', 'H0Label', 'H0Message'],
} satisfies ComponentAgentRecordV1
