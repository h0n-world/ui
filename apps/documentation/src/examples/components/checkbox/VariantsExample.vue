<script setup lang="ts">
import { H0Checkbox } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Checkbox variant="surface" label="Surface checkbox" />
        <H0Checkbox variant="secondary" label="Secondary checkbox" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
}
</style>
