<script setup lang="ts">
import { H0PasswordInput } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0PasswordInput
            model-value="short"
            label="Weak password"
            :strength="1"
            autocomplete="new-password"
        />
        <H0PasswordInput
            model-value="longer-password"
            label="Custom strength labels"
            :strength="3"
            :strength-labels="['None', 'Low', 'Fair', 'Good', 'Excellent']"
        />
        <H0PasswordInput
            model-value="invalid"
            label="Invalid password"
            error="Use at least 12 characters."
        />
        <H0PasswordInput label="Disabled" disabled />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
