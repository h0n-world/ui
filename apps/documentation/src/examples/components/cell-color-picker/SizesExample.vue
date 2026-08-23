<script setup lang="ts">
import { H0CellColorPicker, H0Inline } from '@h0nio/ui'
</script>

<template>
    <H0Inline align="center" gap="sm" wrap>
        <H0CellColorPicker default-value="#06B6D4" display="minimal" size="sm" aria-label="Small color" />
        <H0CellColorPicker default-value="#06B6D4" display="minimal" size="md" aria-label="Medium color" />
        <H0CellColorPicker default-value="#06B6D4" display="minimal" size="lg" aria-label="Large color" />
    </H0Inline>
</template>
