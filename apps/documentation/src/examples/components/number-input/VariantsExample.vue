<script setup lang="ts">
import { H0NumberInput } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0NumberInput variant="surface" label="Surface quantity" :default-value="12" />
        <H0NumberInput variant="secondary" label="Secondary quantity" :default-value="24" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
