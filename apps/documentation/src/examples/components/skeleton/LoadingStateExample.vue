<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Card, H0Skeleton, H0Typography } from '@h0nio/ui'

const loading = ref(true)
</script>

<template>
    <div class="loading-example">
        <H0Button size="sm" variant="soft" @click="loading = !loading">{{ loading ? 'Show content' : 'Show loading state' }}</H0Button>

        <div class="content-region" :aria-busy="loading">
            <div v-if="loading" class="content-skeleton" role="status" aria-label="Loading release summary">
                <H0Skeleton height="7rem" radius="var(--h0n-ui-radius-xl)" />
                <H0Skeleton width="62%" height="1.25rem" />
                <H0Skeleton variant="text" width="100%" />
                <H0Skeleton variant="text" width="78%" />
            </div>

            <H0Card v-else padding>
                <template #header>Release summary</template>
                <template #description>The component tree is ready and the final content occupies the same region.</template>
                <H0Typography variant="body-sm">No major layout shift occurs when the placeholders are replaced.</H0Typography>
            </H0Card>
        </div>
    </div>
</template>

<style scoped>
.loading-example,
.content-skeleton {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
}

.loading-example {
    justify-items: start;
    width: min(30rem, 100%);
}

.content-region {
    width: 100%;
}
</style>
