<script setup lang="ts">
import { H0Toast, type H0ToastTone } from '@h0nio/ui'

const toasts: Array<{ tone: H0ToastTone; title: string; description: string }> = [
    { tone: 'default', title: 'Draft saved', description: 'Your changes are stored locally.' },
    { tone: 'info', title: 'Update available', description: 'Refresh when you are ready to use it.' },
    { tone: 'success', title: 'File uploaded', description: 'The document is ready to share.' },
    { tone: 'warning', title: 'Storage almost full', description: 'Remove unused files to continue.' },
    { tone: 'danger', title: 'Upload failed', description: 'Check your connection and try again.' },
]
</script>

<template><div class="toast-stack"><H0Toast v-for="toast in toasts" :key="toast.tone" class="toast-preview" :tone="toast.tone" :title="toast.title" :description="toast.description" :closable="false" /></div></template>

<style scoped>
.toast-stack { display: grid; gap: var(--h0n-ui-spacing-sm); justify-items: center; width: 100%; }
.toast-preview { min-width: 0; width: min(26rem, 100%); }
</style>
