import type { ComponentAgentRecordV1 } from '../schema.ts'

export const typographyAgentRecord = {
    schemaVersion: 1, component: 'H0Typography', status: 'migrated', summary: 'Semantic text primitive with H0N type variants, alignment, color, weight, line-height, letter-spacing, text-transform overrides, and truncation.',
    imports: { components: ['H0Typography'], types: ['H0TypographyAlign', 'H0TypographyColor', 'H0TypographyElement', 'H0TypographyLetterSpacing', 'H0TypographyLineHeight', 'H0TypographyProps', 'H0TypographyTextTransform', 'H0TypographyVariant', 'H0TypographyWeight'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'variant', type: 'H0TypographyVariant', default: "'body'", description: 'Visual type scale and default semantic element.' }, { name: 'as', type: 'H0TypographyElement', default: 'Element derived from variant', description: 'Overrides rendered HTML without changing appearance.' },
            { name: 'align', type: 'H0TypographyAlign', default: "'left'", description: 'Text alignment.' }, { name: 'color', type: 'H0TypographyColor', default: "'default'", description: 'Semantic text color.' },
            { name: 'truncate', type: 'boolean', default: 'false', description: 'Applies single-line ellipsis truncation.' }, { name: 'text', type: 'string | number', default: 'undefined', description: 'Replaces the default slot whenever it is defined, including as an empty string or zero.' },
            { name: 'weight', type: 'H0TypographyWeight', default: 'Variant weight', description: 'Overrides the visual font weight.' },
            { name: 'lineHeight', type: 'H0TypographyLineHeight', default: 'Variant line height', description: 'Overrides line height with a unitless number or CSS string.' },
            { name: 'letterSpacing', type: 'H0TypographyLetterSpacing', default: 'Variant letter spacing', description: 'Overrides letter spacing; numbers are measured in pixels and strings accept CSS values.' },
            { name: 'textTransform', type: 'H0TypographyTextTransform', default: 'Inherited', description: 'Controls capitalization without changing the source text.' },
        ],
        events: [], slots: [{ name: 'default', type: '—', description: 'Text or inline content used when text is undefined.' }], exposed: [],
        types: [
            { name: 'H0TypographyVariant', fields: [{ name: 'H0TypographyVariant', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'body-xs' | 'code'", description: 'Supported visual variants.' }] },
            { name: 'H0TypographyElement', fields: [{ name: 'H0TypographyElement', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label' | 'small' | 'strong' | 'em' | 'code'", description: 'Supported semantic elements.' }] },
            { name: 'H0TypographyWeight', fields: [{ name: 'H0TypographyWeight', type: '400 | 500 | 600 | 700', description: 'Supported numeric font weights.' }] },
            { name: 'H0TypographyLineHeight', fields: [{ name: 'H0TypographyLineHeight', type: 'number | string', description: 'Unitless numeric or explicit CSS line-height value.' }] },
            { name: 'H0TypographyLetterSpacing', fields: [{ name: 'H0TypographyLetterSpacing', type: 'number | string', description: 'Pixel-based numeric or explicit CSS letter-spacing value.' }] },
            { name: 'H0TypographyTextTransform', fields: [{ name: 'H0TypographyTextTransform', type: "'none' | 'capitalize' | 'uppercase' | 'lowercase'", description: 'Supported text transformations.' }] },
            { name: 'H0TypographyAlign', fields: [{ name: 'H0TypographyAlign', type: "'left' | 'center' | 'right'", description: 'Supported text alignments.' }] },
            { name: 'H0TypographyColor', fields: [{ name: 'H0TypographyColor', type: "'default' | 'muted' | 'secondary' | 'primary' | 'inherit'", description: 'Supported semantic text colors; inherit uses the parent color.' }] },
        ],
    },
    useWhen: ['Text needs the H0N scale with explicit semantics.', 'Visual type style differs from required HTML hierarchy.'], avoidWhen: ['A constrained Description, Label, ErrorMessage, or Message preset is more specific.'],
    accessibility: ['Choose semantic elements before visual variants.', 'Preserve heading hierarchy.', 'Use strong and em only when their semantics are intended.', 'Associate a rendered label with its control by passing for.', 'Do not rely on color or weight alone.'], styling: ['Use variants and global typography configuration.', 'Treat typography classes as implementation details.'],
    responsive: ['Allow body text to wrap.', 'Use truncate only inside constrained layouts.', 'Inline elements may need an appropriate layout or inline-block sizing before truncation can apply.'], performance: ['Prefer text prop or simple slot content for large repeated collections.'],
    examples: [
        { key: 'components/typography/SpecimensExample', purpose: 'Complete public type scale.' },
        { key: 'components/typography/ElementMappingExample', purpose: 'Default semantic element selected by every visual variant.' },
        { key: 'components/typography/SemanticsExample', purpose: 'Element override, alignment, inherited and semantic color, weight, and truncation.' },
        { key: 'components/typography/LineHeightExample', purpose: 'Unitless and explicit CSS line-height overrides.' },
        { key: 'components/typography/FormattingExample', purpose: 'Letter-spacing and text-transform overrides.' },
    ],
    relatedComponents: ['H0Description', 'H0ErrorMessage', 'H0Label', 'H0Message'],
} satisfies ComponentAgentRecordV1
