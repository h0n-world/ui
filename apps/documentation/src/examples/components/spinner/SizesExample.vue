<script setup lang="ts">
import { H0Spinner, H0Typography } from '@h0nio/ui'
</script>

<template>
    <div class="spinner-row">
        <div><H0Spinner size="14px" label="Loading compact content" /><H0Typography variant="body-xs" color="muted">14px</H0Typography></div>
        <div><H0Spinner label="Loading content" /><H0Typography variant="body-xs" color="muted">18px</H0Typography></div>
        <div><H0Spinner size="24px" label="Loading panel" /><H0Typography variant="body-xs" color="muted">24px</H0Typography></div>
        <div><H0Spinner size="32px" label="Loading page" /><H0Typography variant="body-xs" color="muted">32px</H0Typography></div>
    </div>
</template>

<style scoped>
.spinner-row {
    align-items: end;
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-xl);
    justify-content: center;
}

.spinner-row > div {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    justify-items: center;
}
</style>
