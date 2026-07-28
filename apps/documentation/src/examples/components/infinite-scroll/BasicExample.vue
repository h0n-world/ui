<script setup lang="ts">
import { computed, ref } from 'vue'
import { H0InfiniteScroll, H0List, H0ListItem } from '@h0nio/ui'

const allItems = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    title: `Workflow event ${index + 1}`,
    detail: index % 2 ? 'Reviewer assigned' : 'Build completed',
}))

const items = ref(allItems.slice(0, 8))
const loading = ref(false)
const hasMore = computed(() => items.value.length < allItems.length)

async function loadMore() {
    if (loading.value || !hasMore.value) return

    loading.value = true
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    items.value.push(...allItems.slice(items.value.length, items.value.length + 6))
    loading.value = false
}
</script>

<template>
    <div class="basic-example">
        <div class="scroll-box" tabindex="0" aria-label="Workflow events">
            <H0InfiniteScroll :loading="loading" :has-more="hasMore" loading-text="Loading more workflow events" @load="loadMore">
                <H0List>
                    <H0ListItem v-for="item in items" :key="item.id" :title="item.title" :value="item.detail" />
                </H0List>

                <template #complete>All workflow events loaded</template>
            </H0InfiniteScroll>
        </div>

        <output aria-live="polite">Loaded {{ items.length }} of {{ allItems.length }} events</output>
    </div>
</template>

<style scoped>
.basic-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(36rem, 100%);
}

.scroll-box {
    max-height: 20rem;
    overflow: auto;
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-xl);
}

.scroll-box:focus-visible {
    box-shadow: var(--h0n-ui-focus-ring);
    outline: none;
}

output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
