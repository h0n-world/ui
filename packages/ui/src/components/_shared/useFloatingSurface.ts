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
}

export function useFloatingSurface(options: H0FloatingSurfaceOptions) {
    const floatingStyles = ref<Record<string, string>>({})
    const arrowStyles = ref<Record<string, string>>({})
    const resolvedPlacement = ref<H0FloatingPlacement>(toValue(options.placement) ?? 'bottom-start')
    let cleanup: (() => void) | undefined

    async function update() {
        const reference = options.reference.value
        const floating = options.floating.value
        if (!reference || !floating) return
        const padding = toValue(options.collisionPadding) ?? 8
        const middleware = [
            offset(toValue(options.offset) ?? 6),
            flip({ padding }),
            shift({ padding }),
            size({ padding, apply({ rects, elements, availableHeight }) { Object.assign(elements.floating.style, { maxHeight: `${Math.max(0, availableHeight)}px`, ...(toValue(options.matchWidth) ? { width: `${rects.reference.width}px` } : {}) }) } })
        ]
        if (options.arrow?.value) middleware.push(arrow({ element: options.arrow.value, padding: 4 }))
        const result = await computePosition(reference, floating, { placement: toValue(options.placement) ?? 'bottom-start', strategy: toValue(options.strategy) ?? 'fixed', middleware })
        resolvedPlacement.value = result.placement as H0FloatingPlacement
        floatingStyles.value = { left: `${result.x}px`, top: `${result.y}px`, position: result.strategy }
        const arrowData = result.middlewareData.arrow
        if (arrowData) arrowStyles.value = { left: arrowData.x == null ? '' : `${arrowData.x}px`, top: arrowData.y == null ? '' : `${arrowData.y}px` }
    }

    function stop() {
        cleanup?.()
        cleanup = undefined
    }

    watch(
        () => Boolean(toValue(options.open)),
        async (open) => {
            stop()
            if (!open) return
            await nextTick()
            if (options.reference.value && options.floating.value) cleanup = autoUpdate(options.reference.value, options.floating.value, update)
        },
        { immediate: true }
    )
    onBeforeUnmount(stop)
    return { arrowStyles, floatingStyles, placement: resolvedPlacement, stop, update }
}
