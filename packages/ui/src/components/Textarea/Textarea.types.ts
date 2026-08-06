export type H0TextareaInputMode = 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url'

export type H0TextareaSize = H0Size
export type H0TextareaVariant = H0InputVariant
import type { H0Size } from '../../types'
import type { H0InputVariant } from '../Input'
import type H0TextareaComponent from './H0Textarea.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0TextareaProps = H0PublicProps<typeof H0TextareaComponent>
export type H0TextareaEmits = H0PublicEmits<typeof H0TextareaComponent>
