import type { ComputedRef, InjectionKey } from 'vue'
import type { H0OverlayLayer } from './Overlay.types'

export type H0OverlayContext = {
    layer: ComputedRef<H0OverlayLayer>
    offset: ComputedRef<number>
}

export const h0OverlayContextKey: InjectionKey<H0OverlayContext> = Symbol('h0-overlay-context')

export function toH0OverlayZIndex(layer: H0OverlayLayer, offset = 0) {
    const token = `var(--h0n-ui-layer-${layer})`

    if (offset === 0) {
        return token
    }

    return `calc(${token} ${offset > 0 ? '+' : '-'} ${Math.abs(offset)})`
}
