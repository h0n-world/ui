<script setup lang="ts">
import { H0Link, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Stack gap="md" align="start">
        <H0Link href="#link-usage">Internal documentation</H0Link>
        <H0Link href="https://example.com" target="_blank" external>External resource</H0Link>
        <H0Link href="#link-usage" tone="danger" variant="standalone">Destructive destination</H0Link>
        <H0Link href="#link-usage" disabled>Unavailable destination</H0Link>
    </H0Stack>
</template>
