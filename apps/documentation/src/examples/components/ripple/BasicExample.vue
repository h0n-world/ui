<script setup lang="ts">
import { H0Ripple } from '@h0nio/ui'
import { useTemplateRef } from 'vue'

type RippleApi = { create: (event: PointerEvent) => void }
const ripple = useTemplateRef<RippleApi>('ripple')
</script>

<template>
    <button type="button" class="ripple-surface" @pointerdown="ripple?.create($event)">
        Custom interactive surface
        <H0Ripple ref="ripple" />
    </button>
</template>

<style scoped>
.ripple-surface {
    background: var(--h0n-ui-color-primary);
    border: 0;
    border-radius: var(--h0n-ui-radius-lg);
    color: var(--h0n-ui-color-primary-contrast);
    cursor: pointer;
    font: inherit;
    min-height: 44px;
    overflow: hidden;
    padding-inline: var(--h0n-ui-spacing-lg);
    position: relative;
}

.ripple-surface:focus-visible {
    box-shadow: var(--h0n-ui-focus-ring);
    outline: none;
}
</style>
