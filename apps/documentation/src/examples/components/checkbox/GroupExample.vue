<script setup lang="ts">
import { H0CheckboxGroup, type H0CheckboxOption } from '@h0nio/ui'
import { ref } from 'vue'

const channels = ref<string[]>(['email'])
const options: H0CheckboxOption[] = [
    { label: 'Email', value: 'email' },
    { label: 'Push notifications', value: 'push' },
    { label: 'SMS', value: 'sms', disabled: true },
]
</script>

<template>
    <div class="stack">
        <H0CheckboxGroup v-model="channels" :options="options" label="Notification channels" hint="Choose any number of channels." name="channels" />
        <output>Selected: {{ channels.join(', ') || 'none' }}</output>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(30rem, 100%);
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
