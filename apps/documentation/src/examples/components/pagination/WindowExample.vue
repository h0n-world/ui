<script setup lang="ts">
import { H0Pagination } from '@h0nio/ui'
import { ref } from 'vue'

const page = ref(25)
</script>

<template>
    <div class="stack">
        <H0Pagination v-model:page="page" :total-pages="50" :sibling-count="2" aria-label="Large result set pages" />
        <output>Current page: {{ page }}</output>
        <H0Pagination :page="3" :total-pages="8" disabled aria-label="Disabled pagination" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
