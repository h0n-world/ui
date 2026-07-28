<script setup lang="ts">
import { computed, ref } from 'vue'
import { H0Badge, H0Button, H0Description, H0Table, type H0TableColumn, type H0TableGetRowKey } from '@h0nio/ui'

type Invoice = {
    id: number
    customer: string
    subtotal: number
    taxRate: number
    status: 'Paid' | 'Pending'
}

const columns: H0TableColumn<Invoice>[] = [
    { key: 'customer', label: 'Customer', minWidth: 160 },
    { key: 'total', label: 'Total', minWidth: 120, align: 'right', headerAlign: 'right', value: (row) => row.subtotal * (1 + row.taxRate) },
    { key: 'status', label: 'Status', minWidth: 110 },
    { key: 'actions', label: 'Actions', width: 110, align: 'right', headerAlign: 'right' },
]

const rows = ref<Invoice[]>([
    { id: 1048, customer: 'Acme Studio', subtotal: 1200, taxRate: 0.2, status: 'Paid' },
    { id: 1049, customer: 'Northstar Labs', subtotal: 860, taxRate: 0.2, status: 'Pending' },
    { id: 1050, customer: 'Orbit Systems', subtotal: 1540, taxRate: 0.2, status: 'Pending' },
])

const activity = ref('No row selected')
const grandTotal = computed(() => rows.value.reduce((total, row) => total + row.subtotal * (1 + row.taxRate), 0))
const getInvoiceKey: H0TableGetRowKey<Invoice> = (row) => row.id

function formatMoney(value: unknown) {
    return typeof value === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) : ''
}

function handleRowClick(row: Invoice, index: number) {
    activity.value = `Selected row ${index + 1}: invoice ${row.id}`
}

function markPaid(row: Invoice) {
    row.status = 'Paid'
    activity.value = `Invoice ${row.id} marked as paid without triggering row-click`
}
</script>

<template>
    <div class="custom-content-example">
        <H0Table
            :columns="columns"
            :rows="rows"
            :get-row-key="getInvoiceKey"
            min-width="38rem"
            bordered
            hoverable
            caption="Recent invoices"
            aria-label="Recent invoices"
            @row-click="handleRowClick"
        >
            <template #header-total="{ column }">
                {{ column.label }} with tax
            </template>

            <template #cell-total="{ value }">
                <strong>{{ formatMoney(value) }}</strong>
            </template>

            <template #cell-status="{ row }">
                <H0Badge :tone="row.status === 'Paid' ? 'success' : 'warning'" size="sm">{{ row.status }}</H0Badge>
            </template>

            <template #cell-actions="{ row }">
                <H0Button size="sm" variant="ghost" :disabled="row.status === 'Paid'" @click.stop="markPaid(row)">Mark paid</H0Button>
            </template>

            <template #after-rows="{ columnCount }">
                <tr class="summary-row">
                    <td :colspan="columnCount">Grand total: {{ formatMoney(grandTotal) }}</td>
                </tr>
            </template>
        </H0Table>

        <output aria-live="polite">
            <H0Description as="span">{{ activity }}</H0Description>
        </output>
    </div>
</template>

<style scoped>
.custom-content-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(48rem, 100%);
}

.summary-row td {
    padding: var(--h0n-ui-spacing-md);
    border-top: 1px solid var(--h0n-ui-color-border);
    background: var(--h0n-ui-color-surface-subtle);
    font-weight: var(--h0n-ui-font-weight-semibold);
    text-align: right;
}
</style>
