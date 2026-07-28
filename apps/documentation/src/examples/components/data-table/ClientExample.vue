<script setup lang="ts">
import { computed, ref } from 'vue'
import { H0Badge, H0DataTable, type H0DataTableColumn, type H0DataTableFilters, type H0DataTableSelection, type H0DataTableSort, type H0TableRowKey } from '@h0nio/ui'

type Member = { id: number; name: string; team: 'core' | 'growth'; score: number; status: 'Active' | 'Paused' }

const columns: H0DataTableColumn<Member>[] = [
    { key: 'name', label: 'Name', minWidth: 170, sortable: true, filter: { type: 'text', placeholder: 'Search names' } },
    {
        key: 'team',
        label: 'Team',
        minWidth: 130,
        filter: {
            type: 'select',
            options: [
                { label: 'Core', value: 'core' },
                { label: 'Growth', value: 'growth' },
            ],
        },
    },
    { key: 'score', label: 'Score', minWidth: 100, sortable: true, align: 'right' },
    { key: 'status', label: 'Status', minWidth: 120 },
]

const rows: Member[] = Array.from({ length: 18 }, (_, index) => ({
    id: index + 1,
    name: `Member ${index + 1}`,
    team: index % 2 ? 'growth' : 'core',
    score: (index * 17) % 100,
    status: index % 5 ? 'Active' : 'Paused',
}))

const sort = ref<H0DataTableSort>(null)
const filters = ref<H0DataTableFilters>({})
const selection = ref<H0DataTableSelection>([])
const page = ref(1)
const activeFilters = computed(() => Object.values(filters.value).filter((value) => value !== null && value !== '').length)

function getMemberKey(row: Member): H0TableRowKey {
    return row.id
}

function isMemberSelectable(row: Member) {
    return row.status === 'Active'
}
</script>

<template>
    <div class="data-table-example">
        <H0DataTable
            v-model:sort="sort"
            v-model:filters="filters"
            v-model:selection="selection"
            v-model:page="page"
            :columns="columns"
            :rows="rows"
            :get-row-key="getMemberKey"
            :is-row-selectable="isMemberSelectable"
            pagination-mode="page"
            :page-size="6"
            selection-mode="multiple"
            min-width="42rem"
            aria-label="Team directory"
        >
            <template #cell-status="{ value }">
                <H0Badge :tone="value === 'Active' ? 'success' : 'warning'" size="sm">{{ value }}</H0Badge>
            </template>
        </H0DataTable>

        <output aria-live="polite">Page {{ page }} · {{ selection.length }} selected · {{ activeFilters }} active filters · Sort: {{ sort ? `${sort.key} ${sort.direction}` : 'none' }}</output>
    </div>
</template>

<style scoped>
.data-table-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(52rem, 100%);
}

output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
