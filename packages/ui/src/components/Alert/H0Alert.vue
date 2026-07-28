<script setup lang="ts">
import { closeIcon, errorIcon, infoIcon, loadingIcon, successIcon, warningIcon } from '../../icons'
import type { H0IconDefinition } from '../Icon'
import { computed } from 'vue'
import H0Button from '../Button/H0Button.vue'
import H0Icon from '../Icon/H0Icon.vue'
import H0Description from '../Typography/H0Description.vue'
import H0Typography from '../Typography/H0Typography.vue'
import type { H0AlertTone } from './Alert.types'

defineOptions({
    name: 'H0Alert'
})

const props = withDefaults(
    defineProps<{
        tone?: H0AlertTone
        loading?: boolean
        title?: string
        text?: string
        closable?: boolean
        actionText?: string
        closeAriaLabel?: string
    }>(),
    {
        tone: 'default',
        loading: false,
        title: '',
        text: '',
        closable: false,
        actionText: '',
        closeAriaLabel: 'Close alert'
    }
)

const emit = defineEmits<{
    action: []
    close: []
}>()

const isCompact = computed(() => !props.text && !props.actionText)
const resolvedIcon = computed<H0IconDefinition>(() => {
    if (props.tone === 'success') {
        return successIcon
    }

    if (props.tone === 'warning') {
        return warningIcon
    }

    if (props.tone === 'danger') {
        return errorIcon
    }

    if (props.loading) {
        return loadingIcon
    }

    return infoIcon
})
</script>

<template>
    <div data-h0n-component="alert" class="h-alert" :class="[`h-alert--${loading ? 'loading' : tone}`, isCompact && 'h-alert--compact']" role="alert">
        <slot name="icon">
            <H0Icon class="h-alert__icon" :icon="resolvedIcon" :size="20" :stroke-width="1.5" />
        </slot>

        <div class="h-alert__content">
            <H0Typography v-if="title || $slots.title" as="strong" class="h-alert__title" variant="body-sm" :weight="600" color="inherit">
                <slot name="title">{{ title }}</slot>
            </H0Typography>
            <H0Description v-if="text || $slots.default" as="div" class="h-alert__text">
                <slot>{{ text }}</slot>
            </H0Description>
        </div>

        <H0Button v-if="actionText || $slots.action" class="h-alert__action" size="sm" @click="emit('action')">
            <slot name="action">{{ actionText }}</slot>
        </H0Button>

        <button v-if="closable" class="h-alert__close" type="button" :aria-label="closeAriaLabel" @click="emit('close')">
            <H0Icon :icon="closeIcon" :size="20" :stroke-width="1.5" />
        </button>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/breakpoints' as bp;
.h-alert {
    --h-alert-accent: var(--h0n-ui-color-primary);
    --h-alert-action-color: var(--h0n-ui-color-primary-contrast);
    --h-alert-title-color: var(--h0n-ui-color-text);

    align-items: flex-start;
    background: var(--h0n-ui-color-surface);
    border: 0;
    border-radius: var(--h0n-ui-radius-xxl);
    color: var(--h0n-ui-color-text);
    display: grid;
    font-family: var(--h0n-ui-font-family);
    gap: 14px;
    grid-template-columns: auto minmax(0, 1fr) auto;
    min-width: 0;
    padding: 14px 14px 14px 18px;

    &--compact {
        align-items: center;
        border-radius: var(--h0n-ui-radius-round);
        min-height: 44px;
        padding-block: 10px;
    }

    &--default {
        --h-alert-accent: var(--h0n-ui-color-text);
        --h-alert-title-color: var(--h0n-ui-color-text);
    }

    &--info,
    &--loading {
        --h-alert-title-color: var(--h0n-ui-color-info-text);
    }

    &--success {
        --h-alert-accent: var(--h0n-ui-color-success);
        --h-alert-title-color: var(--h0n-ui-color-success-text);
    }

    &--warning {
        --h-alert-accent: var(--h0n-ui-color-warning);
        --h-alert-title-color: var(--h0n-ui-color-warning-text);
    }

    &--danger {
        --h-alert-accent: var(--h0n-ui-color-danger);
        --h-alert-title-color: var(--h0n-ui-color-danger-text);
    }

    &__icon {
        color: var(--h-alert-accent);
        flex: 0 0 auto;
        margin-top: 2px;
    }

    &__content {
        display: grid;
        gap: 3px;
        min-width: 0;
    }

    &__title {
        color: var(--h-alert-title-color);
        line-height: 1.25;
    }

    &__text {
        :deep(ul) {
            margin: 10px 0 0;
            padding-inline-start: 18px;
        }

        :deep(li + li) {
            margin-top: 5px;
        }
    }

    &__action {
        align-self: center;
        --h-button-bg: var(--h-alert-accent);
        --h-button-color: var(--h-alert-action-color);
        --h-button-hover-bg: color-mix(in srgb, var(--h-alert-accent) 90%, var(--h0n-ui-color-primary-contrast) 10%);
        min-height: 32px;
        padding: 0 14px;
    }

    &__close {
        align-items: center;
        align-self: center;
        background: color-mix(in srgb, var(--h0n-ui-color-muted) 18%, transparent);
        border: 0;
        border-radius: 50%;
        color: var(--h0n-ui-color-muted);
        cursor: pointer;
        display: inline-flex;
        font-size: 18px;
        height: 24px;
        justify-content: center;
        line-height: 1;
        width: 24px;

        &:focus-visible {
            box-shadow: var(--h0n-ui-focus-ring);
            outline: none;
        }
    }

    &--loading &__icon {
        animation: h-alert-spin 900ms linear infinite;
        border-color: color-mix(in srgb, var(--h-alert-accent) 32%, transparent);
        border-inline-start-color: var(--h-alert-accent);
    }
}

@include bp.h0n-at-most(bp.$h0n-breakpoint-xs) {
    .h-alert {
        grid-template-columns: auto minmax(0, 1fr);

        &__action,
        &__close {
            grid-column: 2;
            justify-self: start;
            margin-top: 8px;
        }
    }
}

:global([data-h0n-animation='low']) .h-alert--loading .h-alert__icon {
    animation: none;
}

@media (prefers-reduced-motion: reduce) {
    .h-alert--loading .h-alert__icon {
        animation: none;
    }
}

@keyframes h-alert-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
