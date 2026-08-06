<script setup lang="ts">
import { H0SearchField } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0SearchField model-value="Release notes" aria-label="Read-only query" readonly />
        <H0SearchField placeholder="Unavailable search" aria-label="Unavailable search" disabled />
        <H0SearchField model-value="Legacy query" label="Invalid search" error="Update the search query." />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(26rem, 100%);
}
</style>
