<script setup lang="ts">
import { H0Badge, H0Button, H0Container, H0Divider, H0Inline, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Container class="layout-composition" as="section" size="md" :gutter="{ base: 'sm', md: 'lg' }">
        <H0Stack :gap="{ base: 'md', md: 'lg' }">
            <H0Inline justify="between" gap="md">
                <H0Stack gap="xs">
                    <h3 class="layout-composition__title">Workspace members</h3>
                    <p class="layout-composition__description">Manage access without hand-written layout margins.</p>
                </H0Stack>

                <H0Button size="sm">Invite member</H0Button>
            </H0Inline>

            <H0Divider />

            <H0Stack gap="sm">
                <H0Inline v-for="member in ['Ada Lovelace', 'Grace Hopper']" :key="member" class="layout-composition__row" justify="between" gap="sm">
                    <span>{{ member }}</span>
                    <H0Badge tone="success">Active</H0Badge>
                </H0Inline>
            </H0Stack>
        </H0Stack>
    </H0Container>
</template>

<style scoped>
.layout-composition {
    width: 100%;
}

.layout-composition__title,
.layout-composition__description {
    margin: 0;
}

.layout-composition__description {
    color: var(--h0n-ui-color-muted);
}

.layout-composition__row {
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-lg);
    padding: var(--h0n-ui-spacing-md);
}
</style>
