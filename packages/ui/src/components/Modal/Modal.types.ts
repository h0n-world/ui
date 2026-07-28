import type { H0OverlayBackdrop } from '../_shared/Overlay.types'
import type { H0OverlaySide } from '../../types'

export type H0ModalSide = 'center' | H0OverlaySide

export type H0ModalBackdrop = H0OverlayBackdrop
import type H0ModalComponent from './H0Modal.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0ModalProps = H0PublicProps<typeof H0ModalComponent>
export type H0ModalEmits = H0PublicEmits<typeof H0ModalComponent>
