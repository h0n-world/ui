<script setup lang="ts">
import { H0Stack, H0Stepper, type H0StepperColor, type H0StepperItem } from '@h0nio/ui'

const steps: H0StepperItem[] = [{ label: 'Details' }, { label: 'Review' }, { label: 'Complete' }]
const colors: H0StepperColor[] = ['accent', 'success', 'warning', 'danger', 'inverted']
</script>

<template>
    <H0Stack class="stepper-colors" gap="xl">
        <H0Stepper v-for="color in colors" :key="color" :items="steps" :step="2" :color="color" :aria-label="`${color} progress`" />
    </H0Stack>
</template>

<style scoped>
.stepper-colors {
    width: 100%;
}
</style>
