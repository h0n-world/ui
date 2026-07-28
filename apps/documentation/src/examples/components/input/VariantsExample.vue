<script setup lang="ts">
import { H0Input } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Input variant="surface" label="Surface" placeholder="Input on a neutral surface" />
        <H0Input
            variant="secondary"
            label="Secondary"
            placeholder="Input with stronger separation"
        />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
