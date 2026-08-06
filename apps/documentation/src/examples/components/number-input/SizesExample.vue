<script setup lang="ts">
import { H0NumberInput } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0NumberInput size="sm" label="Small quantity" :default-value="12" />
        <H0NumberInput size="md" label="Medium quantity" :default-value="12" />
        <H0NumberInput size="lg" label="Large quantity" :default-value="12" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
