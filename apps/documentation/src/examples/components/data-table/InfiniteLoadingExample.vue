<script setup lang="ts">
import { computed, ref } from 'vue'
import { H0DataTable, H0Description, type H0DataTableColumn, type H0TableRowKey } from '@h0nio/ui'

type Activity = { id: number; action: string; actor: string }

const totalRows = 40
const batchSize = 8
const columns: H0DataTableColumn<Activity>[] = [
    { key: 'action', label: 'Activity', minWidth: 220 },
    { key: 'actor', label: 'Actor', minWidth: 140 },
]

const rows = ref(createRows(0, 16))
const loading = ref(false)
const hasMore = computed(() => rows.value.length < totalRows)

function createRows(start: number, count: number): Activity[] {
    return Array.from({ length: Math.min(count, totalRows - start) }, (_, index) => ({
        id: start + index + 1,
        action: `Activity event ${start + index + 1}`,
        actor: index % 2 ? 'Automation' : 'Operations',
    }))
}

function getActivityKey(row: Activity): H0TableRowKey {
    return row.id
}

async function loadMore() {
    if (loading.value || !hasMore.value) return

    loading.value = true
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    rows.value.push(...createRows(rows.value.length, batchSize))
    loading.value = false
}
</script>

<template>
    <div class="infinite-example">
        <H0Description>Scroll near the end to request the next chunk.</H0Description>
        <H0DataTable
            :columns="columns"
            :rows="rows"
            :get-row-key="getActivityKey"
            pagination-mode="infinite"
            :has-more="hasMore"
            :loading="loading"
            scroll-height="18rem"
            min-width="30rem"
            aria-label="Activity stream"
            @load-more="loadMore"
        />
        <output aria-live="polite">Loaded {{ rows.length }} of {{ totalRows }} rows<span v-if="!hasMore"> · Complete</span></output>
    </div>
</template>

<style scoped>
.infinite-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(44rem, 100%);
}

output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
