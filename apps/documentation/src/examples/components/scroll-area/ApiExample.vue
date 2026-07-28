<script setup lang="ts">
import { H0Button, H0Inline, H0ScrollArea, H0Stack } from '@h0nio/ui'
import { ref } from 'vue'

const area = ref<{ scrollTo: (options: ScrollToOptions) => void; scrollBy: (options: ScrollToOptions) => void } | null>(null)
const boundary = ref('At the start')
</script>

<template>
    <H0Stack gap="md">
        <H0Inline gap="sm" wrap>
            <H0Button size="sm" @click="area?.scrollTo({ top: Number.MAX_SAFE_INTEGER, behavior: 'smooth' })">Scroll down</H0Button>
            <H0Button size="sm" variant="ghost" @click="area?.scrollTo({ top: 0, behavior: 'smooth' })">Back to start</H0Button>
        </H0Inline>
        <H0ScrollArea ref="area" class="scroll-area" :max-height="180" aria-label="Release history" @reach-start="boundary = 'Reached the start'" @reach-end="boundary = 'Reached the end'">
            <H0Stack class="content" gap="sm">
                <div v-for="item in 16" :key="item">Release {{ item }}</div>
            </H0Stack>
        </H0ScrollArea>
        <output aria-live="polite">{{ boundary }}</output>
    </H0Stack>
</template>

<style scoped>
.scroll-area {
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    width: min(32rem, 100%);
}
.content {
    padding: var(--h0n-ui-spacing-md);
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
