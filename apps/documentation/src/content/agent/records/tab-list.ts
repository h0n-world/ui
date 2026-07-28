import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const tabListAgentRecord = {
    schemaVersion: 1, component: 'H0TabList', status: 'migrated', summary: 'Compound tablist that applies orientation-aware arrow, Home, End, loop, and RTL keyboard navigation.',
    imports: { components: ['H0TabList'], types: [], styles: ['@h0nio/ui/style.css'] },
    api: { props: [{ name: 'ariaLabel', type: 'string', default: 'Localized tabs label', description: 'Accessible tab-list name.' }], events: [], slots: [{ name: 'default', type: '—', description: 'H0Tab children in keyboard and visual order.' }], exposed: [], types: [] },
    useWhen: ['Compound H0Tabs needs an explicitly authored tab list.'], avoidWhen: ['H0Tabs items mode generates the tab list automatically.'], ...standardNavigationGuidance,
    examples: [{ key: 'components/tabs/BasicExample', purpose: 'Horizontal compound tab list.' }, { key: 'components/tabs/ModesExample', purpose: 'Vertical manual-activation tab list.' }, { key: 'components/tabs/MountExample', purpose: 'Tab list controlling lazy panels.' }], relatedComponents: ['H0Tabs', 'H0Tab', 'H0TabPanel'],
} satisfies ComponentAgentRecordV1
