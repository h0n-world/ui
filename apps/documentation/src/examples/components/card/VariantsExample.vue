<script setup lang="ts">
import { H0Card, type H0CardVariant } from '@h0nio/ui'

const variants: H0CardVariant[] = ['surface', 'secondary', 'outline']
</script>

<template>
    <div class="card-grid">
        <H0Card v-for="variant in variants" :key="variant" :variant="variant">
            <template #header>{{ variant }}</template>
            <template #description>Card surface using the {{ variant }} treatment.</template>
        </H0Card>
    </div>
</template>

<style scoped>
.card-grid { display: grid; gap: var(--h0n-ui-spacing-md); grid-template-columns: repeat(3, minmax(0, 1fr)); width: 100%; }
@media (max-width: 40rem) { .card-grid { grid-template-columns: 1fr; } }
</style>
