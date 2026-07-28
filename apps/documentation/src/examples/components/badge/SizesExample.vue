<script setup lang="ts">
import { H0Badge } from '@h0nio/ui'
</script>

<template>
    <div class="badge-row">
        <H0Badge size="sm" tone="primary">Small</H0Badge>
        <H0Badge size="md" tone="primary" text="Medium" />
        <H0Badge size="sm" tone="success" dot>Online</H0Badge>
    </div>
</template>

<style scoped>
.badge-row { align-items: center; display: flex; flex-wrap: wrap; gap: var(--h0n-ui-spacing-sm); justify-content: center; }
</style>
