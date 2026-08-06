<script setup lang="ts">
import { H0Segment, H0Stack, type H0SegmentItem } from '@h0nio/ui'

const items: H0SegmentItem[] = [
    { label: 'List', value: 'list' },
    { label: 'Board', value: 'board' },
    { label: 'Timeline', value: 'timeline' },
]
</script>

<template>
    <H0Stack gap="lg" align="start">
        <H0Segment :items="items" default-value="list" size="sm" aria-label="Small view selector" />
        <H0Segment :items="items" default-value="list" size="md" aria-label="Medium view selector" />
        <H0Segment :items="items" default-value="list" size="lg" aria-label="Large view selector" />
    </H0Stack>
</template>
