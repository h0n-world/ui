<script setup lang="ts">
import { H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Stack class="stack-example" as="section" :gap="{ base: 'sm', md: 'lg' }">
        <article v-for="(title, index) in ['Account details', 'Notifications', 'Security']" :key="title" class="stack-example__item">
            <span class="stack-example__index">{{ index + 1 }}</span>
            <span>{{ title }}</span>
        </article>
    </H0Stack>
</template>

<style scoped>
.stack-example {
    width: 100%;
}

.stack-example__item {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-lg);
    display: flex;
    gap: var(--h0n-ui-spacing-sm);
    padding: var(--h0n-ui-spacing-md);
}

.stack-example__index {
    align-items: center;
    background: var(--h0n-ui-color-secondary);
    border-radius: var(--h0n-ui-radius-round);
    display: inline-flex;
    height: 28px;
    justify-content: center;
    width: 28px;
}
</style>
