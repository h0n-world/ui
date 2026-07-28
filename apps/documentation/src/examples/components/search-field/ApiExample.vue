<script setup lang="ts">
import { H0Button, H0SearchField } from '@h0nio/ui'
import { ref } from 'vue'

const query = ref('')
const field = ref<{
    clear: () => void
    focus: () => void
    setValue: (value: string) => void
} | null>(null)
const lastEvent = ref('No input yet')
</script>

<template>
    <div class="stack">
        <H0SearchField
            ref="field"
            v-model="query"
            aria-label="Command search"
            @input="(value) => (lastEvent = `Input: ${value}`)"
            @clear="lastEvent = 'Query cleared'"
        />
        <div class="actions">
            <H0Button size="sm" @click="field?.setValue('accessibility')">Set query</H0Button>
            <H0Button size="sm" variant="ghost" @click="field?.focus()">Focus</H0Button>
            <H0Button size="sm" variant="ghost" @click="field?.clear()">Clear</H0Button>
        </div>
        <output aria-live="polite">{{ lastEvent }}</output>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(26rem, 100%);
}
.actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
