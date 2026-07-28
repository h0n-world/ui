<script setup lang="ts">
import { settingsIcon, userIcon } from '@h0nio/ui/icons'
import { H0Stepper, type H0StepperItem } from '@h0nio/ui'

const steps: H0StepperItem[] = [
    { label: 'Profile', description: 'Add account details', icon: userIcon },
    { label: 'Preferences', description: 'Configure workspace defaults', icon: settingsIcon },
    { label: 'Finish', description: 'Review and create the workspace' },
]
</script>

<template>
    <H0Stepper class="stepper" :items="steps" :step="2" orientation="vertical" size="lg" aria-label="Account setup progress" />
</template>

<style scoped>
.stepper {
    max-width: 28rem;
}
</style>
