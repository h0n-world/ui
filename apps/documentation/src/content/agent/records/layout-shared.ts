export const standardLayoutGuidance = {
    accessibility: ['Choose semantic roots that match the document structure.', 'Keep visual and DOM order aligned.', 'Do not use spacing alone to communicate relationships.'],
    styling: ['Use component props for structure and public H0N tokens for product-specific surfaces.', 'Treat generated CSS variables and internal classes as implementation details.'],
    responsive: ['Start with a useful base value and add only necessary breakpoint overrides.', 'Test narrow containers as well as viewport breakpoints.'],
    performance: ['Responsive behavior is CSS-driven and installs no resize listeners.', 'Avoid unnecessary wrapper depth when one primitive expresses the relationship.'],
}

export const polymorphicSlot = [{ name: 'default', type: '—', description: 'Content rendered inside the selected semantic root.' }]
