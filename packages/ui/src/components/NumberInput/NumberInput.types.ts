import type H0NumberInputComponent from './H0NumberInput.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0NumberParser = (value: string, locale?: string) => number | null | undefined
export type H0NumberFormatter = (value: number, locale?: string) => string
export type H0NumberInputProps = H0PublicProps<typeof H0NumberInputComponent>
export type H0NumberInputEmits = H0PublicEmits<typeof H0NumberInputComponent>
export type H0NumberFormatOptions = Intl.NumberFormatOptions
