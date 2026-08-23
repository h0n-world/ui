<script setup lang="ts">
import { H0Command, H0Inline, type H0CommandItem, type H0CommandVariant } from '@h0nio/ui'

const variants: H0CommandVariant[] = ['surface', 'secondary', 'ghost', 'outline']
const items: H0CommandItem[] = [
    { value: 'profile', label: 'Open profile', group: 'Navigation' },
    { value: 'settings', label: 'Open settings', group: 'Navigation' },
]
</script>

<template>
    <H0Inline align="center" gap="sm" wrap>
        <H0Command v-for="variant in variants" :key="variant" :items="items" :variant="variant" :trigger-label="variant" />
    </H0Inline>
</template>
