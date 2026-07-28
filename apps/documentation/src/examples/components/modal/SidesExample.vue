<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Inline, H0Modal, type H0ModalSide } from '@h0nio/ui'

const sides: H0ModalSide[] = ['top', 'right', 'bottom', 'left']
const open = ref(false)
const activeSide = ref<H0ModalSide>('right')

function show(side: H0ModalSide) {
    activeSide.value = side
    open.value = true
}
</script>

<template>
    <H0Inline gap="sm" justify="center">
        <H0Button v-for="side in sides" :key="side" variant="soft" @click="show(side)">{{ side }}</H0Button>
    </H0Inline>

    <H0Modal v-model="open" :side="activeSide" :title="`${activeSide} modal`">
        <p>The modal is aligned with the {{ activeSide }} edge of the viewport.</p>
        <template #footer="{ close }">
            <H0Button @click="close">Done</H0Button>
        </template>
    </H0Modal>
</template>
