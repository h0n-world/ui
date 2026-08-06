<script setup lang="ts">
import { H0Select, type H0SelectOption } from '@h0nio/ui'

const options: H0SelectOption<string>[] = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
]
</script>

<template>
    <div class="stack">
        <H0Select :options="options" label="Loading" loading />
        <H0Select :options="options" label="Disabled" disabled />
        <H0Select :options="options" label="Invalid status" error="Select a status." required />
        <H0Select :options="[]" label="Empty list" empty-text="No statuses available" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
