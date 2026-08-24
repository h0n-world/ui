<script setup lang="ts">
import { H0Button, H0Inline, H0Sheet, type H0SheetBackdrop } from '@h0nio/ui'
import { ref } from 'vue'

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
        <H0Button
            v-for="backdrop in backdrops"
            :key="backdrop"
            variant="soft"
            @click="show(backdrop)"
            >{{ backdrop }}</H0Button
        >
    </H0Inline>

    <H0Sheet
        v-model="open"
        :backdrop="activeBackdrop"
        :aria-label="`${activeBackdrop} backdrop sheet`"
        :title="activeBackdrop"
    >
        <p>The current sheet uses the {{ activeBackdrop }} backdrop treatment.</p>
        <template #footer="{ close }">
            <H0Button @click="close">Done</H0Button>
        </template>
    </H0Sheet>
</template>
