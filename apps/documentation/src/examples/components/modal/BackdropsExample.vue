<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Inline, H0Modal, type H0ModalBackdrop } from '@h0nio/ui'

const backdrops: H0ModalBackdrop[] = ['opaque', 'blur', 'transparent']
const open = ref(false)
const activeBackdrop = ref<H0ModalBackdrop>('opaque')

function show(backdrop: H0ModalBackdrop) {
    activeBackdrop.value = backdrop
    open.value = true
}
</script>

<template>
    <H0Inline gap="sm" justify="center">
        <H0Button v-for="backdrop in backdrops" :key="backdrop" variant="soft" @click="show(backdrop)">{{ backdrop }}</H0Button>
    </H0Inline>

    <H0Modal v-model="open" :backdrop="activeBackdrop" :title="`${activeBackdrop} backdrop`">
        <p>The current modal uses the {{ activeBackdrop }} backdrop treatment.</p>
        <template #footer="{ close }">
            <H0Button @click="close">Done</H0Button>
        </template>
    </H0Modal>
</template>
