import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const tabsAgentRecord = {
    schemaVersion: 1, component: 'H0Tabs', status: 'migrated', summary: 'Controlled or uncontrolled tabs coordinator with data-driven and compound composition, keyboard modes, and panel mount strategies.',
    imports: { components: ['H0Tabs'], types: ['H0TabItem', 'H0TabsActivation', 'H0TabsMountMode', 'H0TabsProps', 'H0TabValue'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'Value', default: 'undefined', description: 'Controlled active tab value.' }, { name: 'defaultValue', type: 'Value', default: 'first enabled item', description: 'Initial uncontrolled tab value.' }, { name: 'items', type: 'H0TabItem<Value>[]', default: '[]', description: 'Data-driven tabs. Do not combine with compound children.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Tab-list direction and arrow keys.' }, { name: 'activationMode', type: "'automatic' | 'manual'", default: "'automatic'", description: 'Whether focus immediately activates a tab.' }, { name: 'mountMode', type: "'all' | 'lazy' | 'active'", default: "'all'", description: 'Inactive panel mounting policy.' },
        { name: 'loop', type: 'boolean', default: 'true', description: 'Wraps arrow-key focus at list boundaries.' }, { name: 'ariaLabel', type: 'string', default: "''", description: 'Data-driven tab-list accessible name.' }, { name: 'id', type: 'string', default: "''", description: 'Stable base for tab and panel IDs.' },
    ], events: [{ name: 'update:modelValue', type: 'Value', description: 'Requests active-tab update.' }, { name: 'change', type: 'Value', description: 'Reports user-initiated activation.' }], slots: [
        { name: 'default', type: '—', description: 'Compound H0TabList, H0Tab, and H0TabPanel children.' }, { name: 'tab', type: '{ item: H0TabItem<Value>; index: number }', description: 'Custom data-driven tab content.' }, { name: 'panel', type: '{ item: H0TabItem<Value>; index: number }', description: 'Data-driven panel content.' },
    ], exposed: [], types: [
        { name: 'H0TabValue', fields: [{ name: 'H0TabValue', type: 'string | number', description: 'Supported tab and panel identity.' }] },
        { name: 'H0TabsActivation', fields: [{ name: 'H0TabsActivation', type: "'automatic' | 'manual'", description: 'Whether focus activates a tab immediately.' }] },
        { name: 'H0TabsMountMode', fields: [{ name: 'H0TabsMountMode', type: "'all' | 'lazy' | 'active'", description: 'Inactive panel mounting policy.' }] },
        { name: 'H0TabItem', fields: [
            { name: 'value', type: 'Value', description: 'Unique tab and panel identity preserving the generic value.' }, { name: 'label', type: 'string', description: 'Visible fallback tab label.' }, { name: 'disabled', type: 'boolean | undefined', description: 'Disables the tab.' },
        ] },
    ] },
    useWhen: ['Several peer content panels share one region and only one is active.'], avoidWhen: ['Choices change a compact mode without semantic panels; use H0Segment.', 'Destinations navigate to separate pages; use links.'], ...standardNavigationGuidance,
    performance: ['Use active mounting when inactive panels may reset safely.', 'Use lazy mounting to retain expensive panels after their first visit.', 'Do not combine items with compound children.'],
    examples: [{ key: 'components/tabs/BasicExample', purpose: 'Compound tabs with controlled active value.' }, { key: 'components/tabs/DataExample', purpose: 'Generic data-driven numeric tabs.' }, { key: 'components/tabs/ModesExample', purpose: 'Vertical manual activation without looping.' }, { key: 'components/tabs/MountExample', purpose: 'Lazy panel mounting with retained state.' }], relatedComponents: ['H0TabList', 'H0Tab', 'H0TabPanel', 'H0Segment'],
} satisfies ComponentAgentRecordV1
