<script setup lang="ts">
import { H0Button } from '@h0nio/ui'
</script>

<template>
    <div class="states-example">
        <H0Button disabled>Disabled</H0Button>
        <H0Button tone="primary" loading>Loading</H0Button>
        <H0Button tone="primary" loading loading-text="Saving" />
        <H0Button button-type="onlyIcon" tone="primary" loading aria-label="Saving" />
    </div>
</template>

<style scoped>
.states-example {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-md);
    justify-content: center;
}

@container documentation-preview (max-width: 520px) {
    .states-example {
        flex-direction: column;
        flex-wrap: nowrap;
    }
}
</style>
