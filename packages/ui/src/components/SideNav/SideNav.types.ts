import type { Component } from 'vue'
import type H0SideNavComponent from './H0SideNav.vue'
import type H0SideNavGroupComponent from './H0SideNavGroup.vue'
import type H0SideNavItemComponent from './H0SideNavItem.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0SideNavGap = 'sm' | 'md' | 'lg'

export type H0SideNavItemElement = string | Component

export type H0SideNavProps = H0PublicProps<typeof H0SideNavComponent>
export type H0SideNavGroupProps = H0PublicProps<typeof H0SideNavGroupComponent>
export type H0SideNavItemProps = H0PublicProps<typeof H0SideNavItemComponent>
