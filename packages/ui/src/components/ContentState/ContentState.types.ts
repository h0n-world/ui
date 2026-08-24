import type H0ContentStateComponent from './H0ContentState.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0ContentStateValue = 'loading' | 'error' | 'empty' | 'content'
export type H0ContentStateProps = H0PublicProps<typeof H0ContentStateComponent>
