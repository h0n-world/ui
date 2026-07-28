<script setup lang="ts">
import { H0Textarea } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Textarea label="Read-only" model-value="This text remains selectable." readonly />
        <H0Textarea label="Disabled" model-value="Editing is unavailable." disabled />
        <H0Textarea label="Invalid description" model-value="Too short" error="Add at least 20 characters." />
        <H0Textarea label="Without spellcheck" :spellcheck="false" inputmode="text" hint="Useful for code or identifiers." />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(34rem, 100%);
}
</style>
