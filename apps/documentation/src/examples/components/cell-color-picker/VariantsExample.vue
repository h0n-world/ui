<script setup lang="ts">
import { H0CellColorPicker, H0Inline } from '@h0nio/ui'
</script>

<template>
    <H0Inline align="center" gap="sm" wrap>
        <H0CellColorPicker default-value="#3B82F6" display="minimal" variant="surface" aria-label="Surface color" />
        <H0CellColorPicker default-value="#A855F7" display="minimal" variant="secondary" aria-label="Secondary color" />
        <H0CellColorPicker default-value="#EC4899" display="minimal" variant="ghost" aria-label="Ghost color" />
    </H0Inline>
</template>
