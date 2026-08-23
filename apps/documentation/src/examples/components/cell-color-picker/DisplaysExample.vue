<script setup lang="ts">
import { H0CellColorPicker, H0Inline } from '@h0nio/ui'
</script>

<template>
    <H0Inline align="center" gap="md" wrap>
        <H0CellColorPicker default-value="#8B5CF6" label="Brand" />
        <H0CellColorPicker default-value="#F97316" display="minimal" aria-label="Highlight color" />
        <H0CellColorPicker default-value="#10B981" display="minimal" swatch-position="left" aria-label="Success color" />
    </H0Inline>
</template>
