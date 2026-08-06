<script setup lang="ts">
import { H0InputOTP } from '@h0nio/ui';
import { ref } from 'vue';

const numeric = ref('')
const recovery = ref('')
</script>

<template>
    <div class="stack">
        <H0InputOTP v-model="numeric" label="Six-digit code" :length="6" variant="secondary" />
        <H0InputOTP
            v-model="recovery"
            label="Recovery code"
            :length="4"
            validation="alphanumeric"
            variant="surface"
            hint="Letters are normalized to uppercase."
        />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-xl);
}
</style>
