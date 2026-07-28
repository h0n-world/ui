<script setup lang="ts">
import { computed, useAttrs, useSlots, useTemplateRef, type Component } from 'vue'
import H0Interactive from '../_shared/H0Interactive.vue'
import H0Icon from '../Icon/H0Icon.vue'
import type { H0IconDefinition } from '../Icon/Icon.types'
import H0Ripple from '../Ripple/H0Ripple.vue'
import H0Spinner from '../Spinner/H0Spinner.vue'
import type { H0ButtonSize, H0ButtonTone, H0ButtonTypeVariant, H0ButtonVariant } from './Button.types'

defineOptions({
    name: 'H0Button',
    inheritAttrs: false
})

const props = withDefaults(
    defineProps<{
        tone?: H0ButtonTone
        variant?: H0ButtonVariant
        size?: H0ButtonSize
        buttonType?: H0ButtonTypeVariant
        icon?: H0IconDefinition
        iconTitle?: string
        type?: 'button' | 'submit' | 'reset'
        disabled?: boolean
        loading?: boolean
        loadingText?: string
        fullWidth?: boolean
        rounded?: boolean
        ariaLabel?: string
        as?: string | Component
        href?: string
        to?: unknown
        rootAttrs?: Record<string, unknown>
    }>(),
    {
        tone: 'default',
        variant: 'solid',
        size: 'md',
        buttonType: 'default',
        icon: undefined,
        iconTitle: '',
        type: 'button',
        disabled: false,
        loading: false,
        fullWidth: false,
        rounded: true,
        ariaLabel: '',
        as: 'button'
    }
)

const ripple = useTemplateRef<InstanceType<typeof H0Ripple>>('ripple')
const attrs = useAttrs()
const slots = useSlots()
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))
const isDisabled = computed(() => props.disabled || props.loading)
const isOnlyIcon = computed(() => props.buttonType === 'onlyIcon')
const shouldShowIcon = computed(() => Boolean(props.icon || slots.icon) && !props.loading && props.buttonType !== 'default')
const appearanceClass = computed(() => {
    if (props.variant === 'ghost' || props.variant === 'outline') {
        return `h-button--${props.variant}`
    }

    if (props.variant === 'soft') {
        return props.tone === 'default' ? 'h-button--secondary' : `h-button--${props.tone}-soft`
    }

    return `h-button--${props.tone}`
})
const spinnerSize = computed(() => {
    if (props.size === 'sm') {
        return '14px'
    }

    if (props.size === 'lg') {
        return '18px'
    }

    return '16px'
})

function handlePointerDown(event: PointerEvent) {
    if (isDisabled.value) {
        return
    }

    ripple.value?.create(event)
}
</script>

