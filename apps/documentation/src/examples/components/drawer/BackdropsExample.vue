<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Drawer, H0Inline, type H0DrawerBackdrop } from '@h0nio/ui'

const backdrops: H0DrawerBackdrop[] = ['opaque', 'blur', 'transparent']
const open = ref(false)
const activeBackdrop = ref<H0DrawerBackdrop>('opaque')

function show(backdrop: H0DrawerBackdrop) {
    activeBackdrop.value = backdrop
    open.value = true
}
</script>

<template>
    <H0Inline gap="sm" justify="center">
        <H0Button v-for="backdrop in backdrops" :key="backdrop" variant="soft" @click="show(backdrop)">{{ backdrop }}</H0Button>
    </H0Inline>

    <H0Drawer v-model="open" :backdrop="activeBackdrop" :title="`${activeBackdrop} backdrop`">
        <p>The current drawer uses the {{ activeBackdrop }} backdrop treatment.</p>
        <template #footer="{ close }">
            <H0Button @click="close">Done</H0Button>
        </template>
    </H0Drawer>
</template>
