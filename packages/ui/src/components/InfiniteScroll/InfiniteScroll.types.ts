export type H0InfiniteScrollRoot = 'nearest' | 'viewport'
import type H0InfiniteScrollComponent from './H0InfiniteScroll.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0InfiniteScrollProps = H0PublicProps<typeof H0InfiniteScrollComponent>
export type H0InfiniteScrollEmits = H0PublicEmits<typeof H0InfiniteScrollComponent>
