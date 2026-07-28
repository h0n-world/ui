<script setup lang="ts">
import { H0Select, type H0SelectOption } from '@h0nio/ui'
import { ref } from 'vue'

const values = ref<string[]>(['design'])
const options: H0SelectOption<string>[] = [
    { value: 'design', label: 'Design' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'research', label: 'Research' },
    { value: 'operations', label: 'Operations' },
]
</script>

<template>
    <div class="stack">
        <H0Select
            v-model="values"
            :options="options"
            multiple
            :max-selected="2"
            label="Teams"
            hint="Choose up to two teams."
            name="teams"
        />
        <output>Selected: {{ values.join(', ') || 'none' }}</output>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(26rem, 100%);
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
