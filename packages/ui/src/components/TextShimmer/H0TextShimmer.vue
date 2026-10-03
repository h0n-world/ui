<script setup lang="ts">
import { computed } from 'vue'
import type { H0TextShimmerProps } from './TextShimmer.types'

defineOptions({ name: 'H0TextShimmer' })
const props = withDefaults(defineProps<H0TextShimmerProps>(), { as: 'span', active: true, duration: 2000 })
const durationStyle = computed(() => ({ '--text-shimmer-duration': `${Number.isFinite(props.duration) && props.duration > 0 ? props.duration : 2000}ms` }))
</script>

<template>
    <component :is="as" data-h0n-component="text-shimmer" class="h-text-shimmer" :class="{ 'h-text-shimmer--active': active }" :style="durationStyle"><slot /></component>
</template>

<style scoped>
.h-text-shimmer {
    color: color-mix(in srgb, var(--h0n-ui-color-text-secondary) 85%, var(--h0n-ui-color-text) 15%);
    display: inline-block;
    max-inline-size: 100%;
    margin: 0;
    overflow-wrap: anywhere;
}

@supports ((background-clip: text) or (-webkit-background-clip: text)) {
    [data-h0n-animation='high'] .h-text-shimmer--active {
        background-image: linear-gradient(110deg, currentColor 35%, var(--h0n-ui-color-text) 50%, currentColor 65%);
        background-size: 250% 100%;
        background-repeat: no-repeat;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: h-text-shimmer-sweep var(--text-shimmer-duration) linear infinite;
    }
}

@keyframes h-text-shimmer-sweep {
    from { background-position: 100% 0; }
    to { background-position: 0% 0; }
}

@media (prefers-reduced-motion: reduce), (forced-colors: active) {
    [data-h0n-animation='high'] .h-text-shimmer--active {
        animation: none;
        background: none;
        -webkit-text-fill-color: currentColor;
    }
}
@media (forced-colors: active) {
    .h-text-shimmer { color: CanvasText; }
}
</style>
