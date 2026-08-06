<script setup lang="ts">
import { computed, inject, provide, ref, shallowRef, toRef, watch, type ComponentPublicInstance } from 'vue'
import { useOverlay } from './useOverlay'
import type { H0OverlayBackdrop, H0OverlayLayer } from './Overlay.types'
import { h0OverlayContextKey, toH0OverlayZIndex } from './Overlay.context'

defineOptions({
    name: 'H0OverlayRoot'
})

const props = withDefaults(
    defineProps<{
        modelValue: boolean
        backdrop?: H0OverlayBackdrop
        layer?: H0OverlayLayer
        closeOnBackdrop?: boolean
        closeOnEsc?: boolean
        lockClass?: string
        teleportTo?: string | HTMLElement
        teleportDisabled?: boolean
        initialFocus?: string | HTMLElement
        returnFocus?: boolean | HTMLElement
        lockScroll?: boolean
    }>(),
    {
        backdrop: 'opaque',
        layer: 'overlay',
        closeOnBackdrop: true,
        closeOnEsc: true,
        lockClass: 'h-overlay-lock-scroll',
        teleportTo: 'body',
        teleportDisabled: false,
        returnFocus: true,
        lockScroll: true
    }
)

const emit = defineEmits<{
    requestClose: []
}>()

const parentOverlay = inject(h0OverlayContextKey, null)
const resolvedLayer = computed<H0OverlayLayer>(() => (props.layer === 'critical' || parentOverlay?.layer.value === 'critical' ? 'critical' : 'overlay'))
const layerOffset = computed(() => {
    if (!parentOverlay || parentOverlay.layer.value !== resolvedLayer.value) {
        return 0
    }

    return parentOverlay.offset.value + 3
})
const overlayStyle = computed(() => ({ zIndex: toH0OverlayZIndex(resolvedLayer.value, layerOffset.value) }))
const scrollLockActive = ref(props.modelValue)
const shouldLockDocumentScroll = computed(() => scrollLockActive.value && props.lockScroll)

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) scrollLockActive.value = true
    }
)

provide(h0OverlayContextKey, {
    layer: resolvedLayer,
    offset: layerOffset
})

const panel = shallowRef<HTMLElement | null>(null)

function setPanelRef(element: Element | ComponentPublicInstance | null) {
    const resolvedElement = element && '$el' in element ? element.$el : element

    panel.value = resolvedElement instanceof HTMLElement ? resolvedElement : null
}

function handleBackdropPointerDown() {
    if (props.closeOnBackdrop) {
        emit('requestClose')
    }
}

function finishOverlayLeave() {
    scrollLockActive.value = false
}

useOverlay({
    isOpen: toRef(props, 'modelValue'),
    closeOnEsc: toRef(props, 'closeOnEsc'),
    lockClass: props.lockClass,
    scrollLockActive: shouldLockDocumentScroll,
    initialFocus: toRef(props, 'initialFocus'),
    returnFocus: toRef(props, 'returnFocus'),
    onClose: () => emit('requestClose'),
    panel
})
</script>

<template>
    <Teleport :to="teleportTo" :disabled="teleportDisabled">
        <Transition name="h-overlay" @after-leave="finishOverlayLeave">
            <div v-if="modelValue" data-h0n-component="overlay-root" class="h-overlay" :class="[`h-overlay--backdrop-${backdrop}`, `h-overlay--layer-${resolvedLayer}`]" :style="overlayStyle">
                <div class="h-overlay__backdrop" aria-hidden="true" @pointerdown.self="handleBackdropPointerDown" />
                <slot :panel-ref="setPanelRef" />
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss">
.h-overlay-lock-scroll {
    overflow: hidden;
}
</style>

<style scoped lang="scss">
.h-overlay {
    inset: 0;
    position: fixed;
}

.h-overlay--layer-overlay {
    z-index: var(--h0n-ui-layer-overlay);
}

.h-overlay--layer-critical {
    z-index: var(--h0n-ui-layer-critical);
}

.h-overlay__backdrop {
    inset: 0;
    opacity: 1;
    pointer-events: auto;
    position: absolute;
    transition:
        opacity var(--h0n-ui-duration-normal) ease,
        background-color var(--h0n-ui-duration-normal) ease,
        backdrop-filter var(--h0n-ui-duration-normal) ease,
        -webkit-backdrop-filter var(--h0n-ui-duration-normal) ease;
    will-change: opacity, backdrop-filter;
}

.h-overlay--backdrop-opaque .h-overlay__backdrop {
    background: var(--h0n-ui-color-backdrop);
}

.h-overlay--backdrop-blur .h-overlay__backdrop {
    background: var(--h0n-ui-color-backdrop-soft);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.h-overlay--backdrop-transparent .h-overlay__backdrop {
    background: transparent;
}

.h-overlay-enter-active,
.h-overlay-leave-active {
    transition: opacity var(--h0n-ui-duration-normal) ease;
}

.h-overlay-enter-from .h-overlay__backdrop,
.h-overlay-leave-to .h-overlay__backdrop {
    opacity: 0;
}

.h-overlay--backdrop-blur.h-overlay-enter-from .h-overlay__backdrop,
.h-overlay--backdrop-blur.h-overlay-leave-to .h-overlay__backdrop {
    background: transparent;
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
}

.h-overlay--backdrop-opaque.h-overlay-enter-from .h-overlay__backdrop,
.h-overlay--backdrop-opaque.h-overlay-leave-to .h-overlay__backdrop {
    background: transparent;
}

[data-h0n-animation='high'] .h-overlay__backdrop,
[data-h0n-animation='high'] .h-overlay-enter-active,
[data-h0n-animation='high'] .h-overlay-leave-active {
    transition-duration: var(--h0n-ui-duration-slow);
}
</style>
