export type H0CardElement = 'div' | 'article' | 'section' | 'aside' | 'button' | 'a'
export type H0CardVariant = 'secondary' | 'surface' | 'outline'
export type H0CardRadiusCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type H0CardRadius = 'all' | 'none' | H0CardRadiusCorner | H0CardRadiusCorner[]
import type H0CardComponent from './H0Card.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0CardProps = H0PublicProps<typeof H0CardComponent>
