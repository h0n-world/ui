<script setup lang="ts">
import { H0Textarea } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Textarea size="sm" label="Small note" :min-rows="2" />
        <H0Textarea size="md" label="Default message" :min-rows="3" />
        <H0Textarea size="lg" label="Large description" :min-rows="4" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(34rem, 100%);
}
</style>
