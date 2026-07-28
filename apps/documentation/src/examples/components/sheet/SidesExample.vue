<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Inline, H0Sheet, type H0SheetSide } from '@h0nio/ui'

const sides: H0SheetSide[] = ['top', 'right', 'bottom', 'left']
const open = ref(false)
const activeSide = ref<H0SheetSide>('bottom')

function show(side: H0SheetSide) {
    activeSide.value = side
    open.value = true
}
</script>

<template>
    <H0Inline gap="sm" justify="center">
        <H0Button v-for="side in sides" :key="side" variant="soft" @click="show(side)">{{ side }}</H0Button>
    </H0Inline>

    <H0Sheet v-model="open" :side="activeSide" :aria-label="`${activeSide} sheet`">
        <strong>{{ activeSide }} sheet</strong>
        <p>The sheet is inset from the {{ activeSide }} edge of the viewport.</p>
        <H0Button @click="open = false">Done</H0Button>
    </H0Sheet>
</template>
