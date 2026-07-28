export type H0AvatarStatus = 'failed' | 'loaded' | 'pending'

export type H0AvatarColor = 'blue' | 'red' | 'green' | 'purple' | 'pink' | 'cyan' | 'orange'
import type H0AvatarComponent from './H0Avatar.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0AvatarProps = H0PublicProps<typeof H0AvatarComponent>
