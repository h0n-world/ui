<script setup lang="ts">
import { H0Radio } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Radio value="surface" variant="surface" label="Surface radio" />
        <H0Radio value="secondary" variant="secondary" label="Secondary radio" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
}
</style>
