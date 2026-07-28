<script setup lang="ts">
import { computed } from 'vue'
import type { H0SheetBackdrop, H0SheetSide } from './Sheet.types'
import H0OverlayRoot from '../_shared/H0OverlayRoot.vue'
import { useH0OverlayModel } from '../_shared/useOverlayModel'
import { useH0Locale } from '../../locale'

defineOptions({
    name: 'H0Sheet'
})

const props = withDefaults(
    defineProps<{
        modelValue?: boolean
        defaultValue?: boolean
        side?: H0SheetSide
        backdrop?: H0SheetBackdrop
        closeOnBackdrop?: boolean
        closeOnEsc?: boolean
        ariaLabel?: string
        teleportTo?: string | HTMLElement
        teleportDisabled?: boolean
        initialFocus?: string | HTMLElement
        returnFocus?: boolean | HTMLElement
        lockScroll?: boolean
    }>(),
    {
        modelValue: undefined,
        side: 'bottom',
        backdrop: 'opaque',
        closeOnBackdrop: true,
        closeOnEsc: true,
        defaultValue: false,
        teleportTo: 'body',
        teleportDisabled: false,
        returnFocus: true,
        lockScroll: true,
        ariaLabel: ''
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    change: [value: boolean]
    close: []
}>()

const sheetClasses = computed(() => [`h-sheet--${props.side}`])
const { locale } = useH0Locale()
const { close, currentValue } = useH0OverlayModel(props, emit)

</script>

<template>
    <H0OverlayRoot :model-value="currentValue" :backdrop="backdrop" :close-on-backdrop="closeOnBackdrop" :close-on-esc="closeOnEsc" :teleport-to="teleportTo" :teleport-disabled="teleportDisabled" :initial-focus="initialFocus" :return-focus="returnFocus" :lock-scroll="lockScroll" @request-close="close">
        <template #default="{ panelRef }">
            <div data-h0n-component="sheet" class="h-sheet" :class="sheetClasses">
                <section :ref="panelRef" class="h-sheet__panel" role="dialog" aria-modal="true" :aria-label="ariaLabel || locale.overlay.sheet" tabindex="-1">
                    <div class="h-sheet__handle" aria-hidden="true" />
                    <slot />
                </section>
            </div>
        </template>
    </H0OverlayRoot>
</template>

<style scoped lang="scss">
.h-sheet {
    inset: 0;
    pointer-events: none;
    position: absolute;
}

.h-sheet__panel {
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xxl);
    box-shadow: var(--h0n-ui-shadow);
    color: var(--h0n-ui-color-text);
    max-width: calc(100vw - 32px);
    overflow: auto;
    padding: 15px;
    pointer-events: auto;
    position: absolute;
}

.h-sheet__handle {
    background: var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-round);
    height: 4px;
    opacity: 0.6;
    position: absolute;
    width: 32px;
}

.h-sheet--bottom .h-sheet__panel {
    bottom: 16px;
    left: 50%;
    min-height: 148px;
    max-height: 90dvh;
    transform: translateX(-50%);
    width: min(520px, calc(100vw - 32px));
}

.h-sheet--bottom .h-sheet__handle {
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
}

.h-sheet--top .h-sheet__panel {
    left: 50%;
    min-height: 148px;
    top: 16px;
    transform: translateX(-50%);
    width: min(520px, calc(100vw - 32px));
}

.h-sheet--top .h-sheet__handle {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}

.h-sheet--left .h-sheet__panel,
.h-sheet--right .h-sheet__panel {
    height: calc(100dvh - 32px);
    top: 16px;
    width: min(330px, calc(100vw - 32px));
}

.h-sheet--left .h-sheet__panel {
    left: 16px;
}

.h-sheet--right .h-sheet__panel {
    right: 16px;
}

.h-sheet--left .h-sheet__handle,
.h-sheet--right .h-sheet__handle {
    height: 40px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
}

.h-sheet--left .h-sheet__handle {
    right: 10px;
}

.h-sheet--right .h-sheet__handle {
    left: 10px;
}

:global(.h-overlay-enter-active .h-sheet__panel),
:global(.h-overlay-leave-active .h-sheet__panel) {
    transition-duration: var(--h0n-ui-duration-fast);
}

:global(.h-overlay-enter-active .h-sheet__panel),
:global(.h-overlay-leave-active .h-sheet__panel) {
    transition:
        opacity var(--h0n-ui-duration-fast) ease,
        transform var(--h0n-ui-duration-fast) ease;
}

:global(.h-overlay-enter-from .h-sheet--bottom .h-sheet__panel),
:global(.h-overlay-leave-to .h-sheet--bottom .h-sheet__panel) {
    opacity: 0;
    transform: translate(-50%, 24px);
}

:global(.h-overlay-enter-from .h-sheet--top .h-sheet__panel),
:global(.h-overlay-leave-to .h-sheet--top .h-sheet__panel) {
    opacity: 0;
    transform: translate(-50%, -24px);
}

:global(.h-overlay-enter-from .h-sheet--left .h-sheet__panel),
:global(.h-overlay-leave-to .h-sheet--left .h-sheet__panel) {
    opacity: 0;
    transform: translateX(-24px);
}

:global(.h-overlay-enter-from .h-sheet--right .h-sheet__panel),
:global(.h-overlay-leave-to .h-sheet--right .h-sheet__panel) {
    opacity: 0;
    transform: translateX(24px);
}

:global([data-h0n-animation='high'] .h-overlay-enter-from .h-sheet--bottom .h-sheet__panel),
:global([data-h0n-animation='high'] .h-overlay-leave-to .h-sheet--bottom .h-sheet__panel) {
    transform: translate(-50%, calc(100% + 24px));
}

:global([data-h0n-animation='high'] .h-overlay-enter-from .h-sheet--top .h-sheet__panel),
:global([data-h0n-animation='high'] .h-overlay-leave-to .h-sheet--top .h-sheet__panel) {
    transform: translate(-50%, calc(-100% - 24px));
}

:global([data-h0n-animation='high'] .h-overlay-enter-from .h-sheet--left .h-sheet__panel),
:global([data-h0n-animation='high'] .h-overlay-leave-to .h-sheet--left .h-sheet__panel) {
    transform: translateX(calc(-100% - 24px));
}

:global([data-h0n-animation='high'] .h-overlay-enter-from .h-sheet--right .h-sheet__panel),
:global([data-h0n-animation='high'] .h-overlay-leave-to .h-sheet--right .h-sheet__panel) {
    transform: translateX(calc(100% + 24px));
}

:global([data-h0n-animation='high'] .h-overlay-enter-active .h-sheet__panel),
:global([data-h0n-animation='high'] .h-overlay-leave-active .h-sheet__panel) {
    transition-duration: var(--h0n-ui-duration-slow);
}

:global([data-h0n-animation='high'] .h-overlay-enter-active .h-sheet__panel),
:global([data-h0n-animation='high'] .h-overlay-leave-active .h-sheet__panel) {
    transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
}
</style>
