import { arrow, autoUpdate, computePosition, flip, offset, shift, size, type VirtualElement } from '@floating-ui/dom'
import { nextTick, onBeforeUnmount, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'
import type { H0FloatingPlacement } from '../../types'

export type H0FloatingSurfaceOptions = {
    open: MaybeRefOrGetter<boolean>
    reference: Ref<HTMLElement | VirtualElement | null>
    floating: Ref<HTMLElement | null>
    arrow?: Ref<HTMLElement | null>
    placement?: MaybeRefOrGetter<H0FloatingPlacement | undefined>
    strategy?: MaybeRefOrGetter<'absolute' | 'fixed' | undefined>
    offset?: MaybeRefOrGetter<number | undefined>
    collisionPadding?: MaybeRefOrGetter<number | undefined>
    matchWidth?: MaybeRefOrGetter<boolean | undefined>
    availableHeightProperty?: string
}

export function useFloatingSurface(options: H0FloatingSurfaceOptions) {
    const floatingStyles = ref<Record<string, string>>({})
    const arrowStyles = ref<Record<string, string>>({})
    const resolvedPlacement = ref<H0FloatingPlacement>(toValue(options.placement) ?? 'bottom-start')
    let cleanup: (() => void) | undefined
    let disposed = false
    let lifecycle = 0
    let calculation = 0

    async function update() {
        const reference = options.reference.value
        const floating = options.floating.value
        if (disposed || !toValue(options.open) || !reference || !floating) return
        const currentLifecycle = lifecycle
        const currentCalculation = ++calculation
        const isCurrent = () => !disposed && Boolean(toValue(options.open)) && lifecycle === currentLifecycle && calculation === currentCalculation && options.reference.value === reference && options.floating.value === floating
        const padding = toValue(options.collisionPadding) ?? 8
        const middleware = [
            offset(toValue(options.offset) ?? 6),
            flip({ padding }),
            shift({ padding }),
            size({ padding, apply({ rects, elements, availableHeight }) {
                if (!isCurrent()) return
                if (options.availableHeightProperty) elements.floating.style.setProperty(options.availableHeightProperty, `${Math.max(0, availableHeight)}px`)
                else elements.floating.style.maxHeight = `${Math.max(0, availableHeight)}px`
                if (toValue(options.matchWidth)) elements.floating.style.width = `${rects.reference.width}px`
            } })
        ]
        if (options.arrow?.value) middleware.push(arrow({ element: options.arrow.value, padding: 4 }))
        const result = await computePosition(reference, floating, { placement: toValue(options.placement) ?? 'bottom-start', strategy: toValue(options.strategy) ?? 'fixed', middleware })
        if (!isCurrent()) return
        resolvedPlacement.value = result.placement as H0FloatingPlacement
        floatingStyles.value = { left: `${result.x}px`, top: `${result.y}px`, position: result.strategy }
        const arrowData = result.middlewareData.arrow
        arrowStyles.value = arrowData ? { left: arrowData.x == null ? '' : `${arrowData.x}px`, top: arrowData.y == null ? '' : `${arrowData.y}px` } : {}
    }

    function stop() {
        lifecycle += 1
        cleanup?.()
        cleanup = undefined
    }

    watch(
        () => ({ open: Boolean(toValue(options.open)), reference: options.reference.value, floating: options.floating.value, arrow: options.arrow?.value, placement: toValue(options.placement), strategy: toValue(options.strategy), offset: toValue(options.offset), collisionPadding: toValue(options.collisionPadding), matchWidth: toValue(options.matchWidth) }),
        async ({ open }) => {
            stop()
            const currentLifecycle = lifecycle
            if (!open) return
            await nextTick()
            if (disposed || lifecycle !== currentLifecycle || !toValue(options.open)) return
            if (options.reference.value && options.floating.value) cleanup = autoUpdate(options.reference.value, options.floating.value, update)
        },
        { immediate: true }
    )
    onBeforeUnmount(() => { disposed = true; stop() })
    return { arrowStyles, floatingStyles, placement: resolvedPlacement, stop, update }
}
