<script setup lang="ts">
import { H0Button, H0Tooltip } from '@h0nio/ui'
</script>

<template>
    <H0Tooltip content="Copies the project URL" placement="top" :open-delay="100">
        <template #trigger="{ triggerAttrs }">
            <H0Button v-bind="triggerAttrs">Hover or focus</H0Button>
        </template>
    </H0Tooltip>
</template>
