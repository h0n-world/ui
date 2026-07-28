export const standardNavigationGuidance = {
    accessibility: ['Provide a specific accessible name for navigation landmarks or grouped controls.', 'Keep visual, DOM, focus, and reading order aligned.', 'Do not communicate the active destination through color alone.'],
    styling: ['Use public variants, sizes, states, slots, and H0N design tokens.', 'Treat internal active indicators and structural selectors as implementation details.'],
    responsive: ['Keep labels concise and test keyboard access in narrow containers.', 'Prefer overflow or an alternate orientation to unreadable wrapping.'],
    performance: ['Keep item arrays and values stable when their content does not change.', 'Avoid expensive application work on focus-only navigation.'],
}
