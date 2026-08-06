<script setup lang="ts">
import { H0Textarea } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Textarea variant="surface" label="Surface" placeholder="Textarea on a neutral surface" />
        <H0Textarea variant="secondary" label="Secondary" placeholder="Textarea with stronger separation" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(34rem, 100%);
}
</style>
