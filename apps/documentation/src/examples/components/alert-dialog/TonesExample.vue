<script setup lang="ts">
import { ref } from 'vue'
import { H0AlertDialog, H0Button, H0Inline, type H0AlertDialogTone, type H0ButtonTone } from '@h0nio/ui'

type ToneExample = {
    tone: H0AlertDialogTone
    buttonTone: H0ButtonTone
    title: string
    text: string
    confirmText: string
}

const examples: ToneExample[] = [
    {
        tone: 'info',
        buttonTone: 'primary',
        title: 'Continue to checkout?',
        text: 'You can review delivery and payment details on the next step.',
        confirmText: 'Continue',
    },
    {
        tone: 'success',
        buttonTone: 'success',
        title: 'Publish this release?',
        text: 'All required checks passed and the release is ready to publish.',
        confirmText: 'Publish',
    },
    {
        tone: 'warning',
        buttonTone: 'warning',
        title: 'Replace saved settings?',
        text: 'Your current settings will be replaced by the selected preset.',
        confirmText: 'Replace',
    },
    {
        tone: 'danger',
        buttonTone: 'danger',
        title: 'Delete project?',
        text: 'This action cannot be undone.',
        confirmText: 'Delete',
    },
]

const open = ref(false)
const activeExample = ref<ToneExample>(examples[0])

function show(example: ToneExample) {
    activeExample.value = example
    open.value = true
}
</script>

<template>
    <H0Inline gap="sm" justify="center">
        <H0Button v-for="example in examples" :key="example.tone" :tone="example.buttonTone" variant="soft" @click="show(example)">{{ example.tone }}</H0Button>
    </H0Inline>

    <H0AlertDialog v-model="open" :tone="activeExample.tone" :title="activeExample.title" :text="activeExample.text" :confirm-text="activeExample.confirmText" @confirm="open = false" />
</template>
