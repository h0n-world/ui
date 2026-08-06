<script setup lang="ts">
import { H0SearchField } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0SearchField size="sm" placeholder="Small search" aria-label="Small search" />
        <H0SearchField size="md" placeholder="Medium search" aria-label="Medium search" />
        <H0SearchField size="lg" placeholder="Large search" aria-label="Large search" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(26rem, 100%);
}
</style>
