<script setup lang="ts">
import { H0Button } from '@h0nio/ui'
</script>

<template>
    <div class="links-example">
        <H0Button as="a" href="#accessibility" tone="primary">Read accessibility guidance</H0Button>
        <H0Button as="a" href="/components/overview" variant="outline">Component overview</H0Button>
    </div>
</template>

<style scoped>
.links-example {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-md);
    justify-content: center;
}

@container documentation-preview (max-width: 520px) {
    .links-example {
        align-items: center;
        flex-direction: column;
        flex-wrap: nowrap;
        text-align: center;
    }
}
</style>
