import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const linkAgentRecord = {
    schemaVersion: 1, component: 'H0Link', status: 'migrated', summary: 'Polymorphic navigation link with semantic tones, external disclosure, disabled behavior, and attribute forwarding.',
    imports: { components: ['H0Link'], types: ['H0LinkProps', 'H0LinkTone', 'H0LinkVariant', 'H0Size'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'as', type: 'string | Component', default: "'a'", description: 'Native anchor or router-compatible component.' }, { name: 'href', type: 'string', default: 'undefined', description: 'Native anchor destination.' }, { name: 'to', type: 'unknown', default: 'undefined', description: 'Router-compatible destination.' },
        { name: 'external', type: 'boolean', default: 'false', description: 'Shows an external indicator and accessible suffix.' }, { name: 'externalText', type: 'string', default: "''", description: 'External-link accessible suffix override.' }, { name: 'download', type: 'boolean | string', default: 'undefined', description: 'Native download behavior.' },
        { name: 'target', type: 'string', default: 'undefined', description: 'Browsing-context target.' }, { name: 'rel', type: 'string', default: 'noopener noreferrer for external or blank targets', description: 'Link relationship override.' }, { name: 'tone', type: 'H0LinkTone', default: "'primary'", description: 'Semantic link color.' },
        { name: 'variant', type: "'default' | 'subtle' | 'standalone'", default: "'default'", description: 'Underline and emphasis treatment.' }, { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Typography size.' }, { name: 'disabled', type: 'boolean', default: 'false', description: 'Removes navigation and focus.' },
        { name: 'ariaCurrent', type: "'page' | 'step' | 'location' | 'date' | 'time' | true", default: 'undefined', description: 'Current-item relationship.' }, { name: 'rootAttrs', type: 'Record<string, unknown>', default: 'undefined', description: 'Attributes merged onto the rendered root.' },
    ], events: [
        { name: 'click', type: 'MouseEvent', description: 'Reports an enabled click.' }, { name: 'focus', type: 'FocusEvent', description: 'Reports focus.' }, { name: 'blur', type: 'FocusEvent', description: 'Reports blur.' },
    ], slots: [{ name: 'default', type: '—', description: 'Visible destination label.' }], exposed: [], types: [
        { name: 'H0LinkTone', fields: [{ name: 'H0LinkTone', type: "'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger'", description: 'Supported semantic link colors.' }] },
        { name: 'H0LinkVariant', fields: [{ name: 'H0LinkVariant', type: "'default' | 'subtle' | 'standalone'", description: 'Supported underline and emphasis treatments.' }] },
        { name: 'H0Size', fields: [{ name: 'H0Size', type: "'sm' | 'md' | 'lg'", description: 'Shared component size scale.' }] },
    ] },
    useWhen: ['Activating text navigates to another location or resource.'], avoidWhen: ['Activation performs an action without navigation; use H0Button.'], ...standardNavigationGuidance,
    examples: [{ key: 'components/link/BasicExample', purpose: 'Internal, external, semantic, and disabled links.' }, { key: 'components/link/AppearanceExample', purpose: 'Tones, variants, and sizes.' }, { key: 'components/link/EventsExample', purpose: 'Enabled events and disabled behavior.' }], relatedComponents: ['H0Button', 'H0Breadcrumbs'],
} satisfies ComponentAgentRecordV1
