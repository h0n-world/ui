<script setup lang="ts">
import { H0Button, H0InputOTP } from '@h0nio/ui'
import { ref } from 'vue'

const code = ref('')
const status = ref('')
const input = ref<InstanceType<typeof H0InputOTP> | null>(null)
const validate = (value: string) => value === '2048' || 'Use the demo code 2048.'
</script>

<template>
    <div class="stack">
        <H0InputOTP ref="input" v-model="code" :length="4" label="Manual verification" :auto-complete="false" :validator="validate" @complete="status = 'Code accepted'" @invalid="(_value, message) => (status = message)" />
        <H0Button @click="input?.confirm()">Verify code</H0Button>
        <output aria-live="polite">{{ status }}</output>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: start;
}
</style>
