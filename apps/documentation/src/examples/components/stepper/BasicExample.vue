<script setup lang="ts">
import { H0Stepper, type H0StepperItem } from '@h0nio/ui'

const steps: H0StepperItem[] = [
    { label: 'Account', description: 'Contact details' },
    { label: 'Workspace', description: 'Team settings' },
    { label: 'Review', description: 'Confirm changes' },
    { label: 'Complete' },
]
</script>

<template>
    <H0Stepper :items="steps" :step="2" aria-label="Workspace setup progress" />
</template>
