<script setup lang="ts">
import { H0Message } from '@h0nio/ui'
</script>

<template>
    <div class="message-stack">
        <H0Message text="Additional information is available." />
        <H0Message tone="success">Changes saved successfully.</H0Message>
        <H0Message tone="warning">Review this value before continuing.</H0Message>
        <H0Message tone="error">The action could not be completed.</H0Message>
        <H0Message :icon="false">Neutral message without an icon.</H0Message>
    </div>
</template>

<style scoped>
.message-stack {
    align-items: start;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(34rem, 100%);
}
</style>
