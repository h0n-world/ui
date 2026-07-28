<script setup lang="ts">
import { H0Card, type H0CardRadiusCorner } from '@h0nio/ui'

const diagonalCorners: H0CardRadiusCorner[] = ['top-left', 'bottom-right']
</script>

<template>
    <div class="radius-grid">
        <H0Card variant="outline" radius="all">
            <template #header>All corners</template>
            <template #description>The default rounded shape.</template>
        </H0Card>
        <H0Card variant="outline" radius="none">
            <template #header>No corners</template>
            <template #description>A completely square surface.</template>
        </H0Card>
        <H0Card variant="outline" radius="top-left">
            <template #header>One corner</template>
            <template #description>Only the top-left corner is rounded.</template>
        </H0Card>
        <H0Card variant="outline" :radius="diagonalCorners">
            <template #header>Corner array</template>
            <template #description>Top-left and bottom-right are rounded.</template>
        </H0Card>
    </div>
</template>

<style scoped>
.radius-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
}

@container documentation-preview (max-width: 520px) {
    .radius-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