<template>
    <H0Interactive
        :as="as"
        v-bind="mergedRootAttrs"
        :href="href"
        :to="to"
        data-h0n-component="button"
        class="h-button"
        :class="[
            `h-button--tone-${tone}`,
            `h-button--variant-${variant}`,
            appearanceClass,
            `h-button--${size}`,
            `h-button--type-${buttonType}`,
            fullWidth && 'h-button--full-width',
            !rounded && !isOnlyIcon && 'h-button--no-radius'
        ]"
        :type="type"
        :disabled="isDisabled"
        :aria-busy="loading || undefined"
        :aria-label="ariaLabel || undefined"
        @pointerdown="handlePointerDown"
    >
        <span class="h-button__content">
            <template v-if="loading">
                <H0Spinner :size="spinnerSize" />
                <span v-if="loadingText && !isOnlyIcon">{{ loadingText }}</span>
                <slot v-else-if="!isOnlyIcon" />
            </template>
            <template v-else>
                <slot v-if="shouldShowIcon" name="icon">
                    <H0Icon v-if="icon" class="h-button__icon" :icon="icon" :size="16" :title="iconTitle" :stroke-width="1.4" />
                </slot>
                <slot v-if="!isOnlyIcon" />
            </template>
        </span>
        <H0Ripple ref="ripple" :disabled="isDisabled" />
    </H0Interactive>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-button {
    --h-button-bg: transparent;
    --h-button-color: var(--h0n-ui-color-text);
    --h-button-hover-bg: var(--h-button-bg);
    --h-button-hover-color: var(--h-button-color);
    --h-button-border: transparent;

    align-items: center;
    background: var(--h-button-bg);
    border: 1px solid var(--h-button-border);
    border-radius: var(--h0n-ui-radius-xl);
    color: var(--h-button-color);
    cursor: pointer;
    display: inline-flex;
    font-family: var(--h0n-ui-font-family);
    font-weight: var(--h0n-ui-font-weight-medium);
    gap: 8px;
    justify-content: center;
    line-height: 1;
    overflow: hidden;
    position: relative;
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        border-color var(--h0n-ui-duration-fast) ease,
        color var(--h0n-ui-duration-fast) ease,
        box-shadow var(--h0n-ui-duration-fast) ease,
        transform var(--h0n-ui-duration-fast) ease;
    white-space: nowrap;

    &__content {
        align-items: center;
        display: inline-flex;
        gap: inherit;
        justify-content: center;
        min-width: 0;
        position: relative;
        z-index: 1;
    }

    &__icon {
        flex: 0 0 auto;
    }

    @include mixins.h0n-focus-visible;

    &:active:not(:disabled) {
        transform: translateY(1px);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }

    &--sm {
        min-height: var(--h0n-ui-control-height-sm);
        padding: 0 12px;
        font-size: var(--h0n-ui-button-sm-font-size);
    }

    &--md {
        min-height: var(--h0n-ui-control-height-md);
        padding: 0 16px;
        font-size: var(--h0n-ui-button-md-font-size);
    }

    &--lg {
        min-height: var(--h0n-ui-control-height-lg);
        padding: 0 20px;
        font-size: var(--h0n-ui-button-lg-font-size);
    }

    &--full-width {
        width: 100%;
    }

    &--type-onlyIcon {
        border-radius: var(--h0n-ui-radius-round);
        padding: 0;
    }

    &--type-onlyIcon.h-button--sm {
        min-height: var(--h0n-ui-icon-control-size-sm);
        width: var(--h0n-ui-icon-control-size-sm);
    }

    &--type-onlyIcon.h-button--md {
        min-height: var(--h0n-ui-icon-control-size-md);
        width: var(--h0n-ui-icon-control-size-md);
    }

    &--type-onlyIcon.h-button--lg {
        min-height: var(--h0n-ui-icon-control-size-lg);
        width: var(--h0n-ui-icon-control-size-lg);
    }

    &--type-onlyIcon.h-button--full-width {
        width: 100%;
    }

    &--no-radius {
        border-radius: 0;
    }

    &--default {
        --h-button-bg: var(--h0n-ui-button-default);
        --h-button-color: var(--h0n-ui-button-default-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-default-hover);
    }

    &--primary {
        --h-button-bg: var(--h0n-ui-button-primary);
        --h-button-color: var(--h0n-ui-button-primary-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-primary-hover);
    }

    &--primary-soft {
        --h-button-bg: var(--h0n-ui-button-primary-soft);
        --h-button-color: var(--h0n-ui-button-primary-soft-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-primary-soft-hover);
        --h-button-hover-color: var(--h0n-ui-button-primary-soft-contrast);
    }

    &--secondary {
        --h-button-bg: var(--h0n-ui-button-secondary);
        --h-button-color: var(--h0n-ui-button-secondary-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-secondary-hover);
    }

    &--ghost {
        --h-button-bg: var(--h0n-ui-button-ghost);
        --h-button-color: var(--h0n-ui-button-ghost-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-ghost-hover);
    }

    &--outline {
        --h-button-bg: var(--h0n-ui-button-outline);
        --h-button-color: var(--h0n-ui-button-outline-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-outline-hover);
        --h-button-border: var(--h0n-ui-button-outline-border);
    }

    &--success {
        --h-button-bg: var(--h0n-ui-button-success);
        --h-button-color: var(--h0n-ui-button-success-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-success-hover);
    }

    &--success-soft {
        --h-button-bg: var(--h0n-ui-button-success-soft);
        --h-button-color: var(--h0n-ui-button-success-soft-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-success-soft-hover);
        --h-button-hover-color: var(--h0n-ui-button-success-soft-contrast);
    }

    &--warning {
        --h-button-bg: var(--h0n-ui-button-warning);
        --h-button-color: var(--h0n-ui-button-warning-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-warning-hover);
    }

    &--warning-soft {
        --h-button-bg: var(--h0n-ui-button-warning-soft);
        --h-button-color: var(--h0n-ui-button-warning-soft-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-warning-soft-hover);
        --h-button-hover-color: var(--h0n-ui-button-warning-soft-contrast);
    }

    &--danger {
        --h-button-bg: var(--h0n-ui-button-danger);
        --h-button-color: var(--h0n-ui-button-danger-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-danger-hover);
    }

    &--danger-soft {
        --h-button-bg: var(--h0n-ui-button-danger-soft);
        --h-button-color: var(--h0n-ui-button-danger-soft-contrast);
        --h-button-hover-bg: var(--h0n-ui-button-danger-soft-hover);
        --h-button-hover-color: var(--h0n-ui-button-danger-soft-contrast);
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover:not(:disabled) {
            background: var(--h-button-hover-bg);
            color: var(--h-button-hover-color);
        }
    }
}
</style>
