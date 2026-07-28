<script setup lang="ts">
import { H0Badge, H0Button, H0Card } from '@h0nio/ui'
</script>

<template>
    <H0Card class="card-example" as="article" padding>
        <template #header><h3>Billing plan</h3><H0Badge tone="success">Active</H0Badge></template>
        <template #description>Manage the workspace subscription and renewal state.</template>
        <div class="plan"><strong>Team Pro</strong><span>$29 per seat / month</span></div>
        <template #footer><H0Button size="sm">Manage</H0Button><H0Button size="sm" variant="ghost">Cancel</H0Button></template>
    </H0Card>
</template>

<style scoped>
.card-example { max-width: 38rem; }
.card-example h3 { font: inherit; margin: 0; }
.plan { display: grid; gap: var(--h0n-ui-spacing-xs); }
.plan strong { font-size: var(--h0n-ui-typography-h4-size); }
.plan span { color: var(--h0n-ui-color-muted); }
</style>
