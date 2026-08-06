<script setup lang="ts">
import { H0InputOTP } from '@h0nio/ui';
import { ref } from 'vue';
const code = ref('')
</script>
<template>
    <H0InputOTP
        v-model="code"
        label="Verification code"
        :length="6"
        validation="numeric"
        hint="Enter the six-digit code."
    />
</template>
