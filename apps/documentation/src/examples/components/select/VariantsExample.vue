<script setup lang="ts">
import { H0Select, type H0SelectOption } from '@h0nio/ui'

const options: H0SelectOption<string>[] = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
]
</script>

<template>
    <div class="stack">
        <H0Select :options="options" variant="surface" label="Surface" placeholder="Select a status" />
        <H0Select :options="options" variant="secondary" label="Secondary" placeholder="Select a status" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
