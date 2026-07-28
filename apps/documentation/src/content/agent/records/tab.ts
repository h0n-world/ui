import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const tabAgentRecord = {
    schemaVersion: 1, component: 'H0Tab', status: 'migrated', summary: 'Compound tab control linked to one H0TabPanel through the shared H0Tabs value and generated IDs.',
    imports: { components: ['H0Tab'], types: ['H0TabValue'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'value', type: 'H0TabValue', description: 'Identity shared with the associated panel.' }, { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables focus and activation.' },
    ], events: [], slots: [{ name: 'default', type: '—', description: 'Visible tab label.' }], exposed: [], types: [] },
    useWhen: ['Compound H0Tabs needs explicitly authored tab content.'], avoidWhen: ['Items mode can generate uniform tabs.'], ...standardNavigationGuidance,
    examples: [{ key: 'components/tabs/BasicExample', purpose: 'Compound tab controls.' }, { key: 'components/tabs/ModesExample', purpose: 'Manual activation and vertical orientation.' }, { key: 'components/tabs/MountExample', purpose: 'Tabs controlling lazy panels.' }], relatedComponents: ['H0Tabs', 'H0TabList', 'H0TabPanel'],
} satisfies ComponentAgentRecordV1
