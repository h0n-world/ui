<script setup lang="ts">
import { H0Switch } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Switch label="Enabled setting" :model-value="true" />
        <H0Switch label="Disabled setting" disabled />
        <H0Switch label="Required confirmation" required error="Enable this setting to continue." />
        <H0Switch disabled>
            <span>Custom label content</span>
        </H0Switch>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
}
</style>
