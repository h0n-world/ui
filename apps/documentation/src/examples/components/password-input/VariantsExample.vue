<script setup lang="ts">
import { H0PasswordInput } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0PasswordInput variant="surface" label="Surface password" default-value="secret" />
        <H0PasswordInput variant="secondary" label="Secondary password" default-value="secret" />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
