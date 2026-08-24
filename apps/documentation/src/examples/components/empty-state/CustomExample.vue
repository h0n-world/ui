<script setup lang="ts">
import searchIcon from '@h0nio/icons/search'
import { H0Button, H0EmptyState, H0Icon, H0Typography } from '@h0nio/ui'
</script>

<template>
    <H0EmptyState class="empty-example" variant="inline">
        <template #visual>
            <div class="illustration" aria-hidden="true">
                <H0Icon :icon="searchIcon" :size="32" />
            </div>
        </template>
        <template #title>
            <H0Typography as="h3" variant="h4">No search results</H0Typography>
        </template>
        <template #description>
            <H0Typography as="p" variant="body-sm" color="muted">Try a shorter query or remove one of the active filters.</H0Typography>
        </template>
        <template #actions>
            <H0Button size="sm" variant="soft">Clear filters</H0Button>
        </template>
    </H0EmptyState>
</template>

<style scoped>
.empty-example {
    width: min(38rem, 100%);
}

.illustration {
    align-items: center;
    background: var(--h0n-ui-color-secondary);
    border-radius: 50%;
    color: var(--h0n-ui-color-muted);
    display: flex;
    height: 5rem;
    justify-content: center;
    width: 5rem;
}
</style>
