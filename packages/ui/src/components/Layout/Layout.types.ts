import type { Component } from 'vue'
import type { H0Orientation, H0ResponsiveValue, H0Space } from '../../types'

export type H0LayoutDisplay = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'none'
export type H0LayoutWidth = 'auto' | 'full' | 'fit' | 'min' | 'max'
export type H0LayoutAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type H0LayoutJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type H0ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type H0StackProps = { as?: string | Component; gap?: H0ResponsiveValue<H0Space>; align?: H0ResponsiveValue<H0LayoutAlign>; justify?: H0ResponsiveValue<H0LayoutJustify>; wrap?: H0ResponsiveValue<boolean> }
export type H0InlineProps = H0StackProps
export type H0ContainerProps = { as?: string | Component; size?: H0ContainerSize; gutter?: H0ResponsiveValue<H0Space>; centered?: boolean }
export type H0DividerProps = { orientation?: H0Orientation; inset?: H0ResponsiveValue<H0Space>; decorative?: boolean }
export type H0SpacerProps = { axis?: H0Orientation; size?: H0ResponsiveValue<H0Space> }
