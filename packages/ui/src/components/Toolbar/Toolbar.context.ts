import type { ComputedRef, InjectionKey } from 'vue'
import type { H0Orientation, H0Size } from '../../types'

export type H0ToolbarContext = {
    fullWidth: ComputedRef<boolean>
    orientation: ComputedRef<H0Orientation>
    size: ComputedRef<H0Size>
}

export const h0ToolbarContextKey: InjectionKey<H0ToolbarContext> = Symbol('h0-toolbar-context')
