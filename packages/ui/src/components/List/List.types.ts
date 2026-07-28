import type { Component } from 'vue'
import type { H0CssSize, H0Size } from '../../types'

export type H0ListGap = 'none' | 'sm' | 'md'

export type H0ListItemSize = H0Size

export type H0ListItemBorderRadius = H0CssSize

export type H0ListItemElement = string | Component
import type H0ListComponent from './H0List.vue'
import type H0ListItemComponent from './H0ListItem.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0ListProps = H0PublicProps<typeof H0ListComponent>
export type H0ListItemProps = H0PublicProps<typeof H0ListItemComponent>
