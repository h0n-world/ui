export type H0BreadcrumbTarget = string | Record<string, unknown>

export interface H0BreadcrumbItem {
    label: string
    to?: H0BreadcrumbTarget
    href?: string
    disabled?: boolean
}
import type H0BreadcrumbsComponent from './H0Breadcrumbs.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0BreadcrumbsProps = H0PublicProps<typeof H0BreadcrumbsComponent>
