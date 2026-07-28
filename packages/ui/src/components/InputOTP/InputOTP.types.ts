export type H0InputOTPLength = 4 | 6

export type H0InputOTPVariant = 'secondary' | 'surface'

export type H0InputOTPValidation = 'numeric' | 'alphanumeric'

export type H0InputOTPValidator = (value: string) => boolean | string
import type H0InputOTPComponent from './H0InputOTP.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0InputOTPProps = H0PublicProps<typeof H0InputOTPComponent>
export type H0InputOTPEmits = H0PublicEmits<typeof H0InputOTPComponent>
