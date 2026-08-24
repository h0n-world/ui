import type { H0OverlayBackdrop } from '../_shared/Overlay.types'

export type H0AlertTone = 'default' | 'info' | 'success' | 'warning' | 'danger'
export type H0AlertVariant = 'secondary' | 'surface' | 'outline'

export type H0AlertDialogTone = 'danger' | 'info' | 'success' | 'warning'

export type H0AlertDialogBackdrop = H0OverlayBackdrop
import type H0AlertComponent from './H0Alert.vue'
import type H0AlertDialogComponent from './H0AlertDialog.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0AlertProps = H0PublicProps<typeof H0AlertComponent>
export type H0AlertEmits = H0PublicEmits<typeof H0AlertComponent>
export type H0AlertDialogProps = H0PublicProps<typeof H0AlertDialogComponent>
export type H0AlertDialogEmits = H0PublicEmits<typeof H0AlertDialogComponent>
