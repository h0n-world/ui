<script setup lang="ts">
import { H0Description } from '@h0nio/ui'
</script>

<template>
    <div class="description-stack">
        <div>
            <strong>Paragraph, body small</strong>
            <H0Description>Supporting text below a field or card.</H0Description>
        </div>
        <div>
            <strong>Paragraph, body extra small</strong>
            <H0Description variant="body-xs">Compact secondary metadata.</H0Description>
        </div>
        <div><strong>Inline</strong> <H0Description as="span">Muted inline context.</H0Description></div>
        <div>
            <strong>Neutral block with numeric text</strong>
            <H0Description as="div" :text="42" />
        </div>
    </div>
</template>

<style scoped>
.description-stack,
.description-stack > div {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
}

.description-stack {
    max-width: 32rem;
    width: 100%;
}
</style>
