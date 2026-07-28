<script setup lang="ts">
import { H0DataTable, H0Description, type H0DataTableColumn, type H0TableRowKey } from '@h0nio/ui'

type LogRow = { id: number; event: string; duration: number }

const columns: H0DataTableColumn<LogRow>[] = [
    { key: 'event', label: 'Event', minWidth: 240 },
    { key: 'duration', label: 'Duration (ms)', minWidth: 140, align: 'right' },
]

const rows: LogRow[] = Array.from({ length: 10_000 }, (_, index) => ({
    id: index + 1,
    event: `Pipeline event ${index + 1}`,
    duration: 20 + (index % 180),
}))

function getLogKey(row: LogRow): H0TableRowKey {
    return row.id
}
</script>

<template>
    <div class="virtual-example">
        <H0Description>10,000 source rows; only the visible fixed-height window is rendered.</H0Description>
        <H0DataTable
            :columns="columns"
            :rows="rows"
            :get-row-key="getLogKey"
            virtual
            :row-height="48"
            :overscan="5"
            scroll-height="20rem"
            min-width="32rem"
            selection-mode="multiple"
            aria-label="Pipeline events"
        />
    </div>
</template>

<style scoped>
.virtual-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(46rem, 100%);
}
</style>
