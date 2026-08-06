<script setup lang="ts">
import { H0Stack, H0Stepper, type H0StepperItem, type H0StepperSize } from '@h0nio/ui'

const steps: H0StepperItem[] = [{ label: 'Account' }, { label: 'Workspace' }, { label: 'Complete' }]
const sizes: H0StepperSize[] = ['sm', 'md', 'lg']
</script>

<template>
    <H0Stack class="stepper-sizes" gap="2xl">
        <section v-for="size in sizes" :key="size" class="stepper-sizes__item">
            <strong>{{ size }}</strong>
            <H0Stepper :items="steps" :step="2" :size="size" :aria-label="`${size} progress`" />
        </section>
    </H0Stack>
</template>

<style scoped>
.stepper-sizes {
    width: 100%;
}

.stepper-sizes__item {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: 100%;
}
</style>
