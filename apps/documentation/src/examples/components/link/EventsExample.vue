<script setup lang="ts">
import { H0Link } from '@h0nio/ui'
import { ref } from 'vue'

const status = ref('No navigation yet')
</script>

<template>
    <div class="stack">
        <H0Link href="#link-events" @click.prevent="status = 'Enabled link clicked'" @focus="status = 'Link focused'">Interactive documentation link</H0Link>
        <H0Link href="#link-events" disabled @click="status = 'This event is not emitted'">Disabled destination</H0Link>
        <output aria-live="polite">{{ status }}</output>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: start;
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
