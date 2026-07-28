<script setup lang="ts">
import { H0NumberInput } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0NumberInput label="Without steppers" :default-value="12" :show-steps="false" />
        <H0NumberInput label="Read-only total" :model-value="48" readonly />
        <H0NumberInput label="Invalid quantity" :model-value="0" error="Quantity must be at least 1." />
        <H0NumberInput label="Disabled" :model-value="5" disabled />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
