export type H0RadioValue = string | number
export type H0RadioVariant = 'secondary' | 'surface'

export type H0RadioValidator = (value: H0RadioValue | null | undefined) => boolean | string

export type H0RadioOrientation = 'vertical' | 'horizontal'

export type H0RadioGroupVariant = 'list' | 'cards'

export type H0RadioOption = {
    title: string
    value: H0RadioValue
    description?: string
    price?: string | number
    disabled?: boolean
}
import type H0RadioComponent from './H0Radio.vue'
import type H0RadioGroupComponent from './H0RadioGroup.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0RadioProps = H0PublicProps<typeof H0RadioComponent>
export type H0RadioEmits = H0PublicEmits<typeof H0RadioComponent>
export type H0RadioGroupProps = H0PublicProps<typeof H0RadioGroupComponent>
export type H0RadioGroupEmits = H0PublicEmits<typeof H0RadioGroupComponent>
