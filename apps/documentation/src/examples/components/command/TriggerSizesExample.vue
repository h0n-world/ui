<script setup lang="ts">
import { H0Command, H0Inline, type H0CommandItem, type H0CommandSize } from '@h0nio/ui'

const sizes: H0CommandSize[] = ['sm', 'md', 'lg']
const items: H0CommandItem[] = [{ value: 'action', label: 'Run action' }]
</script>

<template>
    <H0Inline align="center" gap="sm" wrap>
        <H0Command v-for="size in sizes" :key="size" :items="items" :size="size" :trigger-label="`${size} trigger`" />
    </H0Inline>
</template>
