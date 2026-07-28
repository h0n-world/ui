<script setup lang="ts">
import { plusIcon } from '@h0nio/ui/icons'
import { H0EmptyState, type H0EmptyStateVariant } from '@h0nio/ui'

const variants: Array<{ variant: H0EmptyStateVariant; title: string; description: string }> = [
    { variant: 'inline', title: 'No recent files', description: 'Files opened recently will appear here.' },
    { variant: 'surface', title: 'No saved views', description: 'Save the current filters to reuse this view.' },
    { variant: 'page', title: 'Workspace is empty', description: 'Create the first project to start collaborating.' },
]
</script>

<template>
    <div class="variant-grid">
        <H0EmptyState
            v-for="item in variants"
            :key="item.variant"
            :icon="plusIcon"
            :variant="item.variant"
            :class="{ 'empty-state-preview--page': item.variant === 'page' }"
            :title="item.title"
            :description="item.description"
        />
    </div>
</template>

<style scoped>
.variant-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: 100%;
}

.empty-state-preview--page {
    min-block-size: 20rem;
}
</style>
