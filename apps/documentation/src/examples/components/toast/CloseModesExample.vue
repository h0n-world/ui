<script setup lang="ts">
import { H0Button, H0Toasts, createH0ToastService, type H0ToastCloseMode } from '@h0nio/ui'
import { onBeforeUnmount } from 'vue'

const toast = createH0ToastService({ placement: 'top-end' })
const modes: H0ToastCloseMode[] = ['button', 'toast', 'container']
function show(mode: H0ToastCloseMode) { toast.show({ title: `${mode} close mode`, description: mode === 'button' ? 'Use the close button.' : 'Click the notification to dismiss it.', duration: 5000, closeMode: mode }) }
onBeforeUnmount(() => toast.dispose())
</script>

<template><div class="toast-actions"><H0Button v-for="mode in modes" :key="mode" size="sm" variant="soft" @click="show(mode)">{{ mode }}</H0Button><H0Toasts :service="toast" /></div></template>

<style scoped>
.toast-actions { display: flex; flex-wrap: wrap; gap: var(--h0n-ui-spacing-sm); justify-content: center; }
</style>
