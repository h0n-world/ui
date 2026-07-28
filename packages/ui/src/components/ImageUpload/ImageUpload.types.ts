export type H0ImageUploadPreset = 'avatar' | 'banner' | 'square' | 'vertical' | 'custom'

export type H0ImageUploadFit = 'contain' | 'cover'

export type H0ImageUploadErrorCode = 'format' | 'size' | 'empty'

export interface H0ImageUploadError {
    code: H0ImageUploadErrorCode
    message: string
    file?: File
}
import type H0ImageUploadComponent from './H0ImageUpload.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0ImageUploadProps = H0PublicProps<typeof H0ImageUploadComponent>
export type H0ImageUploadEmits = H0PublicEmits<typeof H0ImageUploadComponent>
