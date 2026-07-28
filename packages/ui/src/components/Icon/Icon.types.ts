export type H0IconPathNode = readonly ['path', { readonly d: string }]
export type H0IconCircleNode = readonly ['circle', { readonly cx: number; readonly cy: number; readonly r: number }]
export type H0IconLineNode = readonly ['line', { readonly x1: number; readonly y1: number; readonly x2: number; readonly y2: number }]
export type H0IconPolylineNode = readonly ['polyline', { readonly points: string }]

export type H0IconNode = H0IconPathNode | H0IconCircleNode | H0IconLineNode | H0IconPolylineNode

export interface H0IconDefinition {
    readonly name: string
    readonly nodes: readonly H0IconNode[]
    readonly viewBox?: string
}

export type H0IconStrokeLinecap = 'butt' | 'round' | 'square'
export type H0IconStrokeLinejoin = 'bevel' | 'miter' | 'round'
import type H0IconComponent from './H0Icon.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0IconProps = H0PublicProps<typeof H0IconComponent>
