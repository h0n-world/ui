<script setup lang="ts">
import { H0Button, H0Card, H0ListItem, H0Typography } from '@h0nio/ui'
</script>

<template>
    <div class="built-in-example">
        <H0Button>Button feedback</H0Button>
        <H0Card as="button" interactive padding>
            <template #header>Interactive card</template>
            <template #description>H0Card already integrates H0Ripple.</template>
        </H0Card>
        <H0ListItem interactive title="Interactive list item" description="Ripple is enabled by the interactive prop." />
        <H0Typography variant="body-sm" color="muted">Use these components directly instead of nesting another H0Ripple inside them.</H0Typography>
    </div>
</template>

<style scoped>
.built-in-example {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(34rem, 100%);
}
</style>
