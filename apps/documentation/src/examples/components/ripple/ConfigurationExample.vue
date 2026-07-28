<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { H0Ripple, H0Switch, H0Typography } from '@h0nio/ui'

type RippleApi = { create: (event: PointerEvent) => void }

const disabled = ref(false)
const subtle = useTemplateRef<RippleApi>('subtle')
const strong = useTemplateRef<RippleApi>('strong')
</script>

<template>
    <div class="configuration-example">
        <H0Switch v-model="disabled" label="Disable custom ripples" />
        <div class="surface-row">
            <button type="button" class="surface surface--subtle" @pointerdown="subtle?.create($event)">
                Subtle and slow
                <H0Ripple ref="subtle" :disabled="disabled" :duration="900" :opacity="0.1" />
            </button>
            <button type="button" class="surface surface--strong" @pointerdown="strong?.create($event)">
                Strong and fast
                <H0Ripple ref="strong" :disabled="disabled" :duration="420" :opacity="0.32" />
            </button>
        </div>
        <H0Typography variant="body-sm" color="muted">Current state: {{ disabled ? 'disabled' : 'enabled' }}</H0Typography>
    </div>
</template>

<style scoped>
.configuration-example {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: start;
    width: min(34rem, 100%);
}

.surface-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
}

.surface {
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-lg);
    color: var(--h0n-ui-color-text);
    cursor: pointer;
    font: inherit;
    min-height: 44px;
    overflow: hidden;
    padding-inline: var(--h0n-ui-spacing-lg);
    position: relative;
}

.surface--subtle {
    background: var(--h0n-ui-color-secondary);
}

.surface--strong {
    background: var(--h0n-ui-color-primary);
    color: var(--h0n-ui-color-primary-contrast);
}

.surface:focus-visible {
    box-shadow: var(--h0n-ui-focus-ring);
    outline: none;
}
</style>
