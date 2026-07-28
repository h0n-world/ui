import { computed } from 'vue'
import { useH0MediaQuery } from './useH0MediaQuery'

export const h0Breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const
export type H0Breakpoint = keyof typeof h0Breakpoints

export function useH0Breakpoint(breakpoint: H0Breakpoint, direction: 'min' | 'max' = 'min') {
    const width = direction === 'max' ? h0Breakpoints[breakpoint] - 0.02 : h0Breakpoints[breakpoint]
    const matches = useH0MediaQuery(`(${direction}-width: ${width}px)`)

    return computed(() => matches.value)
}
