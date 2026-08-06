<script setup lang="ts">
import { H0Select, type H0SelectOption } from '@h0nio/ui'

const options: H0SelectOption<string>[] = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
]
</script>

<template>
    <div class="stack">
        <H0Select :options="options" label="Small" size="sm" />
        <H0Select :options="options" label="Medium" size="md" />
        <H0Select :options="options" label="Large" size="lg" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
