<script setup lang="ts">
import { H0ImageUpload } from '@h0nio/ui'
</script>

<template>
    <div class="banner-preset-example">
        <div class="banner-preset-example__meta">
            <strong>Banner</strong>
            <span>Fluid artwork for headers and promotional areas.</span>
        </div>
        <H0ImageUpload preset="banner" label="Upload banner" />
    </div>
</template>

<style scoped>
.banner-preset-example,
.banner-preset-example__meta {
    display: grid;
}

.banner-preset-example {
    gap: var(--h0n-ui-spacing-lg);
    width: 100%;
}

.banner-preset-example__meta {
    gap: var(--h0n-ui-spacing-xs);
}

.banner-preset-example__meta span {
    color: var(--h0n-ui-color-muted);
}
</style>
