<script setup lang="ts">
import type { H0SideNavGap } from './SideNav.types'

defineOptions({
    name: 'H0SideNav'
})

withDefaults(
    defineProps<{
        gap?: H0SideNavGap
        animatedIndicator?: boolean
    }>(),
    {
        gap: 'md',
        animatedIndicator: true
    }
)
</script>

<template>
    <nav data-h0n-component="side-nav" class="h-side-nav" :class="[`h-side-nav--gap-${gap}`, animatedIndicator && 'h-side-nav--animated-indicator']">
        <slot />
    </nav>
</template>

<style scoped lang="scss">
.h-side-nav {
    --h-side-nav-gap: var(--h0n-ui-spacing-xl);

    display: grid;
    gap: var(--h-side-nav-gap);
    min-width: 0;

    &--gap-sm {
        --h-side-nav-gap: var(--h0n-ui-spacing-lg);
    }

    &--gap-lg {
        --h-side-nav-gap: var(--h0n-ui-spacing-2xl);
    }

    &--animated-indicator {
        --h-side-nav-indicator-opacity: 0;
        --h-side-nav-indicator-translate-x: -4px;
    }

    :deep(.h-side-nav-item) {
        --h-list-item-border-radius: var(--h0n-ui-radius-lg);
        --h-list-item-height: 40px;

        border-radius: var(--h0n-ui-radius-lg);
        padding: 7px 10px;
    }

    :deep(.h-side-nav-item .h-list-item__title) {
        color: var(--h0n-ui-color-text-secondary);
        font-weight: var(--h0n-ui-font-weight-regular);
    }

    :deep(.h-side-nav-item--active),
    :deep(.h-side-nav-item.router-link-active),
    :deep(.h-side-nav-item.router-link-exact-active) {
        background: var(--h0n-ui-color-surface);
    }

    :deep(.h-side-nav-item--active .h-list-item__title),
    :deep(.h-side-nav-item.router-link-active .h-list-item__title),
    :deep(.h-side-nav-item.router-link-exact-active .h-list-item__title),
    :deep(.h-side-nav-item:focus-visible .h-list-item__title) {
        color: var(--h0n-ui-color-text);
        font-weight: var(--h0n-ui-font-weight-medium);
    }

    @media (hover: hover) and (pointer: fine) {
        :deep(.h-side-nav-item.h-list-item--interactive:hover .h-list-item__title) {
            color: var(--h0n-ui-color-text);
        }
    }
}
</style>
