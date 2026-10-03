<script setup lang="ts">
import DocumentationPreviewActions from '@/components/documentation/DocumentationPreviewActions.vue'
import { H0Button, H0TextShimmer, useH0Animation } from '@h0nio/ui'
const motion = useH0Animation()
</script>
<template>
    <div class="text-shimmer-basic-example">
        <div class="text-shimmer-labels">
            <H0TextShimmer>Thinking...</H0TextShimmer>
            <H0TextShimmer>Processing</H0TextShimmer>
            <H0TextShimmer>Streaming</H0TextShimmer>
        </div>
        <DocumentationPreviewActions>
            <H0Button variant="outline" size="sm" @click="motion.setPreference('high')">Preview High</H0Button>
            <H0Button variant="outline" size="sm" @click="motion.setPreference('off')">Turn motion off</H0Button>
        </DocumentationPreviewActions>
        <span class="text-shimmer-quality">Effective motion: {{ motion.quality.value }}</span>
    </div>
</template>
<style scoped>
.text-shimmer-basic-example { display: grid; gap: var(--h0n-ui-spacing-xl); }
.text-shimmer-labels { display: flex; flex-wrap: wrap; align-items: center; gap: var(--h0n-ui-spacing-xl); }
.text-shimmer-labels { font-size: 1.25rem; font-weight: var(--h0n-ui-font-weight-medium); }
.text-shimmer-quality { color: var(--h0n-ui-color-text-secondary); }
</style>
