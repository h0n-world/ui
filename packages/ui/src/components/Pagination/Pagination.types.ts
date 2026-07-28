import type { H0Size } from '../../types'

export type H0PaginationSize = H0Size
import type H0PaginationComponent from './H0Pagination.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0PaginationProps = H0PublicProps<typeof H0PaginationComponent>
export type H0PaginationEmits = H0PublicEmits<typeof H0PaginationComponent>
