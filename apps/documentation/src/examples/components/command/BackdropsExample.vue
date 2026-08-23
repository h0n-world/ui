<script setup lang="ts">
import { H0Command, H0Inline, type H0CommandBackdrop, type H0CommandItem } from '@h0nio/ui'

const backdrops: H0CommandBackdrop[] = ['opaque', 'blur', 'transparent']
const items: H0CommandItem[] = [{ value: 'action', label: 'Run action' }]
</script>

<template>
    <H0Inline align="center" gap="sm" wrap>
        <H0Command v-for="backdrop in backdrops" :key="backdrop" :items="items" :backdrop="backdrop" :trigger-label="backdrop" />
    </H0Inline>
</template>
