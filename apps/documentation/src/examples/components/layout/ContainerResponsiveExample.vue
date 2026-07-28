<script setup lang="ts">
import { H0Container, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Container as="main" size="lg" :gutter="{ base: 'sm', sm: 'md', lg: 'xl' }">
        <H0Stack class="surface" :gap="{ base: 'sm', md: 'lg' }">
            <strong>Responsive page container</strong>
            <span>Inline gutters increase from sm to md and xl without JavaScript resize listeners.</span>
        </H0Stack>
    </H0Container>
</template>

<style scoped>
.surface {
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    padding: var(--h0n-ui-spacing-lg);
}
.surface span {
    color: var(--h0n-ui-color-muted);
}
</style>
