<script setup lang="ts">
import { H0Card, H0Inline, H0ScrollArea } from '@h0nio/ui'
</script>

<template>
    <H0ScrollArea
        class="scroll-area"
        orientation="horizontal"
        max-width="100%"
        aria-label="Project cards"
    >
        <H0Inline class="row" gap="md" :wrap="false">
            <H0Card v-for="item in 8" :key="item" padding class="card">Project {{ item }}</H0Card>
        </H0Inline>
    </H0ScrollArea>
</template>

<style scoped>
.scroll-area {
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    width: min(42rem, 100%);
}
.row {
    padding: var(--h0n-ui-spacing-md);
    width: max-content;
}
.card {
    flex: 0 0 11rem;
}
</style>
