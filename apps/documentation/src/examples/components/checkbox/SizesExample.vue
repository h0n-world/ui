<script setup lang="ts">
import { H0Checkbox } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Checkbox size="sm" label="Small checkbox" default-value />
        <H0Checkbox size="md" label="Medium checkbox" default-value />
        <H0Checkbox size="lg" label="Large checkbox" default-value />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
}
</style>
