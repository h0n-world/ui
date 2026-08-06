<script setup lang="ts">
import { H0Inline, H0Spacer, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Stack class="spacer-example" gap="xl">
        <div class="spacer-example__canvas">
            <div class="spacer-example__item">First section</div>
            <H0Spacer class="spacer-example__marker" :size="{ base: 'sm', md: 'xl' }" />
            <div class="spacer-example__item">Second section</div>
        </div>

        <H0Inline class="spacer-example__canvas" gap="none" :wrap="false">
            <div class="spacer-example__item">Start</div>
            <H0Spacer class="spacer-example__marker" axis="horizontal" size="lg" />
            <div class="spacer-example__item">End</div>
        </H0Inline>
    </H0Stack>
</template>

<style scoped>
.spacer-example {
    width: 100%;
}

.spacer-example__canvas {
    border: 1px dashed var(--h0n-ui-color-border);
    padding: var(--h0n-ui-spacing-sm);
}

.spacer-example__item {
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-md);
    padding: var(--h0n-ui-spacing-sm);
}

.spacer-example__marker {
    background: color-mix(in srgb, var(--h0n-ui-color-primary) 24%, transparent);
}
</style>
