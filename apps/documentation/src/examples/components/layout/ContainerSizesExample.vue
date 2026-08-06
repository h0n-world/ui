<script setup lang="ts">
import { H0Card, H0Container, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Stack class="container-sizes-example" gap="md">
        <H0Container
            v-for="size in ['sm', 'md', 'lg', 'xl', 'full'] as const"
            :key="size"
            :size="size"
            gutter="md"
        >
            <H0Card padding>
                {{ size }}
            </H0Card>
        </H0Container>
    </H0Stack>
</template>

<style scoped>
.container-sizes-example {
    width: 100%;
}
</style>
