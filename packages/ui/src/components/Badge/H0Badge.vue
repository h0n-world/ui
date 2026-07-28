<script setup lang="ts">
import type { H0BadgeSize, H0BadgeTone } from './Badge.types'

defineOptions({
    name: 'H0Badge'
})

withDefaults(
    defineProps<{
        tone?: H0BadgeTone
        size?: H0BadgeSize
        dot?: boolean
        text?: string
    }>(),
    {
        tone: 'default',
        size: 'md',
        dot: false,
        text: ''
    }
)
</script>

<template>
    <span data-h0n-component="badge" class="h-badge" :class="[`h-badge--${tone}`, `h-badge--${size}`, dot && 'h-badge--dot']">
        <span v-if="dot" class="h-badge__dot" aria-hidden="true" />
        <slot>{{ text }}</slot>
    </span>
</template>

<style scoped lang="scss">
.h-badge {
    --h-badge-bg: var(--h0n-ui-color-secondary);
    --h-badge-color: var(--h0n-ui-color-text);

    align-items: center;
    background: var(--h-badge-bg);
    border-radius: var(--h0n-ui-radius-round);
    color: var(--h-badge-color);
    display: inline-flex;
    font-family: var(--h0n-ui-font-family);
    font-weight: var(--h0n-ui-font-weight-bold);
    gap: 6px;
    line-height: 1;
    max-width: 100%;
    min-width: 0;
    vertical-align: middle;
    white-space: nowrap;

    &--sm {
        min-height: 22px;
        padding: 0 8px;
        font-size: var(--h0n-ui-badge-sm-font-size);
    }

    &--md {
        min-height: 26px;
        padding: 0 10px;
        font-size: var(--h0n-ui-badge-md-font-size);
    }

    &--primary {
        --h-badge-bg: color-mix(in srgb, var(--h0n-ui-color-primary) 18%, transparent);
        --h-badge-color: var(--h0n-ui-color-info-text);
    }

    &--success {
        --h-badge-bg: color-mix(in srgb, var(--h0n-ui-color-success) 18%, transparent);
        --h-badge-color: var(--h0n-ui-color-success-text);
    }

    &--warning {
        --h-badge-bg: color-mix(in srgb, var(--h0n-ui-color-warning) 18%, transparent);
        --h-badge-color: var(--h0n-ui-color-warning-text);
    }

    &--danger {
        --h-badge-bg: color-mix(in srgb, var(--h0n-ui-color-danger) 18%, transparent);
        --h-badge-color: var(--h0n-ui-color-danger-text);
    }

    &--neutral {
        --h-badge-bg: var(--h0n-ui-color-surface);
        --h-badge-color: var(--h0n-ui-color-muted);
    }

    &__dot {
        background: currentColor;
        border-radius: 50%;
        flex: 0 0 auto;
        height: 6px;
        width: 6px;
    }
}
</style>
