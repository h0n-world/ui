<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import H0Toast from './H0Toast.vue'
import { useH0Toast } from './toast'
import type { H0ToastItem, H0ToastService } from './Toast.types'

defineOptions({
    name: 'H0Toasts'
})

const props = withDefaults(
    defineProps<{
        maxVisible?: number
        service?: H0ToastService
    }>(),
    {
        maxVisible: 4
    }
)

const toastService = props.service ?? useH0Toast()
const visibleToasts = computed(() => toastService.state.toasts.slice(-props.maxVisible).reverse())
const placement = computed(() => toastService.state.placement)
const placementClasses = computed(() => [`h-toasts--${placement.value}`])

function getToastStyle(index: number): CSSProperties {
    const offset = placement.value.startsWith('bottom') ? index * -12 : index * 12

    return {
        zIndex: props.maxVisible - index,
        '--h-toast-stack-opacity': Math.max(1 - index * 0.14, 0.5),
        '--h-toast-stack-transform': `translate3d(0, ${offset}px, 0) scale(${Math.max(1 - index * 0.035, 0.88)})`
    }
}

function dismissToast(toast: H0ToastItem) {
    toastService.dismiss(toast.id)
}

function handleToastClick(toast: H0ToastItem) {
    if (toast.closeMode === 'toast' || toast.closeMode === 'container') {
        dismissToast(toast)
    }
}
</script>

<template>
    <Teleport to="body">
        <div data-h0n-component="toasts" class="h-toasts" :class="placementClasses" :aria-hidden="visibleToasts.length ? undefined : 'true'" aria-live="polite" aria-atomic="false">
            <TransitionGroup name="h-toasts-list" tag="div" class="h-toasts__stack">
                <div v-for="(toast, index) in visibleToasts" :key="toast.id" class="h-toasts__item" :style="getToastStyle(index)">
                    <H0Toast
                        class="h-toasts__toast"
                        :tone="toast.tone"
                        :title="toast.title"
                        :description="toast.description"
                        :icon="toast.icon"
                        :closable="toast.closeMode !== 'container'"
                        @click="handleToastClick(toast)"
                        @close="dismissToast(toast)"
                    />
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
@use '../../styles/breakpoints' as bp;
.h-toasts {
    --h-toasts-enter-duration: calc(var(--h0n-ui-duration-normal) + var(--h0n-ui-duration-fast));
    --h-toasts-stack-duration: var(--h0n-ui-duration-slow);
    --h-toasts-leave-duration: var(--h0n-ui-duration-slow);
    --h-toasts-enter-offset: 22px;
    --h-toasts-leave-offset: 14px;
    --h-toasts-motion-easing: cubic-bezier(0.16, 1, 0.3, 1);

    box-sizing: border-box;
    display: flex;
    max-width: 100%;
    padding: 24px;
    pointer-events: none;
    position: fixed;
    z-index: var(--h0n-ui-layer-toast);

    &--top-start,
    &--top,
    &--top-end {
        --h-toasts-enter-offset: -22px;
        --h-toasts-leave-offset: -14px;

        top: 0;
    }

    &--bottom-start,
    &--bottom,
    &--bottom-end {
        bottom: 0;
    }

    &--top-start,
    &--bottom-start {
        left: 0;
        justify-content: flex-start;
    }

    &--top,
    &--bottom {
        left: 50%;
        justify-content: center;
        transform: translateX(-50%);
    }

    &--top-end,
    &--bottom-end {
        right: 0;
        justify-content: flex-end;
    }
}

.h-toasts__stack {
    display: grid;
    justify-items: stretch;
    pointer-events: none;
    position: relative;
    width: min(420px, calc(100vw - 48px));
}

.h-toasts__item {
    backface-visibility: hidden;
    grid-area: 1 / 1;
    pointer-events: auto;
    transform-origin: center bottom;
}

.h-toasts__toast {
    opacity: var(--h-toast-stack-opacity);
    transform: var(--h-toast-stack-transform);
    transition:
        opacity var(--h-toasts-stack-duration) ease,
        transform var(--h-toasts-stack-duration) var(--h-toasts-motion-easing);
}

.h-toasts--top-start .h-toasts__item,
.h-toasts--top .h-toasts__item,
.h-toasts--top-end .h-toasts__item {
    transform-origin: center top;
}

.h-toasts-list-enter-active {
    transition:
        opacity var(--h-toasts-enter-duration) ease,
        transform var(--h-toasts-enter-duration) var(--h-toasts-motion-easing);
    will-change: opacity, transform;
}

.h-toasts-list-leave-active {
    pointer-events: none;
    transition:
        opacity var(--h-toasts-leave-duration) ease,
        transform var(--h-toasts-leave-duration) cubic-bezier(0.4, 0, 1, 1);
    will-change: opacity, transform;
}

.h-toasts-list-enter-from {
    opacity: 0;
    transform: translate3d(0, var(--h-toasts-enter-offset), 0) scale(0.96);
}

.h-toasts-list-leave-to {
    opacity: 0;
    transform: translate3d(0, var(--h-toasts-leave-offset), 0) scale(0.97);
}

@include bp.h0n-at-most(bp.$h0n-breakpoint-sm) {
    .h-toasts {
        padding: 16px;
    }

    .h-toasts--top,
    .h-toasts--bottom {
        left: 0;
        right: 0;
        transform: none;
    }

    .h-toasts__stack {
        width: calc(100vw - 32px);
    }
}
</style>
