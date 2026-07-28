import type { H0Size } from '../../types'

export type H0BadgeSize = Exclude<H0Size, 'lg'>
export type H0BadgeTone = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
import type H0BadgeComponent from './H0Badge.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0BadgeProps = H0PublicProps<typeof H0BadgeComponent>
