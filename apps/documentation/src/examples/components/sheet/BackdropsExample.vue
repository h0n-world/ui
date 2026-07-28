<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Inline, H0Sheet, type H0SheetBackdrop } from '@h0nio/ui'

const backdrops: H0SheetBackdrop[] = ['opaque', 'blur', 'transparent']
const open = ref(false)
const activeBackdrop = ref<H0SheetBackdrop>('opaque')

function show(backdrop: H0SheetBackdrop) {
    activeBackdrop.value = backdrop
    open.value = true
}
</script>

<template>
    <H0Inline gap="sm" justify="center">
        <H0Button v-for="backdrop in backdrops" :key="backdrop" variant="soft" @click="show(backdrop)">{{ backdrop }}</H0Button>
    </H0Inline>

    <H0Sheet v-model="open" :backdrop="activeBackdrop" :aria-label="`${activeBackdrop} backdrop sheet`">
        <strong>{{ activeBackdrop }} backdrop</strong>
        <p>The current sheet uses the {{ activeBackdrop }} backdrop treatment.</p>
        <H0Button @click="open = false">Done</H0Button>
    </H0Sheet>
</template>
