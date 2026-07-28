import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const tabPanelAgentRecord = {
    schemaVersion: 1, component: 'H0TabPanel', status: 'migrated', summary: 'Focusable compound tabpanel whose visibility and mount lifecycle follow H0Tabs state.',
    imports: { components: ['H0TabPanel'], types: ['H0TabValue'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [{ name: 'value', type: 'H0TabValue', description: 'Identity shared with the associated tab.' }], events: [], slots: [{ name: 'default', type: '—', description: 'Panel content.' }], exposed: [], types: [] },
    useWhen: ['Compound H0Tabs needs explicitly authored panel content or component state.'], avoidWhen: ['Items mode with one panel slot is sufficient.'], ...standardNavigationGuidance,
    examples: [{ key: 'components/tabs/BasicExample', purpose: 'Compound panel content.' }, { key: 'components/tabs/ModesExample', purpose: 'Panels in vertical tabs.' }, { key: 'components/tabs/MountExample', purpose: 'Lazy mounting with retained input state.' }], relatedComponents: ['H0Tabs', 'H0TabList', 'H0Tab'],
} satisfies ComponentAgentRecordV1
