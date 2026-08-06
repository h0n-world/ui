<script setup lang="ts">
import { H0PasswordInput } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0PasswordInput size="sm" label="Small password" default-value="secret" />
        <H0PasswordInput size="md" label="Medium password" default-value="secret" />
        <H0PasswordInput size="lg" label="Large password" default-value="secret" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
