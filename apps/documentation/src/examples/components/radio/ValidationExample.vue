<script setup lang="ts">
import { H0Button, H0RadioGroup, type H0RadioOption, type H0RadioValue } from '@h0nio/ui'
import { ref } from 'vue'

const value = ref<H0RadioValue | null>(null)
const group = ref<InstanceType<typeof H0RadioGroup> | null>(null)
const options: H0RadioOption[] = [
    { title: 'Standard', value: 'standard' },
    { title: 'Express', value: 'express', price: '$12' },
]
</script>

<template>
    <div class="stack">
        <H0RadioGroup ref="group" v-model="value" :options="options" label="Delivery method" variant="cards" :columns="2" required />
        <H0Button @click="group?.validate()">Validate selection</H0Button>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(36rem, 100%);
}
</style>
