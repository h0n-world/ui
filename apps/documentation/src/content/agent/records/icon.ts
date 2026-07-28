import type { ComponentAgentRecordV1 } from '../schema.ts'

export const iconAgentRecord = {
    schemaVersion: 1, component: 'H0Icon', status: 'migrated', summary: 'SVG renderer for lightweight structural icon definitions with no external icon dependency.',
    imports: { components: ['H0Icon'], types: ['H0IconDefinition', 'H0IconNode', 'H0IconProps', 'H0IconStrokeLinecap', 'H0IconStrokeLinejoin'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'icon', type: 'H0IconDefinition', description: 'Structural icon definition declared locally, adapted from another source, or imported from @h0nio/ui/icons.' }, { name: 'size', type: 'number | string', default: '20', description: 'Equal SVG width and height; numbers become pixels.' },
            { name: 'strokeWidth', type: 'number | string', default: '2', description: 'SVG stroke width.' }, { name: 'title', type: 'string', default: "''", description: 'Accessible SVG title; empty icons are aria-hidden.' },
            { name: 'strokeLinecap', type: 'H0IconStrokeLinecap', default: "'round'", description: 'SVG line cap style.' }, { name: 'strokeLinejoin', type: 'H0IconStrokeLinejoin', default: "'round'", description: 'SVG line join style.' },
        ],
        events: [], slots: [], exposed: [],
        types: [
            { name: 'H0IconDefinition', fields: [{ name: 'name', type: 'string', description: 'Stable icon name exposed as data-icon.' }, { name: 'nodes', type: 'readonly H0IconNode[]', description: 'SVG path, circle, line, or polyline nodes.' }, { name: 'viewBox', type: 'string', default: "'0 0 24 24'", description: 'Optional SVG view box; the component supplies the documented fallback.' }] },
            { name: 'H0IconNode', fields: [{ name: 'H0IconNode', type: "readonly ['path', { readonly d: string }] | readonly ['circle', { readonly cx: number; readonly cy: number; readonly r: number }] | readonly ['line', { readonly x1: number; readonly y1: number; readonly x2: number; readonly y2: number }] | readonly ['polyline', { readonly points: string }]", description: 'Supported readonly SVG node tuple union.' }] },
            { name: 'H0IconStrokeLinecap', fields: [{ name: 'H0IconStrokeLinecap', type: "'butt' | 'round' | 'square'", description: 'Supported SVG stroke-linecap values.' }] },
            { name: 'H0IconStrokeLinejoin', fields: [{ name: 'H0IconStrokeLinejoin', type: "'bevel' | 'miter' | 'round'", description: 'Supported SVG stroke-linejoin values.' }] },
        ],
    },
    useWhen: ['A system SVG icon is needed inside text or a control.'], avoidWhen: ['A bitmap or content image is required.', 'Visible text already communicates the information and no decorative icon is needed.'],
    accessibility: ['Omit title for decorative icons.', 'Provide title for standalone meaningful icons.', 'Name icon-only parent controls separately.'],
    styling: ['Icons inherit currentColor.', 'Use public sizing and stroke props.', 'Custom definitions are stroke-based, fill-none SVGs.'], responsive: ['Choose size relative to nearby text or controls.'], performance: ['Import individual system definitions from @h0nio/ui/icons.', 'Keep larger product icon catalogs outside the UI package.', 'Use H0Spinner rather than expecting loadingIcon to animate.'],
    examples: [
        { key: 'components/icon/GalleryExample', purpose: 'Small tree-shakeable system icon set bundled with @h0nio/ui.' },
        { key: 'components/icon/StrokeExample', purpose: 'Numeric and CSS sizes, stroke settings, and inherited colors.' },
        { key: 'components/icon/AccessibilityExample', purpose: 'Decorative, titled, and icon-only button semantics.' },
    ],
    relatedComponents: ['H0Button', 'H0Image', 'H0Spinner'],
} satisfies ComponentAgentRecordV1
