import type { H0IconSource } from '../Icon'
export type H0EmptyStateVariant = 'inline' | 'surface' | 'page'
export type H0EmptyStateProps = { title?: string; description?: string; icon?: H0IconSource; image?: string; imageAlt?: string; primaryAction?: string; secondaryAction?: string; variant?: H0EmptyStateVariant }
