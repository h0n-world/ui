<script setup lang="ts">
import { H0Container, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Stack gap="md">
        <H0Container v-for="size in ['sm', 'md', 'lg', 'xl', 'full'] as const" :key="size" class="container-preview" :size="size" gutter="md">
            <div class="container-preview__surface">{{ size }}</div>
        </H0Container>
    </H0Stack>
</template>

<style scoped>
.container-preview {
    width: 100%;
}
.container-preview__surface {
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    padding: var(--h0n-ui-spacing-md);
    text-align: center;
}
</style>
