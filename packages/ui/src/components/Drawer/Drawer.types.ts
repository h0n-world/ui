import type { H0OverlayBackdrop } from '../_shared/Overlay.types'
import type { H0OverlaySide } from '../../types'

export type H0DrawerSide = H0OverlaySide

export type H0DrawerBackdrop = H0OverlayBackdrop
import type H0DrawerComponent from './H0Drawer.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0DrawerProps = H0PublicProps<typeof H0DrawerComponent>
export type H0DrawerEmits = H0PublicEmits<typeof H0DrawerComponent>
