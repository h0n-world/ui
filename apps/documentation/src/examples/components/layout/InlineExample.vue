<script setup lang="ts">
import { H0Badge, H0Button, H0Inline } from '@h0nio/ui'
</script>

<template>
    <H0Inline class="inline-example" justify="between" :gap="{ base: 'sm', md: 'md' }" wrap>
        <H0Inline gap="sm">
            <strong>Production API</strong>
            <H0Badge tone="success">Healthy</H0Badge>
        </H0Inline>

        <H0Inline gap="xs" wrap>
            <H0Button size="sm" variant="soft">Logs</H0Button>
            <H0Button size="sm">Open dashboard</H0Button>
        </H0Inline>
    </H0Inline>
</template>

<style scoped>
.inline-example {
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-lg);
    padding: var(--h0n-ui-spacing-md);
    width: 100%;
}
</style>
