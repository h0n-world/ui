<script setup lang="ts">
import { H0Button } from '@h0nio/ui'
</script>

<template>
    <div class="sizes-example">
        <H0Button size="sm">Small</H0Button>
        <H0Button size="md">Medium</H0Button>
        <H0Button size="lg">Large</H0Button>
    </div>
</template>

<style scoped>
.sizes-example {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-md);
    justify-content: center;
}

@container documentation-preview (max-width: 520px) {
    .sizes-example {
        flex-direction: column;
        flex-wrap: nowrap;
    }
}
</style>
