<script setup lang="ts">
import { H0NumberInput } from '@h0nio/ui'
import { ref } from 'vue'

const price = ref<number | null>(1299.5)
const percent = ref<number | null>(0.25)
</script>

<template>
    <div class="stack">
        <H0NumberInput
            v-model="price"
            label="Budget"
            locale="en-US"
            :precision="2"
            :format-options="{ style: 'currency', currency: 'USD' }"
            :step="50"
        />
        <H0NumberInput
            v-model="percent"
            label="Discount"
            :min="0"
            :max="1"
            :step="0.05"
            :parse="(raw) => Number(raw.replace('%', '')) / 100"
            :format="(value) => `${Math.round(value * 100)}%`"
        />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
