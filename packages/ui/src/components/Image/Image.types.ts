export type H0ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export type H0ImageLoading = 'eager' | 'lazy'

export type H0ImageStatus = 'idle' | 'loading' | 'loaded' | 'error'
import type H0ImageComponent from './H0Image.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0ImageProps = H0PublicProps<typeof H0ImageComponent>
export type H0ImageEmits = H0PublicEmits<typeof H0ImageComponent>
