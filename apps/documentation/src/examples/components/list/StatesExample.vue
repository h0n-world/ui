<script setup lang="ts">
import { H0Card, H0List, H0ListItem } from '@h0nio/ui'
import { ref } from 'vue'

const current = ref('overview')
</script>

<template>
    <H0Card class="list-card">
        <H0List label="Workspace sections" gap="sm" :divided="false">
            <H0ListItem title="Overview" value="Small" size="sm" :active="current === 'overview'" :aria-pressed="current === 'overview'" border-radius="12px" @click="current = 'overview'" />
            <H0ListItem title="Members" value="Medium" size="md" :active="current === 'members'" :aria-pressed="current === 'members'" border-radius="12px" @click="current = 'members'" />
            <H0ListItem title="Billing" description="Unavailable during maintenance" size="lg" disabled aria-pressed="false" border-radius="12px" />
            <H0ListItem title="Static information" description="Rendered as a non-interactive div" :interactive="false" border-radius="12px" />
        </H0List>
    </H0Card>
</template>

<style scoped>
.list-card {
    max-width: 38rem;
    padding: var(--h0n-ui-spacing-xs);
}
</style>
