<script setup lang="ts">
import { ref, watch } from 'vue'
import { H0DataTable, type H0DataTableColumn, type H0DataTableSort, type H0TableRowKey } from '@h0nio/ui'

type Ticket = { id: number; title: string; priority: string }

const allRows: Ticket[] = Array.from({ length: 21 }, (_, index) => ({
    id: index + 1,
    title: `Support request ${index + 1}`,
    priority: index % 3 ? 'Normal' : 'High',
}))

const columns: H0DataTableColumn<Ticket>[] = [
    { key: 'title', label: 'Ticket', minWidth: 240, sortable: true },
    { key: 'priority', label: 'Priority', minWidth: 120 },
]

const page = ref(1)
const pageSize = 5
const sort = ref<H0DataTableSort>(null)
const rows = ref<Ticket[]>([])
const loading = ref(false)
let requestId = 0

function getTicketKey(row: Ticket): H0TableRowKey {
    return row.id
}

watch(
    [page, sort],
    async () => {
        const currentRequest = ++requestId
        loading.value = true
        await new Promise((resolve) => window.setTimeout(resolve, 350))

        if (currentRequest !== requestId) return

        const sortedRows = [...allRows]
        if (sort.value) {
            const direction = sort.value.direction === 'asc' ? 1 : -1
            sortedRows.sort((left, right) => left.title.localeCompare(right.title, undefined, { numeric: true }) * direction)
        }

        const start = (page.value - 1) * pageSize
        rows.value = sortedRows.slice(start, start + pageSize)
        loading.value = false
    },
    { immediate: true },
)
</script>

<template>
    <div class="server-example">
        <H0DataTable
            v-model:page="page"
            v-model:sort="sort"
            :columns="columns"
            :rows="rows"
            :get-row-key="getTicketKey"
            :loading="loading"
            mode="server"
            pagination-mode="page"
            :page-size="pageSize"
            :total-items="allRows.length"
            aria-label="Support tickets"
        />

        <output aria-live="polite">Server query: page {{ page }}, sort {{ sort ? `${sort.key} ${sort.direction}` : 'none' }}</output>
    </div>
</template>

<style scoped>
.server-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(46rem, 100%);
}

output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
