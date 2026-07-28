<script setup lang="ts">
import { H0Button } from '@h0nio/ui'
</script>

<template>
    <div class="full-width-example">
        <H0Button full-width tone="primary">Continue</H0Button>
        <H0Button full-width variant="soft">Save for later</H0Button>
    </div>
</template>

<style scoped>
.full-width-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    margin-inline: auto;
    width: min(440px, 100%);
}
</style>
