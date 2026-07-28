import type H0ToolbarComponent from './H0Toolbar.vue'
import type H0ToolbarGroupComponent from './H0ToolbarGroup.vue'
import type H0ToolbarItemComponent from './H0ToolbarItem.vue'
import type { H0Orientation } from '../../types'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0ToolbarItemDefinition = { value: string | number; label: string; disabled?: boolean; pressed?: boolean }
export type H0ToolbarProps = H0PublicProps<typeof H0ToolbarComponent>
export type H0ToolbarEmits = H0PublicEmits<typeof H0ToolbarComponent>
export type H0ToolbarGroupProps = H0PublicProps<typeof H0ToolbarGroupComponent>
export type H0ToolbarItemProps = H0PublicProps<typeof H0ToolbarItemComponent>
export type H0ToolbarOrientation = H0Orientation
