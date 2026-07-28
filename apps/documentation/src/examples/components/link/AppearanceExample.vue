<script setup lang="ts">
import { H0Link, H0Stack } from '@h0nio/ui'

const tones = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
    <H0Stack gap="md" align="start">
        <H0Link v-for="tone in tones" :key="tone" href="#link-appearance" :tone="tone">{{ tone }} link</H0Link>
        <H0Link href="#link-appearance" variant="subtle">Subtle link</H0Link>
        <H0Link href="#link-appearance" variant="standalone" size="lg">Standalone large link</H0Link>
    </H0Stack>
</template>
