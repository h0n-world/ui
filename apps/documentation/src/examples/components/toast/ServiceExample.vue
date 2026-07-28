<script setup lang="ts">
import { H0Button, H0Toasts, createH0ToastService } from '@h0nio/ui'
import { onBeforeUnmount } from 'vue'

const toast = createH0ToastService({ placement: 'bottom-end' })
let updateTimer: ReturnType<typeof window.setTimeout> | undefined

function showUpload() {
    const id = toast.info({ title: 'Uploading file', description: 'Preparing archive.zip', duration: 8000 })
    updateTimer = window.setTimeout(() => toast.update(id, { tone: 'success', title: 'Upload complete', description: 'archive.zip is ready.', duration: 3200 }), 900)
}

onBeforeUnmount(() => {
    if (updateTimer) window.clearTimeout(updateTimer)
    toast.dispose()
})
</script>

<template><div class="toast-actions"><H0Button variant="soft" @click="showUpload">Upload file</H0Button><H0Button variant="ghost" @click="toast.dismissAll">Dismiss all</H0Button><H0Toasts :service="toast" :max-visible="3" /></div></template>

<style scoped>
.toast-actions { display: flex; flex-wrap: wrap; gap: var(--h0n-ui-spacing-sm); justify-content: center; }
</style>
