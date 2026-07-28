import type { ComponentAgentRecordV1 } from '../schema.ts'

export const skeletonAgentRecord = {
    schemaVersion: 1, component: 'H0Skeleton', status: 'migrated', summary: 'Decorative loading placeholder with block, text, and circular geometry and reduced-motion shimmer handling.',
    imports: { components: ['H0Skeleton'], types: ['H0SkeletonProps', 'H0SkeletonVariant'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [{ name: 'circle', type: 'boolean', default: 'false', description: 'Forces fully circular radius.' }, { name: 'height', type: 'string', default: "'1rem'", description: 'CSS placeholder height.' }, { name: 'radius', type: 'string', default: "'var(--h0n-ui-radius-md)'", description: 'CSS corner radius.' }, { name: 'variant', type: 'H0SkeletonVariant', default: "'block'", description: 'Block, circle, or text geometry.' }, { name: 'width', type: 'string', default: "'100%'", description: 'CSS placeholder width.' }], events: [], slots: [], exposed: [], types: [{ name: 'H0SkeletonVariant', fields: [{ name: 'H0SkeletonVariant', type: "'block' | 'circle' | 'text'", description: 'Placeholder geometry.' }] }] },
    useWhen: ['The shape of loading content is known and layout should remain stable.'], avoidWhen: ['The content shape is unknown and one concise H0Spinner is enough.'], accessibility: ['Skeletons are aria-hidden; label the containing loading region once.', 'Mark the replaced region busy when useful.', 'Shimmer runs only in high animation mode and stops for the system reduced-motion preference.'], styling: ['Use dimensions, radius, variant, and public tokens.', 'Treat shimmer internals as implementation details.'], responsive: ['Use percentages for fluid text and blocks.', 'Match fixed circles to final avatar or icon size.'], performance: ['Approximate structure with a small number of nodes.', 'Remove the entire group when content resolves.'], examples: [
        { key: 'components/skeleton/VariantsExample', purpose: 'Block, text, and circular geometry.' },
        { key: 'components/skeleton/ProfileExample', purpose: 'Accessible profile-shaped loading group.' },
        { key: 'components/skeleton/CardExample', purpose: 'Responsive card placeholder geometry.' },
        { key: 'components/skeleton/LoadingStateExample', purpose: 'Parent-owned transition from placeholders to a real H0Card.' },
    ], relatedComponents: ['H0Spinner', 'H0Card', 'H0Typography'],
} satisfies ComponentAgentRecordV1
