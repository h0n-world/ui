<script setup lang="ts">
import { H0Container, H0Divider, H0Inline, H0Spacer, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Container class="layout-example" size="md" :gutter="{ base: 'sm', md: 'lg' }">
        <H0Stack :gap="{ base: 'sm', md: 'lg' }">
            <H0Inline :gap="{ base: 'xs', md: 'md' }" wrap>
                <div v-for="item in 3" :key="item" class="layout-example__tile">Block {{ item }}</div>
            </H0Inline>
            <H0Divider>Responsive spacing</H0Divider>
            <section class="layout-example__surface">
                <strong>Semantic box</strong>
                <H0Spacer size="xs" />
                <span>Spacing is driven by public H0N tokens.</span>
            </section>
        </H0Stack>
    </H0Container>
</template>

<style scoped>
.layout-example { width: 100%; }
.layout-example__tile, .layout-example__surface { background: var(--h0n-ui-color-surface); border: 1px solid var(--h0n-ui-color-border); border-radius: var(--h0n-ui-radius-md); padding: var(--h0n-ui-spacing-md); }
.layout-example__surface { display: grid; }
.layout-example__surface span { color: var(--h0n-ui-color-muted); }
</style>
