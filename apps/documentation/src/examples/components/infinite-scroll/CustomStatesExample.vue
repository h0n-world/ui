<script setup lang="ts">
import { H0Card, H0InfiniteScroll, H0Skeleton, H0Typography } from '@h0nio/ui'

const cards = ['Design review', 'Release notes', 'Incident report', 'Roadmap']
</script>

<template>
    <div class="state-grid">
        <section>
            <H0Typography as="p" variant="body-sm" :weight="600">Custom loading content</H0Typography>
            <H0InfiniteScroll loading loading-text="Loading more cards">
                <div class="cards">
                    <H0Card v-for="card in cards" :key="card" padding>{{ card }}</H0Card>
                </div>

                <template #loading>
                    <div class="skeletons">
                        <H0Skeleton height="18px" width="100%" />
                        <H0Skeleton height="18px" width="70%" />
                    </div>
                </template>
            </H0InfiniteScroll>
        </section>

        <section>
            <H0Typography as="p" variant="body-sm" :weight="600">Custom completion content</H0Typography>
            <H0InfiniteScroll :has-more="false">
                <div class="cards">
                    <H0Card v-for="card in cards.slice(0, 2)" :key="card" padding>{{ card }}</H0Card>
                </div>

                <template #complete>
                    <strong>You're all caught up</strong>
                </template>
            </H0InfiniteScroll>
        </section>
    </div>
</template>

<style scoped>
.state-grid,
.state-grid section {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(38rem, 100%);
}

.state-grid section {
    gap: var(--h0n-ui-spacing-sm);
}

.cards {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--h0n-ui-spacing-sm);
}

.skeletons {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: 100%;
    padding: var(--h0n-ui-spacing-md);
}

@media (max-width: 40rem) {
    .cards {
        grid-template-columns: 1fr;
    }
}
</style>
