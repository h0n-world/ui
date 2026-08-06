<script setup lang="ts">
import { H0InputOTP } from '@h0nio/ui';
</script>

<template>
    <div class="example-stack">
        <H0InputOTP label="Small" size="sm" :length="4" />
        <H0InputOTP label="Medium" size="md" :length="4" />
        <H0InputOTP label="Large" size="lg" :length="4" />
    </div>
</template>

<style scoped>
.example-stack {
    display: grid;
    gap: 20px;
}
</style>
