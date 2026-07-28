export type H0ChipTone = 'default' | 'primary' | 'success' | 'warning' | 'danger'
import type H0ChipComponent from './H0Chip.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0ChipProps = H0PublicProps<typeof H0ChipComponent>
export type H0ChipEmits = H0PublicEmits<typeof H0ChipComponent>
