<script setup lang="ts">
import { computed, ref } from 'vue'
import { H0Button, H0Card, H0Description, H0InfiniteScroll } from '@h0nio/ui'

const allItems = Array.from({ length: 18 }, (_, index) => `Viewport item ${index + 1}`)
const items = ref(allItems.slice(0, 4))
const loading = ref(false)
const disabled = ref(false)
const requestCount = ref(0)
const hasMore = computed(() => items.value.length < allItems.length)

async function loadMore() {
    if (loading.value || disabled.value || !hasMore.value) return

    requestCount.value += 1
    loading.value = true
    await new Promise((resolve) => window.setTimeout(resolve, 450))
    items.value.push(...allItems.slice(items.value.length, items.value.length + 4))
    loading.value = false
}
</script>

<template>
    <div class="viewport-example">
        <div class="viewport-controls">
            <H0Description as="span">Viewport observer · {{ requestCount }} load requests</H0Description>
            <H0Button size="sm" variant="soft" @click="disabled = !disabled">{{ disabled ? 'Resume observation' : 'Pause observation' }}</H0Button>
        </div>

        <H0InfiniteScroll
            root="viewport"
            root-margin="0px 0px 20% 0px"
            :threshold="0.5"
            :loading="loading"
            :disabled="disabled"
            :has-more="hasMore"
            loading-text="Loading viewport items"
            @load="loadMore"
        >
            <div class="viewport-items">
                <H0Card v-for="item in items" :key="item" padding>{{ item }}</H0Card>
            </div>

            <template #complete>Viewport feed complete</template>
        </H0InfiniteScroll>
    </div>
</template>

<style scoped>
.viewport-example {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(42rem, 100%);
}

.viewport-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--h0n-ui-spacing-sm);
}

.viewport-items {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--h0n-ui-spacing-sm);
}

@media (max-width: 40rem) {
    .viewport-items {
        grid-template-columns: 1fr;
    }
}
</style>
