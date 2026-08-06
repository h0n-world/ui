<script setup lang="ts">
import { H0Segment, H0Stack, type H0SegmentItem, type H0SegmentVariant } from '@h0nio/ui'

const items: H0SegmentItem[] = [
    { label: 'List', value: 'list' },
    { label: 'Board', value: 'board' },
    { label: 'Timeline', value: 'timeline' },
]
const variants: H0SegmentVariant[] = ['default', 'secondary', 'outline', 'ghost']
</script>

<template>
    <H0Stack gap="lg" align="start">
        <H0Segment v-for="variant in variants" :key="variant" :items="items" default-value="list" :variant="variant" :aria-label="`${variant} view`" />
    </H0Stack>
</template>
