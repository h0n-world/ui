<script setup lang="ts">
import { H0Spinner, H0Typography } from '@h0nio/ui'
</script>

<template>
    <div class="loading-panel">
        <H0Spinner size="24px" label="Loading account data" />
        <div>
            <H0Typography as="strong" variant="body" :weight="600">Loading account</H0Typography>
            <H0Typography variant="body-sm" color="muted">This can take a few seconds.</H0Typography>
        </div>
    </div>
</template>

<style scoped>
.loading-panel {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xl);
    display: flex;
    gap: var(--h0n-ui-spacing-md);
    padding: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}

.loading-panel div {
    display: grid;
    gap: 2px;
}
</style>
