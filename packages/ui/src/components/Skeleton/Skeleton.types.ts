export type H0SkeletonVariant = 'block' | 'circle' | 'text'
import type H0SkeletonComponent from './H0Skeleton.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0SkeletonProps = H0PublicProps<typeof H0SkeletonComponent>
