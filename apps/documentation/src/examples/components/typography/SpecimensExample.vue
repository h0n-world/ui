<script setup lang="ts">
import { H0Typography, type H0TypographyVariant } from '@h0nio/ui'

const specimens: Array<{ variant: H0TypographyVariant; text: string }> = [
    { variant: 'h1', text: 'Build better interfaces' },
    { variant: 'h2', text: 'Built for the intelligence age' },
    { variant: 'h3', text: 'Pricing on your terms' },
    { variant: 'h4', text: 'Apply to the startup program' },
    { variant: 'h5', text: 'Card titles' },
    { variant: 'h6', text: 'Smaller feature headers' },
    { variant: 'body', text: 'Primary body text used across product interfaces.' },
    { variant: 'body-sm', text: 'Secondary content and compact metadata.' },
    { variant: 'body-xs', text: 'Captions and fine print.' },
    { variant: 'code', text: 'npm install @h0nio/ui' },
]
</script>

<template>
    <div class="type-stack">
        <div v-for="item in specimens" :key="item.variant">
            <code>{{ item.variant }}</code>
            <H0Typography :variant="item.variant" role="presentation">{{ item.text }}</H0Typography>
        </div>
    </div>
</template>

<style scoped>
.type-stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: 100%;
}

.type-stack > div {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
}

.type-stack code {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}
</style>
