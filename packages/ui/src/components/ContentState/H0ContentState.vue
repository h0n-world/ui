<script setup lang="ts">
import type { H0ContentStateValue } from './ContentState.types'

defineOptions({
    name: 'H0ContentState'
})

defineProps<{
    state: H0ContentStateValue
}>()

defineSlots<{
    loading(): unknown
    error(): unknown
    empty(): unknown
    content(): unknown
    default(): unknown
}>()
</script>

<template>
    <div data-h0n-component="content-state" class="h-content-state" :data-state="state" :aria-busy="state === 'loading'">
        <Transition name="h-content-state">
            <div :key="state" class="h-content-state__view" :data-state="state">
                <slot :name="state">
                    <slot v-if="state === 'content'" />
                </slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.h-content-state {
    min-width: 0;
    position: relative;
    width: 100%;
}

.h-content-state__view {
    min-width: 0;
    width: 100%;
}

.h-content-state-enter-active,
.h-content-state-leave-active {
    transition:
        opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
        transform var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
}

.h-content-state-leave-active {
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
}

.h-content-state-enter-from {
    opacity: 0;
    transform: translateY(4px);
}

.h-content-state-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
    .h-content-state-enter-from,
    .h-content-state-leave-to {
        transform: none;
    }
}
</style>
