<script setup lang="ts">
import { H0Segment, type H0SegmentItem } from '@h0nio/ui'
import { ref } from 'vue'

const period = ref('week')
const items: H0SegmentItem[] = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year', disabled: true },
]
</script>

<template>
    <div class="segment-example">
        <H0Segment v-model="period" :items="items" aria-label="Reporting period" />
        <output>Selected: {{ period }}</output>
    </div>
</template>

<style scoped>
.segment-example { align-items: center; display: grid; gap: var(--h0n-ui-spacing-md); justify-items: center; }
output { color: var(--h0n-ui-color-muted); }
</style>
