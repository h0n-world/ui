import type { ComponentAgentRecordV1 } from '../schema.ts'

export const dropdownAgentRecord = {
    schemaVersion: 1, component: 'H0Dropdown', status: 'migrated',
    summary: 'Floating disclosure with a consumer-owned trigger and arbitrary interactive content.',
    imports: { components: ['H0Dropdown'], types: ['H0DropdownProps', 'H0DropdownExpose', 'H0FloatingPlacement'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'modelValue', type: 'boolean', default: 'undefined', description: 'Controlled open state; update:modelValue must be applied by the owner.' },
            { name: 'defaultValue', type: 'boolean', default: 'false', description: 'Initial uncontrolled open state.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents opening and hides the surface. Does not disable unrelated trigger actions.' },
            { name: 'placement', type: 'H0FloatingPlacement', default: "'bottom-start'", description: 'Preferred position; flips and shifts at viewport boundaries.' },
            { name: 'offset', type: 'number', default: '6', description: 'Distance from the trigger in pixels.' },
            { name: 'minWidth', type: 'H0CssSize', default: '160', description: 'Minimum container width; number is pixels, string is a CSS length. Clamped to maxWidth and viewport.' },
            { name: 'maxWidth', type: 'H0CssSize', default: '360', description: 'Maximum container width, also limited by viewport space.' },
            { name: 'minHeight', type: 'H0CssSize', default: '0', description: 'Minimum container height, capped by maxHeight and available space.' },
            { name: 'maxHeight', type: 'H0CssSize', default: '320', description: 'Maximum container height; overflow scrolls within the available space.' },
            { name: 'teleportTo', type: 'string | HTMLElement', default: "'body'", description: 'Destination for the floating surface; must exist when mounted.' },
            { name: 'teleportDisabled', type: 'boolean', default: 'false', description: 'Renders content locally, subject to ancestor overflow and stacking contexts.' },
            { name: 'id', type: 'string', default: 'Generated with useId()', description: 'Stable surface ID referenced by aria-controls.' },
            { name: 'ariaLabel', type: 'string', default: "''", description: 'Accessible surface name; otherwise uses the trigger label.' },
            { name: 'contentAttrs', type: 'Record<string, unknown>', default: 'undefined', description: 'Native/ARIA attributes, classes and styles routed to the content container. Keep role dialog unless implementing a complete custom keyboard model.' },
        ],
        events: [
            { name: 'update:modelValue', type: 'boolean', description: 'Requests a change in open state.' },
            { name: 'open', type: '—', description: 'The rendered disclosure opened.' },
            { name: 'close', type: '—', description: 'The rendered disclosure closed.' },
        ],
        slots: [
            { name: 'default', type: '{ open: boolean; close: () => void; toggle: () => void }', description: 'Exactly one native element or component which forwards attributes and events to one focusable root. Interaction and ARIA are applied automatically.' },
            { name: 'content', type: '{ open: boolean; close: () => void; toggle: () => void }', description: 'Arbitrary content. Call close after actions when desired; content clicks do not close automatically.' },
        ],
        exposed: [
            { name: 'open', type: '() => void', description: 'Requests opening unless disabled.' },
            { name: 'close', type: '() => void', description: 'Requests closing and restores focus when it was inside.' },
            { name: 'toggle', type: '() => void', description: 'Requests the opposite open state.' },
        ],
        types: [
            { name: 'H0DropdownProps', fields: [{ name: 'H0DropdownProps', type: 'object', description: 'Complete public props contract, including open state, positioning and container constraints.' }] },
            { name: 'H0DropdownExpose', fields: [{ name: 'open / close / toggle', type: '() => void', description: 'Imperative requests; controlled state remains owned by the parent.' }] },
        ],
    },
    useWhen: ['A button, image or other control reveals custom actions or a compact form.', 'Content needs a floating container without a built-in trigger or item layout.'],
    avoidWhen: ['Selecting a value from options requires H0Select.', 'A modal task requires focus containment and background scroll locking.'],
    accessibility: ['Give every trigger an accessible name; native non-interactive elements receive role button and tabindex.', 'Custom trigger components must forward attributes and events to their actual control.', 'Initial focus enters the first enabled control or the panel. Escape closes and restores focus.', 'Tab traverses content and exits at its boundary; clicking or focusing elsewhere dismisses without stealing focus.', 'Custom semantic menus must implement their own menuitem roles and arrow-key model.'],
    styling: ['Use contentAttrs for container classes/styles and layout your own slot content.', 'Colors, radius, spacing, shadows and motion use shared tokens; internal selectors are private.'],
    responsive: ['Width and height constraints yield to available viewport space.', 'Logical start/end placement follows trigger direction; resize and scrolling update position.'],
    performance: ['Closed content is unmounted; position observers and dismissal listeners are cleaned up.', 'Use lightweight content for frequently repeated triggers.'],
    examples: [
        { key: 'components/dropdown/BasicExample', purpose: 'Custom actions and explicit close after selection.' },
        { key: 'components/dropdown/CustomExample', purpose: 'Image trigger, arbitrary form content, controlled state and size limits.' },
        { key: 'components/dropdown/OverlayExample', purpose: 'Nested modal/Select layering, constrained scrolling and disabled trigger.' },
    ],
    relatedComponents: ['H0Button', 'H0Select', 'H0Modal', 'H0Tooltip', 'H0Input'],
} satisfies ComponentAgentRecordV1
