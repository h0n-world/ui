<script setup lang="ts">
import { H0Button, H0Toasts, createH0ToastService, type H0ToastPlacement } from '@h0nio/ui'
import { onBeforeUnmount } from 'vue'

const toast = createH0ToastService()
const placements: H0ToastPlacement[] = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end']

function show(placement: H0ToastPlacement) {
    toast.show({
        title: placement,
        description: `The stack is now placed at ${placement}.`,
        duration: 2800,
        placement,
    })
}

onBeforeUnmount(() => toast.dispose())
</script>

<template>
    <div class="placement-example">
        <H0Button v-for="placement in placements" :key="placement" size="sm" variant="soft" @click="show(placement)">{{ placement }}</H0Button>
        <H0Toasts :service="toast" :max-visible="3" />
    </div>
</template>

<style scoped>
.placement-example {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
    justify-content: center;
}
</style>
