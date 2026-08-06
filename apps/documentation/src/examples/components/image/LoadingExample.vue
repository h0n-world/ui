<script setup lang="ts">
import { H0Image } from '@h0nio/ui';

const image = `https://th.bing.com/th/id/R.20ebe42d85d819696194c2ff332b81cb?rik=fM7nn7YZkEX92A&pid=ImgRaw&r=0`
</script>

<template>
    <div class="loading-example">
        <strong>Default loading skeleton</strong>
        <H0Image
            :src="image"
            alt="Abstract circular artwork"
            aspect-ratio="16 / 9"
            root-margin="-10000px"
        />
        <small>The preview is intentionally kept in its lazy waiting state.</small>
    </div>
</template>

<style scoped>
.loading-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    max-width: 36rem;
    width: 100%;
}

.loading-example small {
    color: var(--h0n-ui-color-muted);
}
</style>
