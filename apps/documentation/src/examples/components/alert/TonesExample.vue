<script setup lang="ts">
import { H0Alert, type H0AlertTone } from '@h0nio/ui'

const alerts: Array<{ tone: H0AlertTone; title: string; text: string }> = [
    { tone: 'default', title: 'Workspace updated', text: 'The latest settings are now available.' },
    { tone: 'info', title: 'Update available', text: 'Refresh when you are ready to use the new version.' },
    { tone: 'success', title: 'Deployment complete', text: 'The production release finished successfully.' },
    { tone: 'warning', title: 'Storage almost full', text: 'Remove unused files before the next upload.' },
    { tone: 'danger', title: 'Connection failed', text: 'Check the network and try again.' },
]
</script>

<template>
    <div class="alert-stack">
        <H0Alert v-for="alert in alerts" :key="alert.tone" :tone="alert.tone" :title="alert.title" :text="alert.text" />
    </div>
</template>

<style scoped>
.alert-stack {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(44rem, 100%);
}
</style>
