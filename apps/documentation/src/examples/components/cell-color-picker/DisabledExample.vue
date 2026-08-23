<script setup lang="ts">
import { H0CellColorPicker, H0Inline } from '@h0nio/ui'
</script>

<template>
    <H0Inline align="center" gap="sm" wrap>
        <H0CellColorPicker default-value="#64748B" label="Disabled color" disabled />
        <H0CellColorPicker default-value="#94A3B8" display="minimal" disabled aria-label="Disabled minimal color" />
    </H0Inline>
</template>
