<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Drawer, H0Inline, type H0DrawerSide } from '@h0nio/ui'

const sides: H0DrawerSide[] = ['top', 'right', 'bottom', 'left']
const open = ref(false)
const activeSide = ref<H0DrawerSide>('right')

function show(side: H0DrawerSide) {
    activeSide.value = side
    open.value = true
}
</script>

<template>
    <H0Inline gap="sm" justify="center">
        <H0Button v-for="side in sides" :key="side" variant="soft" @click="show(side)">{{ side }}</H0Button>
    </H0Inline>

    <H0Drawer v-model="open" :side="activeSide" :title="`${activeSide} drawer`">
        <p>The drawer enters from the {{ activeSide }} edge of the viewport.</p>
        <template #footer="{ close }">
            <H0Button @click="close">Done</H0Button>
        </template>
    </H0Drawer>
</template>
