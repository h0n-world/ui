<script setup lang="ts">
import { H0ButtonGroup } from '@h0nio/ui'
</script>

<template>
    <H0ButtonGroup tone="primary" aria-label="Document actions">
        <template #btn-1>Save</template>
        <template #btn-2>Save as</template>
        <template #btn-3>Export</template>
    </H0ButtonGroup>
</template>
