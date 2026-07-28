<script setup lang="ts">
import { H0Input } from '@h0nio/ui'
import { ref } from 'vue'

const value = ref('Clear me')
const lastEvent = ref('No event yet')
</script>

<template>
    <div class="stack">
        <H0Input
            v-model="value"
            label="Clearable"
            clearable
            @clear="lastEvent = 'Value cleared'"
            @change="lastEvent = 'Change committed'"
        />
        <H0Input label="Read-only" model-value="INV-2048" readonly />
        <H0Input label="Disabled" model-value="Unavailable" disabled />
        <H0Input
            label="Invalid email"
            model-value="hello@"
            error="Enter a complete email address."
        />
        <output aria-live="polite">{{ lastEvent }}</output>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
