<script setup lang="ts">
import { ref } from 'vue'
import { H0AlertDialog, H0Button, H0Inline, type H0AlertDialogBackdrop } from '@h0nio/ui'

const backdrops: H0AlertDialogBackdrop[] = ['opaque', 'blur', 'transparent']
const open = ref(false)
const activeBackdrop = ref<H0AlertDialogBackdrop>('opaque')

function show(backdrop: H0AlertDialogBackdrop) {
    activeBackdrop.value = backdrop
    open.value = true
}
</script>

<template>
    <H0Inline gap="sm" justify="center">
        <H0Button v-for="backdrop in backdrops" :key="backdrop" variant="soft" @click="show(backdrop)">{{ backdrop }}</H0Button>
    </H0Inline>

    <H0AlertDialog v-model="open" :backdrop="activeBackdrop" tone="info" :title="`${activeBackdrop} backdrop`" text="Backdrop clicks do not dismiss an alert dialog. Choose Cancel, Confirm, Close, or press Escape." confirm-text="Confirm" />
</template>
