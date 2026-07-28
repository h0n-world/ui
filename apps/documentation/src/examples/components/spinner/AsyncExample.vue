<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { H0Button, H0Spinner, H0Typography } from '@h0nio/ui'

const loading = ref(false)
const completed = ref(false)
let timer: ReturnType<typeof window.setTimeout> | undefined

function load() {
    loading.value = true
    completed.value = false
    timer = window.setTimeout(() => {
        loading.value = false
        completed.value = true
    }, 1200)
}

onBeforeUnmount(() => {
    if (timer) window.clearTimeout(timer)
})
</script>

<template>
    <div class="async-example">
        <H0Button size="sm" variant="soft" :disabled="loading" @click="load">Load account</H0Button>
        <div v-if="loading" class="status-row">
            <H0Spinner size="20px" label="Loading account" />
            <H0Typography variant="body-sm">Loading account data…</H0Typography>
        </div>
        <output v-else-if="completed" aria-live="polite">
            <H0Typography variant="body-sm" color="muted">Account loaded.</H0Typography>
        </output>
    </div>
</template>

<style scoped>
.async-example {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: start;
    min-height: 5rem;
    width: min(28rem, 100%);
}

.status-row {
    align-items: center;
    display: flex;
    gap: var(--h0n-ui-spacing-sm);
}
</style>
