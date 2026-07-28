<script setup lang="ts">
import { H0Description, H0Table, H0Typography, type H0TableColumn } from '@h0nio/ui'

const columns: H0TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
]
</script>

<template>
    <div class="table-states">
        <section>
            <H0Typography as="p" variant="body-sm" :weight="600">Localized empty state</H0Typography>
            <H0Table :columns="columns" :rows="[]" bordered aria-label="Empty team directory" />
        </section>

        <section>
            <H0Typography as="p" variant="body-sm" :weight="600">Custom loading text</H0Typography>
            <H0Table :columns="columns" :rows="[]" loading loading-text="Loading team members" bordered aria-label="Loading team directory" />
        </section>

        <section>
            <H0Typography as="p" variant="body-sm" :weight="600">Custom empty slot</H0Typography>
            <H0Table :columns="columns" :rows="[]" bordered aria-label="Filtered team directory">
                <template #empty>
                    <div class="custom-empty">
                        <H0Description as="span">No members match the current filters.</H0Description>
                    </div>
                </template>
            </H0Table>
        </section>
    </div>
</template>

<style scoped>
.table-states {
    display: grid;
    gap: var(--h0n-ui-spacing-xl);
    width: min(42rem, 100%);
}

.table-states section {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
}

.custom-empty {
    display: grid;
    min-height: 100px;
    place-items: center;
    padding: var(--h0n-ui-spacing-xl);
}
</style>
