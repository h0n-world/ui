import type { H0OverlayBackdrop } from '../_shared/Overlay.types'
import type { H0OverlaySide } from '../../types'

export type H0SheetSide = H0OverlaySide

export type H0SheetBackdrop = H0OverlayBackdrop
import type H0SheetComponent from './H0Sheet.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0SheetProps = H0PublicProps<typeof H0SheetComponent>
export type H0SheetEmits = H0PublicEmits<typeof H0SheetComponent>
