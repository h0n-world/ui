export type H0GridVariant = 'default' | 'auto-fit' | 'vertical' | 'three' | 'center-wide' | 'sidebar-left' | 'sidebar-right'
export type H0GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
import type H0GridComponent from './H0Grid.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0GridProps = H0PublicProps<typeof H0GridComponent>
