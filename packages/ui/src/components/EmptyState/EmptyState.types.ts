import type { H0IconDefinition } from '../Icon'
export type H0EmptyStateVariant = 'inline' | 'surface' | 'page'
export type H0EmptyStateProps = { title?: string; description?: string; icon?: H0IconDefinition; image?: string; imageAlt?: string; primaryAction?: string; secondaryAction?: string; variant?: H0EmptyStateVariant }
