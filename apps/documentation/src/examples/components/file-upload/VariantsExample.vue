<script setup lang="ts">
import { H0FileUpload } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0FileUpload variant="surface" label="Surface" hint="Drop area on a neutral surface." />
        <H0FileUpload variant="secondary" label="Secondary" hint="Drop area with stronger separation." />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-xl);
    width: min(36rem, 100%);
}
</style>
