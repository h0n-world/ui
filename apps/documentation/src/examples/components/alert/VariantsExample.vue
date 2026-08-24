<script setup lang="ts">
import { H0Alert, type H0AlertVariant } from '@h0nio/ui'

const variants: H0AlertVariant[] = ['surface', 'secondary', 'outline']
</script>

<template>
    <div class="alert-stack">
        <H0Alert
            v-for="variant in variants"
            :key="variant"
            :variant="variant"
            :title="`${variant} alert`"
            text="Alert appearance can change independently from its semantic tone."
        />
    </div>
</template>

<style scoped>
.alert-stack {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(44rem, 100%);
}
</style>
