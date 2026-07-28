import type { ComponentAgentRecordV1 } from '../schema.ts'

export const cardAgentRecord = {
    schemaVersion: 1, component: 'H0Card', status: 'migrated', summary: 'Composable surface for grouped content, metadata, and actions with optional interactivity.',
    imports: { components: ['H0Card'], types: ['H0CardElement', 'H0CardProps', 'H0CardRadius', 'H0CardRadiusCorner', 'H0CardVariant'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'as', type: 'H0CardElement', default: "'div'", description: 'Rendered root element, including semantic containers, button, or anchor.' },
            { name: 'variant', type: 'H0CardVariant', default: "'surface'", description: 'Surface, secondary, or outline appearance.' },
            { name: 'radius', type: 'H0CardRadius', default: "'all'", description: 'Rounded corners applied to all, none, one, or several corners.' },
            { name: 'padding', type: 'boolean', default: 'false', description: 'Adds standard padding to the main content region.' },
            { name: 'shadow', type: 'boolean', default: 'false', description: 'Adds the theme shadow.' },
            { name: 'interactive', type: 'boolean', default: 'false', description: 'Enables focus, hover, pointer, and ripple feedback.' },
        ],
        events: [],
        slots: [
            { name: 'header', type: '—', description: 'Top title or metadata row.' }, { name: 'description', type: '—', description: 'Muted supporting text below the header.' },
            { name: 'default', type: '—', description: 'Primary card content.' }, { name: 'content', type: '—', description: 'Named fallback used when the default slot is absent.' },
            { name: 'footer', type: '—', description: 'Bottom action or metadata row with a separator.' },
        ],
        exposed: [],
        types: [
            { name: 'H0CardElement', fields: [{ name: 'H0CardElement', type: "'div' | 'article' | 'section' | 'aside' | 'button' | 'a'", description: 'Supported root elements.' }] },
            { name: 'H0CardVariant', fields: [{ name: 'H0CardVariant', type: "'secondary' | 'surface' | 'outline'", description: 'Supported visual variants.' }] },
            { name: 'H0CardRadiusCorner', fields: [{ name: 'H0CardRadiusCorner', type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'", description: 'Individually configurable card corners.' }] },
            { name: 'H0CardRadius', fields: [{ name: 'H0CardRadius', type: "'all' | 'none' | H0CardRadiusCorner | H0CardRadiusCorner[]", description: 'Public rounded-corner configuration.' }] },
        ],
    },
    useWhen: ['Related content and actions need one surface.', 'A semantic article, section, aside, or navigational link needs card styling.'],
    avoidWhen: ['Content does not form a meaningful group.', 'A simple action can use H0Button.', 'The whole card performs an action; the current button-root markup limitation should be resolved first.', 'Nested interactive controls would be placed inside an interactive card.'],
    accessibility: ['Match as to semantics and behavior.', 'Provide href and an accessible destination label for anchor cards.', 'Avoid nested controls inside interactive cards.'],
    styling: ['Use variant, radius, padding, and shadow.', 'Treat card selectors and radius variables as implementation details.'],
    responsive: ['Control columns and stacking from the parent layout.'], performance: ['Avoid unnecessary interactive ripple behavior on static cards.'],
    examples: [
        { key: 'components/card/CompositionExample', purpose: 'Semantic article with header, description, content, and footer composition.' },
        { key: 'components/card/VariantsExample', purpose: 'All public surface variants.' },
        { key: 'components/card/RadiusExample', purpose: 'All, none, single-corner, and multi-corner radius configuration.' },
        { key: 'components/card/InteractiveExample', purpose: 'Native anchor card with navigation and interaction feedback.' },
    ],
    relatedComponents: ['H0Button', 'H0Typography'],
} satisfies ComponentAgentRecordV1
