import type { H0Size } from '../../types'

export type H0ButtonTone = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type H0ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost'
export type H0ButtonSize = H0Size
export type H0ButtonTypeVariant = 'default' | 'withIcon' | 'onlyIcon'
import type H0ButtonComponent from './H0Button.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0ButtonProps = H0PublicProps<typeof H0ButtonComponent>
