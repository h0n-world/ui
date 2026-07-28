<script setup lang="ts">
import { computed, ref } from 'vue'
import { H0Badge, H0Button, H0DataTable, H0Description, type H0DataTableColumn, type H0DataTableFilters, type H0TableRowKey } from '@h0nio/ui'

type Job = { id: number; name: string; owner: string; status: 'Active' | 'Paused' | 'Locked' }
type ErrorMode = 'none' | 'with-rows' | 'empty'

const columns: H0DataTableColumn<Job>[] = [
    { key: 'name', label: 'Job', minWidth: 180 },
    { key: 'owner', label: 'Owner', minWidth: 130 },
    { key: 'status', label: 'Status', minWidth: 240 },
]

const sourceRows: Job[] = [
    { id: 1, name: 'Daily export', owner: 'Data team', status: 'Active' },
    { id: 2, name: 'Search indexing', owner: 'Platform', status: 'Paused' },
    { id: 3, name: 'Audit archive', owner: 'Security', status: 'Locked' },
]

const filters = ref<H0DataTableFilters>({ status: null })
const errorMode = ref<ErrorMode>('none')
const rows = computed(() => (errorMode.value === 'empty' ? [] : sourceRows))
const error = computed(() => (errorMode.value === 'none' ? '' : 'The latest server refresh failed.'))

function getJobKey(row: Job): H0TableRowKey {
    return row.id
}

function isJobSelectable(row: Job) {
    return row.status !== 'Locked'
}
</script>

<template>
    <div class="slots-example">
        <div class="error-controls" role="group" aria-label="Error state">
            <H0Button size="sm" variant="soft" :tone="errorMode === 'none' ? 'primary' : 'default'" @click="errorMode = 'none'">Normal</H0Button>
            <H0Button size="sm" variant="soft" :tone="errorMode === 'with-rows' ? 'primary' : 'default'" @click="errorMode = 'with-rows'">Error with rows</H0Button>
            <H0Button size="sm" variant="soft" :tone="errorMode === 'empty' ? 'primary' : 'default'" @click="errorMode = 'empty'">Empty error</H0Button>
        </div>

        <H0DataTable
            v-model:filters="filters"
            :columns="columns"
            :rows="rows"
            :get-row-key="getJobKey"
            :is-row-selectable="isJobSelectable"
            :error="error"
            selection-mode="multiple"
            min-width="38rem"
            aria-label="Background jobs"
        >
            <template #toolbar="{ filters: toolbarFilters, setFilter }">
                <div class="toolbar-content">
                    <H0Description as="span">Status filter: {{ toolbarFilters?.status ?? 'All' }}</H0Description>
                    <H0Button size="sm" variant="ghost" :disabled="toolbarFilters?.status == null" @click="setFilter('status', null)">Clear filter</H0Button>
                </div>
            </template>

            <template #filter-status="{ value, setFilter }">
                <div class="status-filter" role="group" aria-label="Filter Status">
                    <H0Button size="sm" variant="ghost" :tone="value == null ? 'primary' : 'default'" @click="setFilter(null)">All</H0Button>
                    <H0Button size="sm" variant="ghost" :tone="value === 'Active' ? 'primary' : 'default'" @click="setFilter('Active')">Active</H0Button>
                    <H0Button size="sm" variant="ghost" :tone="value === 'Paused' ? 'primary' : 'default'" @click="setFilter('Paused')">Paused</H0Button>
                </div>
            </template>

            <template #cell-status="{ row }">
                <H0Badge :tone="row.status === 'Active' ? 'success' : row.status === 'Paused' ? 'warning' : 'default'" size="sm">{{ row.status }}</H0Badge>
            </template>

            <template #error="{ error: message }">
                <div class="custom-error" role="alert">Custom empty error: {{ message }}</div>
            </template>
        </H0DataTable>
    </div>
</template>

<style scoped>
.slots-example {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(50rem, 100%);
}

.error-controls,
.status-filter,
.toolbar-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--h0n-ui-spacing-xs);
}

.toolbar-content {
    justify-content: space-between;
}

.custom-error {
    padding: var(--h0n-ui-spacing-lg);
    color: var(--h0n-ui-color-danger-text);
    text-align: center;
}
</style>
