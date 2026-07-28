<script setup lang="ts">
import { H0Table, type H0TableColumn, type H0TableGetRowKey } from '@h0nio/ui'

type Report = { id: number; report: string; owner: string; updated: string }

const columns: H0TableColumn<Report>[] = [
    { key: 'report', label: 'Report' },
    { key: 'owner', label: 'Owner' },
    { key: 'updated', label: 'Updated', align: 'right', headerAlign: 'right' },
]

const rows: Report[] = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    report: `Quarterly report ${index + 1}`,
    owner: index % 2 ? 'Finance' : 'Operations',
    updated: `${index + 1} days ago`,
}))

const getReportKey: H0TableGetRowKey<Report> = (row) => row.id
</script>

<template>
    <H0Table
        class="table-example"
        :columns="columns"
        :rows="rows"
        :get-row-key="getReportKey"
        density="compact"
        column-sizing="equal"
        scroll-height="16rem"
        min-width="42rem"
        striped
        sticky-header
        caption="Recent reports"
        aria-label="Recent reports"
    />
</template>

<style scoped>
.table-example {
    width: min(44rem, 100%);
}
</style>
