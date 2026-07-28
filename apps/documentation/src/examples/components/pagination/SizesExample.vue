<script setup lang="ts">
import { ref } from 'vue'
import { H0Pagination, type H0PaginationSize } from '@h0nio/ui'

const sizes: Array<{ label: string; value: H0PaginationSize }> = [
    { label: 'Sm', value: 'sm' },
    { label: 'Md', value: 'md' },
    { label: 'Lg', value: 'lg' },
]
const page = ref(1)
</script>

<template>
    <div class="pagination-sizes">
        <div v-for="size in sizes" :key="size.value" class="pagination-size-row">
            <strong>{{ size.label }}</strong>
            <H0Pagination v-model:page="page" :size="size.value" :total-pages="3" :aria-label="`${size.label} pagination`" />
        </div>
    </div>
</template>

<style scoped>
.pagination-sizes {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: 100%;
}

.pagination-size-row {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    grid-template-columns: 2rem minmax(0, 1fr);
}

@media (max-width: 480px) {
    .pagination-size-row {
        align-items: start;
        grid-template-columns: 1fr;
    }
}
</style>
