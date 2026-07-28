<script setup lang="ts">
import { H0ImageUpload } from '@h0nio/ui'
</script>

<template>
    <div class="states">
        <H0ImageUpload preset="avatar" label="Loading" loading />
        <H0ImageUpload preset="avatar" label="Disabled" disabled />
        <H0ImageUpload preset="custom" :width="240" :height="140" radius="16px" fit="contain" label="Custom frame" error="Choose a valid product image." />
    </div>
</template>

<style scoped>
.states {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    gap: var(--h0n-ui-spacing-xl);
}
</style>
