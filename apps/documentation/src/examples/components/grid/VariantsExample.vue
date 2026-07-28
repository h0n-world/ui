<script setup lang="ts">
import { H0Card, H0Grid, H0Stack } from '@h0nio/ui'

const variants = ['vertical', 'three', 'center-wide', 'sidebar-left', 'sidebar-right'] as const
</script>

<template>
    <H0Stack gap="xl">
        <section v-for="variant in variants" :key="variant" class="example">
            <strong>{{ variant }}</strong>
            <H0Grid :variant="variant" gap="sm">
                <H0Card v-for="item in variant === 'vertical' ? 2 : variant === 'three' || variant === 'center-wide' ? 3 : 2" :key="item" class="panel">{{ item }}</H0Card>
            </H0Grid>
        </section>
    </H0Stack>
</template>

<style scoped>
.example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    min-width: 0;
}
.panel {
    align-items: center;
    display: flex;
    justify-content: center;
    min-block-size: 4rem;
}
</style>
