<script setup lang="ts">
import type { H0SpinnerSize } from './Spinner.types'

defineOptions({
    name: 'H0Spinner'
})

withDefaults(
    defineProps<{
        size?: H0SpinnerSize
        label?: string
    }>(),
    {
        size: '18px',
        label: 'Loading'
    }
)
</script>

<template>
    <span data-h0n-component="spinner" class="h-spinner" :style="{ '--h-spinner-size': size }" role="status" :aria-label="label" />
</template>

<style scoped lang="scss">
.h-spinner {
    animation: h-spinner-rotate 750ms linear infinite;
    border: 2px solid currentColor;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    flex: 0 0 auto;
    height: var(--h-spinner-size);
    width: var(--h-spinner-size);
}

:global([data-h0n-animation='low']) .h-spinner {
    animation: none;
}

@media (prefers-reduced-motion: reduce) {
    .h-spinner {
        animation: none;
    }
}

@keyframes h-spinner-rotate {
    to {
        transform: rotate(360deg);
    }
}
</style>
