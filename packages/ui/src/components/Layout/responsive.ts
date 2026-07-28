import type { CSSProperties } from 'vue'
import type { H0ResponsiveValue, H0Space } from '../../types'

const breakpoints = ['base', 'xs', 'sm', 'md', 'lg', 'xl'] as const
const spacing: Record<H0Space, string> = { none: '0px', xxs: 'var(--h0n-ui-spacing-xxs)', xs: 'var(--h0n-ui-spacing-xs)', sm: 'var(--h0n-ui-spacing-sm)', md: 'var(--h0n-ui-spacing-md)', lg: 'var(--h0n-ui-spacing-lg)', xl: 'var(--h0n-ui-spacing-xl)', '2xl': 'var(--h0n-ui-spacing-2xl)', '3xl': 'var(--h0n-ui-spacing-3xl)', '4xl': 'var(--h0n-ui-spacing-4xl)', '5xl': 'var(--h0n-ui-spacing-5xl)' }
const widths = { auto: 'auto', full: '100%', fit: 'fit-content', min: 'min-content', max: 'max-content' }
const alignment = { start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch', baseline: 'baseline' }
const justify = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around', evenly: 'space-evenly' }

export function responsiveStyles<T>(name: string, value: H0ResponsiveValue<T> | undefined, resolve: (value: T) => string = String): CSSProperties {
    if (value == null) return {}
    const values = typeof value === 'object' ? value : { base: value }
    return Object.fromEntries(breakpoints.flatMap((breakpoint) => breakpoint in values ? [[`--h-${name}-${breakpoint}`, resolve((values as Record<string, T>)[breakpoint])]] : [])) as CSSProperties
}

export const resolveSpace = (value: H0Space) => spacing[value]
export const resolveWidth = (value: keyof typeof widths) => widths[value]
export const resolveAlign = (value: keyof typeof alignment) => alignment[value]
export const resolveJustify = (value: keyof typeof justify) => justify[value]
export const resolveWrap = (value: boolean) => value ? 'wrap' : 'nowrap'
