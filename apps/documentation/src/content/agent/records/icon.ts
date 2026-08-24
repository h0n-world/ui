import type { ComponentAgentRecordV1 } from '../schema.ts'

export const iconAgentRecord = {
    schemaVersion: 1, component: 'H0Icon', status: 'migrated', summary: 'SVG renderer for legacy node definitions and trusted tree-shakeable body definitions from @h0nio/icons.',
    imports: { components: ['H0Icon'], types: ['H0IconBodyDefinition', 'H0IconDefinition', 'H0IconNode', 'H0IconProps', 'H0IconSource', 'H0IconStrokeLinecap', 'H0IconStrokeLinejoin'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'icon', type: 'H0IconSource', description: 'Legacy node definition or trusted body definition imported from an individual @h0nio/icons subpath.' }, { name: 'size', type: 'number | string', default: '20', description: 'Equal SVG width and height; numbers become pixels.' },
            { name: 'strokeWidth', type: 'number | string', default: '2', description: 'SVG stroke width for legacy node definitions; body definitions preserve authored geometry.' }, { name: 'title', type: 'string', default: "''", description: 'Accessible SVG title; empty icons are aria-hidden.' },
            { name: 'strokeLinecap', type: 'H0IconStrokeLinecap', default: "'round'", description: 'SVG line cap style for legacy node definitions.' }, { name: 'strokeLinejoin', type: 'H0IconStrokeLinejoin', default: "'round'", description: 'SVG line join style for legacy node definitions.' },
        ],
        events: [], slots: [], exposed: [],
        types: [
            { name: 'H0IconSource', fields: [{ name: 'H0IconSource', type: 'H0IconDefinition | H0IconBodyDefinition', description: 'Union accepted by H0Icon and public component icon props.' }] },
            { name: 'H0IconBodyDefinition', fields: [{ name: 'name', type: 'string', description: 'Stable icon name exposed as data-icon.' }, { name: 'body', type: 'string', description: 'Trusted SVG body markup from a reviewed definition source.' }, { name: 'viewBox', type: 'string', description: 'SVG coordinate system authored by the icon package.' }] },
            { name: 'H0IconDefinition', fields: [{ name: 'name', type: 'string', description: 'Stable icon name exposed as data-icon.' }, { name: 'nodes', type: 'readonly H0IconNode[]', description: 'SVG path, circle, line, or polyline nodes.' }, { name: 'viewBox', type: 'string', default: "'0 0 24 24'", description: 'Optional SVG view box; the component supplies the documented fallback.' }] },
            { name: 'H0IconNode', fields: [{ name: 'H0IconNode', type: "readonly ['path', { readonly d: string }] | readonly ['circle', { readonly cx: number; readonly cy: number; readonly r: number }] | readonly ['line', { readonly x1: number; readonly y1: number; readonly x2: number; readonly y2: number }] | readonly ['polyline', { readonly points: string }]", description: 'Supported readonly SVG node tuple union.' }] },
            { name: 'H0IconStrokeLinecap', fields: [{ name: 'H0IconStrokeLinecap', type: "'butt' | 'round' | 'square'", description: 'Supported SVG stroke-linecap values.' }] },
            { name: 'H0IconStrokeLinejoin', fields: [{ name: 'H0IconStrokeLinejoin', type: "'bevel' | 'miter' | 'round'", description: 'Supported SVG stroke-linejoin values.' }] },
        ],
    },
    useWhen: ['A system SVG icon is needed inside text or a control.'], avoidWhen: ['A bitmap or content image is required.', 'Visible text already communicates the information and no decorative icon is needed.'],
    accessibility: ['Omit title for decorative icons.', 'Provide title for standalone meaningful icons.', 'Name icon-only parent controls separately.'],
    styling: ['Icons inherit currentColor.', 'Use size for both formats and stroke props only for node-based compatibility definitions.', 'Body definitions preserve their authored solid, stroke, and duotone geometry.'], responsive: ['Choose size relative to nearby text or controls.'], performance: ['Import individual definitions from @h0nio/icons/<name>.', 'Do not import @h0nio/icons/all or catalog in product runtime code.', 'Treat @h0nio/ui/icons as a compatibility facade, not the primary icon catalog.'],
    examples: [
        { key: 'components/icon/GalleryExample', purpose: 'Tree-shakeable solid, stroke, and duotone definitions imported from individual @h0nio/icons subpaths.' },
        { key: 'components/icon/SizeExample', purpose: 'Numeric pixel sizes and unchanged CSS size values using settings-minimalistic-stroke.' },
        { key: 'components/icon/StrokeExample', purpose: 'Authored stroke-style geometry from the settings-minimalistic-stroke definition.' },
        { key: 'components/icon/ColorExample', purpose: 'Inherited currentColor with default and semantic colors.' },
        { key: 'components/icon/AccessibilityExample', purpose: 'Decorative, titled, and icon-only button semantics.' },
    ],
    relatedComponents: ['H0Button', 'H0Image', 'H0Spinner'],
} satisfies ComponentAgentRecordV1
