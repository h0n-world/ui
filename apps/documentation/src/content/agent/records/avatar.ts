import type { ComponentAgentRecordV1 } from '../schema.ts'

export const avatarAgentRecord = {
    schemaVersion: 1,
    component: 'H0Avatar',
    status: 'migrated',
    summary: 'User or account image with skeleton loading, deterministic color, and initials fallback.',
    imports: { components: ['H0Avatar'], types: ['H0AvatarColor', 'H0AvatarProps', 'H0AvatarStatus'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'alt', type: 'string', default: "''", description: 'Accessible image description and highest-priority wrapper label.' },
            { name: 'cache', type: 'boolean', default: 'true', description: 'Caches loaded or failed status per source in sessionStorage.' },
            { name: 'color', type: 'H0AvatarColor | null', default: 'null', description: 'Explicit initials background color; otherwise derived from identity text.' },
            { name: 'fallback', type: 'string | null', default: 'null', description: 'Highest-priority initials source, trimmed to two uppercase characters.' },
            { name: 'name', type: 'string | null', default: "''", description: 'Name used for initials, automatic color, and accessible labeling.' },
            { name: 'radius', type: 'string', default: "'50%'", description: 'CSS border radius for the wrapper and skeleton.' },
            { name: 'size', type: 'number | string', default: '38', description: 'Equal width and height; numbers are converted to pixels.' },
            { name: 'src', type: 'string | null', default: "''", description: 'Image source loaded before replacing the skeleton or fallback.' },
            { name: 'username', type: 'string | null', default: "''", description: 'Secondary identity source for initials, color, and labeling.' },
        ],
        events: [], slots: [], exposed: [],
        types: [
            { name: 'H0AvatarColor', fields: [{ name: 'H0AvatarColor', type: "'blue' | 'red' | 'green' | 'purple' | 'pink' | 'cyan' | 'orange'", description: 'Supported fallback color names.' }] },
            { name: 'H0AvatarStatus', fields: [{ name: 'H0AvatarStatus', type: "'failed' | 'loaded' | 'pending'", description: 'Exported union used internally for image loading and cached source status.' }] },
        ],
    },
    useWhen: ['A person, team, or account needs a compact visual identity.', 'An image requires initials fallback and loading feedback.'],
    avoidWhen: ['The image is content rather than identity; use H0Image.', 'A decorative shape does not need an image role.'],
    accessibility: ['Provide meaningful alt or identity text.', 'The wrapper always exposes role=img, including fallback initials.'],
    styling: ['Use size, radius, and color before local styles.', 'Treat .h-avatar and --h-avatar-* as implementation details.'],
    responsive: ['Choose a size appropriate to the surrounding density.', 'Keep avatars fixed-size inside flexible layouts.'],
    performance: ['Keep cache enabled for stable repeated URLs.', 'Disable status caching when content changes behind an unchanged URL.'],
    examples: [
        { key: 'components/avatar/BasicExample', purpose: 'Image and initials fallback sources.' },
        { key: 'components/avatar/ColorsExample', purpose: 'All explicit fallback color options.' },
        { key: 'components/avatar/SizingExample', purpose: 'Numeric and CSS-string dimensions with custom radius.' },
    ],
    relatedComponents: ['H0Image', 'H0Skeleton'],
} satisfies ComponentAgentRecordV1
