<script setup lang="ts">
import successIcon from '@h0nio/icons/check-circle-stroke'
import errorIcon from '@h0nio/icons/danger-circle-stroke'
import warningIcon from '@h0nio/icons/danger-triangle-stroke'
import infoIcon from '@h0nio/icons/info-circle-stroke'
import { computed } from 'vue'
import { useH0Locale } from '../../locale'
import H0Button from '../Button/H0Button.vue'
import type { H0IconSource } from '../Icon'
import H0Icon from '../Icon/H0Icon.vue'
import H0Description from '../Typography/H0Description.vue'
import H0Typography from '../Typography/H0Typography.vue'
import H0OverlayContent from '../_shared/H0OverlayContent.vue'
import H0OverlayFooter from '../_shared/H0OverlayFooter.vue'
import H0OverlayHeader from '../_shared/H0OverlayHeader.vue'
import H0OverlayRoot from '../_shared/H0OverlayRoot.vue'
import { useH0OverlayModel } from '../_shared/useOverlayModel'
import type { H0AlertDialogBackdrop, H0AlertDialogTone } from './Alert.types'

defineOptions({
    name: 'H0AlertDialog'
})

const props = withDefaults(
    defineProps<{
        modelValue?: boolean
        defaultValue?: boolean
        tone?: H0AlertDialogTone
        backdrop?: H0AlertDialogBackdrop
        title?: string
        text?: string
        confirmText?: string
        cancelText?: string
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
        tone: 'info',
        backdrop: 'opaque',
        title: '',
        text: '',
        confirmText: '',
        cancelText: '',
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
    confirm: []
    cancel: []
    close: []
}>()
const { locale } = useH0Locale()

const resolvedIcon = computed<H0IconSource>(() => {
    if (props.tone === 'success') {
        return successIcon
    }

    if (props.tone === 'warning') {
        return warningIcon
    }

    if (props.tone === 'danger') {
        return errorIcon
    }

    return infoIcon
})

const dialogClasses = computed(() => [`h-alert-dialog--${props.tone}`])
const confirmTone = computed(() => (props.tone === 'danger' ? 'danger' : 'primary'))
const { close, currentValue } = useH0OverlayModel(props, emit)

function cancel() {
    emit('cancel')
    close()
}

function confirm() {
    emit('confirm')
    close()
}
</script>

<template>
    <H0OverlayRoot
        :model-value="currentValue"
        :backdrop="backdrop"
        :close-on-backdrop="false"
        :close-on-esc="closeOnEsc"
        :teleport-to="teleportTo"
        :teleport-disabled="teleportDisabled"
        :initial-focus="initialFocus"
        :return-focus="returnFocus"
        :lock-scroll="lockScroll"
        layer="critical"
        @request-close="close"
    >
        <template #default="{ panelRef }">
            <div data-h0n-component="alert-dialog" class="h-alert-dialog" :class="dialogClasses">
                <section :ref="panelRef" class="h-alert-dialog__panel" role="alertdialog" aria-modal="true" :aria-label="title || ariaLabel || locale.overlay.alertDialog" tabindex="-1">
                    <H0OverlayHeader :close-aria-label="closeAriaLabel || locale.overlay.closeAlertDialog" custom-content @close="close">
                        <div class="h-alert-dialog__heading">
                            <div class="h-alert-dialog__icon" aria-hidden="true">
                                <H0Icon :icon="resolvedIcon" :size="20" />
                            </div>
                            <H0Typography class="h-alert-dialog__title" variant="body" as="h2" :weight="600">
                                <slot name="title">{{ title || locale.overlay.confirmAction }}</slot>
                            </H0Typography>
                        </div>
                    </H0OverlayHeader>

                    <H0OverlayContent v-if="text || $slots.default">
                        <H0Description class="h-alert-dialog__text">
                            <slot>{{ text }}</slot>
                        </H0Description>
                    </H0OverlayContent>

                    <H0OverlayFooter :class="{ 'h-alert-dialog__footer--standalone': !(text || $slots.default) }">
                        <slot name="actions" :cancel="cancel" :confirm="confirm" :close="close">
                            <H0Button variant="soft" size="sm" @click="cancel">{{ cancelText || locale.overlay.cancel }}</H0Button>
                            <H0Button :tone="confirmTone" size="sm" @click="confirm">{{ confirmText || locale.overlay.confirm }}</H0Button>
                        </slot>
                    </H0OverlayFooter>
                </section>
            </div>
        </template>
    </H0OverlayRoot>
</template>

<style scoped lang="scss">
.h-alert-dialog {
    --h-alert-dialog-accent: var(--h0n-ui-color-primary);
    --h-alert-dialog-icon-bg: color-mix(in srgb, var(--h-alert-dialog-accent) 16%, transparent);

    display: grid;
    inset: 0;
    place-items: center;
    pointer-events: none;
    position: absolute;
}

.h-alert-dialog--success {
    --h-alert-dialog-accent: var(--h0n-ui-color-success);
}

.h-alert-dialog--warning {
    --h-alert-dialog-accent: var(--h0n-ui-color-warning);
}

.h-alert-dialog--danger,
.h-alert-dialog--error {
    --h-alert-dialog-accent: var(--h0n-ui-color-danger);
}

.h-alert-dialog__panel {
    --h-overlay-footer-gap: 8px;

    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xl);
    box-shadow: var(--h0n-ui-shadow-lg);
    color: var(--h0n-ui-color-text);
    display: flex;
    flex-direction: column;
    max-height: calc(100dvh - 32px);
    max-width: calc(100vw - 32px);
    min-width: 0;
    overflow: hidden;
    pointer-events: auto;
    position: relative;
    width: min(360px, calc(100vw - 32px));
}

.h-alert-dialog__heading {
    align-items: center;
    display: flex;
    gap: var(--h0n-ui-spacing-md);
    min-width: 0;
}

.h-alert-dialog__icon {
    align-items: center;
    background: var(--h-alert-dialog-icon-bg);
    border-radius: 50%;
    color: var(--h-alert-dialog-accent);
    display: inline-flex;
    height: 38px;
    justify-content: center;
    width: 38px;
}

.h-alert-dialog__title {
    color: var(--h0n-ui-color-text);
    line-height: 1.35;
    min-width: 0;
}

.h-alert-dialog__text {
    color: var(--h0n-ui-color-muted);
}

.h-alert-dialog__footer--standalone {
    padding-block-start: 16px;
}

:global(.h-overlay-enter-active .h-alert-dialog__panel),
:global(.h-overlay-leave-active .h-alert-dialog__panel) {
    transition:
        opacity var(--h0n-ui-duration-normal) ease,
        transform var(--h0n-ui-duration-normal) ease;
}

:global(.h-overlay-enter-from .h-alert-dialog__panel),
:global(.h-overlay-leave-to .h-alert-dialog__panel) {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
}
</style>
