<script setup lang="ts">
import { H0Chip } from '@h0nio/ui'
import type { H0ChipTone } from '@h0nio/ui'
import { ref } from 'vue'

const filters: Array<{ id: string; label: string; tone: H0ChipTone }> = [
    { id: 'design', label: 'Design', tone: 'default' },
    { id: 'frontend', label: 'Frontend', tone: 'primary' },
    { id: 'quality', label: 'Quality', tone: 'success' },
    { id: 'api', label: 'API', tone: 'warning' },
    { id: 'blocked', label: 'Blocked', tone: 'danger' }
]
const selected = ref(filters.map((filter) => filter.id))

function toggleFilter(id: string) {
    selected.value = selected.value.includes(id) ? selected.value.filter((value) => value !== id) : [...selected.value, id]
}
</script>

<template>
    <div class="chip-row" role="group" aria-label="Project filters">
        <H0Chip v-for="filter in filters" :key="filter.id" :tone="filter.tone" :selected="selected.includes(filter.id)" @click="toggleFilter(filter.id)">{{ filter.label }}</H0Chip>
    </div>
</template>

<style scoped>
.chip-row {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
    justify-content: center;
}
</style>
