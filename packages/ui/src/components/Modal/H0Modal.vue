<script setup lang="ts">
import { closeIcon } from '../../icons'
import { computed } from 'vue'
import H0Button from '../Button/H0Button.vue'
import H0Typography from '../Typography/H0Typography.vue'
import H0OverlayRoot from '../_shared/H0OverlayRoot.vue'
import type { H0ModalBackdrop, H0ModalSide } from './Modal.types'
import { useH0OverlayModel } from '../_shared/useOverlayModel'
import { useH0Locale } from '../../locale'

defineOptions({
    name: 'H0Modal'
})

const props = withDefaults(
    defineProps<{
        modelValue?: boolean
        defaultValue?: boolean
        side?: H0ModalSide
        backdrop?: H0ModalBackdrop
        title?: string
        closeOnBackdrop?: boolean
        closeOnEsc?: boolean
        ariaLabel?: string
        closeAriaLabel?: string
        teleportTo?: string | HTMLElement
        teleportDisabled?: boolean
        initialFocus?: string | HTMLElement
        returnFocus?: boolean | HTMLElement
        lockScroll?: boolean
    }>(),
    {
        modelValue: undefined,
        side: 'center',
        backdrop: 'opaque',
        title: '',
        closeOnBackdrop: true,
        closeOnEsc: true,
        defaultValue: false,
        teleportTo: 'body',
        teleportDisabled: false,
        returnFocus: true,
        lockScroll: true,
        ariaLabel: '',
        closeAriaLabel: ''
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    change: [value: boolean]
    close: []
}>()

const modalClasses = computed(() => [`h-modal--${props.side}`])
const { locale } = useH0Locale()
const { close, currentValue } = useH0OverlayModel(props, emit)

</script>

<template>
    <H0OverlayRoot :model-value="currentValue" :backdrop="backdrop" :close-on-backdrop="closeOnBackdrop" :close-on-esc="closeOnEsc" :teleport-to="teleportTo" :teleport-disabled="teleportDisabled" :initial-focus="initialFocus" :return-focus="returnFocus" :lock-scroll="lockScroll" @request-close="close">
        <template #default="{ panelRef }">
            <div data-h0n-component="modal" class="h-modal" :class="modalClasses">
                <section :ref="panelRef" class="h-modal__panel" role="dialog" aria-modal="true" :aria-label="title || ariaLabel || locale.overlay.modal" tabindex="-1">
                    <header v-if="title || $slots.header" class="h-modal__header">
                        <slot name="header">
                            <H0Typography as="h2" variant="h5">{{ title }}</H0Typography>
                        </slot>
                        <H0Button size="sm" variant="soft" :icon="closeIcon" button-type="onlyIcon" :aria-label="closeAriaLabel || locale.overlay.closeModal" @click="close" />
                    </header>
                    <div class="h-modal__content">
                        <slot />
                    </div>
                    <footer v-if="$slots.footer" class="h-modal__footer">
                        <slot name="footer" :close="close" />
                    </footer>
                </section>
            </div>
        </template>
    </H0OverlayRoot>
</template>

<style scoped lang="scss">
.h-modal {
    inset: 0;
    pointer-events: none;
    position: absolute;
}

.h-modal__panel {
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xl);
    box-shadow: var(--h0n-ui-shadow);
    color: var(--h0n-ui-color-text);
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    max-height: calc(100dvh - 32px);
    overflow: hidden;
    pointer-events: auto;
    position: absolute;
    width: min(520px, calc(100vw - 32px));
}

.h-modal--center {
    display: grid;
    place-items: center;
}

.h-modal--center .h-modal__panel {
    position: relative;
}

.h-modal--right .h-modal__panel {
    border-radius: var(--h0n-ui-radius-xxl) 0 0 var(--h0n-ui-radius-xxl);
    bottom: 0;
    height: 100%;
    max-height: 100dvh;
    max-width: calc(100vw - 24px);
    right: 0;
    top: 0;
    width: min(520px, calc(100vw - 24px));
}

.h-modal--left .h-modal__panel {
    border-radius: 0 var(--h0n-ui-radius-xxl) var(--h0n-ui-radius-xxl) 0;
    bottom: 0;
    height: 100%;
    left: 0;
    max-height: 100dvh;
    max-width: calc(100vw - 24px);
    top: 0;
    width: min(520px, calc(100vw - 24px));
}

.h-modal--top .h-modal__panel,
.h-modal--bottom .h-modal__panel {
    height: auto;
    left: 0;
    max-height: min(560px, calc(100dvh - 24px));
    max-width: 100vw;
    right: 0;
    width: 100%;
}

.h-modal--top .h-modal__panel {
    border-radius: 0 0 var(--h0n-ui-radius-xxl) var(--h0n-ui-radius-xxl);
    top: 0;
}

.h-modal--bottom .h-modal__panel {
    border-radius: var(--h0n-ui-radius-xxl) var(--h0n-ui-radius-xxl) 0 0;
    bottom: 0;
}

.h-modal__header,
.h-modal__footer {
    align-items: center;
    display: flex;
    gap: 12px;
    justify-content: space-between;
    padding: 10px 15px;
}


.h-modal__content {
    overflow: auto;
    padding: 0 16px 16px 16px;
}

.h-modal__footer {
    justify-content: flex-end;
}

:global(.h-overlay-enter-active .h-modal__panel),
:global(.h-overlay-leave-active .h-modal__panel) {
    transition:
        opacity var(--h0n-ui-duration-normal) ease,
        transform var(--h0n-ui-duration-normal) ease;
}

:global(.h-overlay-enter-from .h-modal__panel),
:global(.h-overlay-leave-to .h-modal__panel) {
    opacity: 0;
}

:global(.h-overlay-enter-from .h-modal--center .h-modal__panel),
:global(.h-overlay-leave-to .h-modal--center .h-modal__panel) {
    transform: translateY(12px) scale(0.98);
}

:global(.h-overlay-enter-from .h-modal--right .h-modal__panel),
:global(.h-overlay-leave-to .h-modal--right .h-modal__panel) {
    transform: translateX(100%);
}

:global(.h-overlay-enter-from .h-modal--left .h-modal__panel),
:global(.h-overlay-leave-to .h-modal--left .h-modal__panel) {
    transform: translateX(-100%);
}

:global(.h-overlay-enter-from .h-modal--top .h-modal__panel),
:global(.h-overlay-leave-to .h-modal--top .h-modal__panel) {
    transform: translateY(-100%);
}

:global(.h-overlay-enter-from .h-modal--bottom .h-modal__panel),
:global(.h-overlay-leave-to .h-modal--bottom .h-modal__panel) {
    transform: translateY(100%);
}
</style>
