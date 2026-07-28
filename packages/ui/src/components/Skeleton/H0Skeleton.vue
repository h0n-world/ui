<script setup lang="ts">
import type { H0SkeletonVariant } from './Skeleton.types'

defineOptions({
    name: "H0Skeleton",
});

withDefaults(
    defineProps<{
        circle?: boolean;
        height?: string;
        radius?: string;
        variant?: H0SkeletonVariant;
        width?: string;
    }>(),
    {
        circle: false,
        height: "1rem",
        radius: "var(--h0n-ui-radius-md)",
        variant: "block",
        width: "100%",
    },
);
</script>

<template>
    <span
        data-h0n-component="skeleton" class="h-skeleton"
        :class="[
            `h-skeleton--${variant}`,
            circle && 'h-skeleton--circle',
        ]"
        :style="{
            '--h-skeleton-height': height,
            '--h-skeleton-radius': radius,
            '--h-skeleton-width': width,
        }"
        aria-hidden="true"
    />
</template>

<style scoped lang="scss">
.h-skeleton {
    background: color-mix(
        in srgb,
        var(--h0n-ui-color-secondary) 86%,
        var(--h0n-ui-color-text) 14%
    );
    border-radius: var(--h-skeleton-radius);
    display: block;
    height: var(--h-skeleton-height);
    overflow: hidden;
    position: relative;
    width: var(--h-skeleton-width);

    &::after {
        animation: h-skeleton-shimmer 1.45s linear infinite;
        background: linear-gradient(
            90deg,
            transparent 0%,
            color-mix(
                in srgb,
                var(--h0n-ui-color-secondary) 62%,
                var(--h0n-ui-color-text) 38%
            ) 50%,
            transparent 100%
        );
        content: "";
        inset: 0;
        position: absolute;
        transform: translateX(-100%);
        will-change: transform;
    }

    &--circle {
        border-radius: 50%;
    }

    &--text {
        height: var(--h-skeleton-height);
        min-height: 0.75em;
    }
}

:global([data-h0n-animation='low']) .h-skeleton::after {
    animation: none;
}

@media (prefers-reduced-motion: reduce) {
    .h-skeleton::after {
        animation: none;
    }
}

@keyframes h-skeleton-shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}
</style>
