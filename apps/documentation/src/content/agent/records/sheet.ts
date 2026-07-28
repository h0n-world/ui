import type { ComponentAgentRecordV1 } from '../schema.ts'

export const sheetAgentRecord = {
    schemaVersion: 1,
    component: 'H0Sheet',
    status: 'migrated',
    summary: 'Compact inset modal surface positioned near a viewport edge.',
    imports: { components: ['H0Sheet'], types: ['H0SheetBackdrop', 'H0SheetEmits', 'H0SheetProps', 'H0SheetSide'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'modelValue', type: 'boolean', default: 'undefined', description: 'Controlled open state used by v-model.' },
            { name: 'defaultValue', type: 'boolean', default: 'false', description: 'Initial uncontrolled open state.' },
            { name: 'side', type: 'H0SheetSide', default: "'bottom'", description: "Inset viewport edge: 'top', 'right', 'bottom', or 'left'." },
            { name: 'backdrop', type: 'H0SheetBackdrop', default: "'opaque'", description: "Backdrop appearance: 'opaque', 'blur', or 'transparent'." },
            { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Allows backdrop dismissal.' },
            { name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'Allows Escape dismissal.' },
            { name: 'ariaLabel', type: 'string', default: "''", description: 'Accessible dialog name before locale fallback.' },
            { name: 'teleportTo', type: 'string | HTMLElement', default: "'body'", description: 'Teleport destination.' },
            { name: 'teleportDisabled', type: 'boolean', default: 'false', description: 'Renders the overlay in place.' },
            { name: 'initialFocus', type: 'string | HTMLElement', default: 'undefined', description: 'Selector or element focused after opening.' },
            { name: 'returnFocus', type: 'boolean | HTMLElement', default: 'true', description: 'Controls focus restoration.' },
            { name: 'lockScroll', type: 'boolean', default: 'true', description: 'Locks document scrolling while open.' },
        ],
        events: [
            { name: 'update:modelValue', type: 'boolean', description: 'Requests controlled state changes.' },
            { name: 'change', type: 'boolean', description: 'Reports committed state changes.' },
            { name: 'close', type: '—', description: 'Reports any close path.' },
        ],
        slots: [{ name: 'default', type: '—', description: 'All visible sheet content and actions.' }],
        exposed: [],
        types: [
            { name: 'H0SheetSide', fields: [{ name: 'H0SheetSide', type: "'top' | 'right' | 'bottom' | 'left'", description: 'Inset viewport edge used to position the sheet.' }] },
            { name: 'H0SheetBackdrop', fields: [{ name: 'H0SheetBackdrop', type: "'opaque' | 'blur' | 'transparent'", description: 'Available backdrop appearances.' }] },
        ],
    },
    useWhen: ['A short modal workflow should float near a viewport edge.', 'Mobile-first quick actions need a bottom surface.'],
    avoidWhen: ['A full-height navigation surface needs H0Drawer.', 'A centered form needs H0Modal.'],
    accessibility: ['Provide a meaningful ariaLabel.', 'Include a visible completion or close action.', 'Do not imply that the decorative handle is draggable.'],
    styling: ['Style slot content with public tokens.', 'Treat handle and panel selectors as implementation details.'],
    responsive: ['The sheet preserves a viewport inset and scrolls overflowing content.'],
    performance: ['Keep sheet workflows compact; content mounts only while open.'],
    examples: [
        { key: 'components/sheet/BasicExample', purpose: 'Controlled bottom sheet with a clear completion action.' },
        { key: 'components/sheet/PreferencesExample', purpose: 'Compact preferences workflow composed from H0N switches.' },
        { key: 'components/sheet/SidesExample', purpose: 'Inset sheet positioned at each viewport edge.' },
        { key: 'components/sheet/BackdropsExample', purpose: 'Opaque, blurred, and transparent backdrop treatments.' },
    ],
    relatedComponents: ['H0Drawer', 'H0Modal'],
} satisfies ComponentAgentRecordV1
