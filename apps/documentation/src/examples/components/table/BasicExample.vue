<script setup lang="ts">
import { H0Badge, H0Table, type H0TableColumn, type H0TableGetRowKey } from '@h0nio/ui'

type Member = { id: number; name: string; role: string; status: 'Active' | 'Away' }

const columns: H0TableColumn<Member>[] = [
    { key: 'name', label: 'Name', minWidth: 150 },
    { key: 'role', label: 'Role', minWidth: 150 },
    { key: 'status', label: 'Status', minWidth: 110 },
]

const rows: Member[] = [
    { id: 1, name: 'Kate Moore', role: 'Design lead', status: 'Active' },
    { id: 2, name: 'John Smith', role: 'Engineer', status: 'Active' },
    { id: 3, name: 'Sara Johnson', role: 'Researcher', status: 'Away' },
]

const getMemberKey: H0TableGetRowKey<Member> = (row) => row.id
</script>

<template>
    <H0Table class="table-example" :columns="columns" :rows="rows" :get-row-key="getMemberKey" bordered hoverable aria-label="Project members">
        <template #cell-status="{ value }">
            <H0Badge :tone="value === 'Active' ? 'success' : 'warning'" size="sm">{{ value }}</H0Badge>
        </template>
    </H0Table>
</template>

<style scoped>
.table-example {
    width: min(44rem, 100%);
}
</style>
