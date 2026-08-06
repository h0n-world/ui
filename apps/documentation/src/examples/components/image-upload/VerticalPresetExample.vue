<script setup lang="ts">
import { H0ImageUpload } from '@h0nio/ui'
</script>

<template>
    <div class="vertical-preset-example">
        <div class="vertical-preset-example__meta">
            <strong>Vertical</strong>
            <span>Portrait artwork, posters, and tall covers.</span>
        </div>
        <H0ImageUpload preset="vertical" label="Upload vertical cover" />
    </div>
</template>

<style scoped>
.vertical-preset-example,
.vertical-preset-example__meta {
    display: grid;
    justify-items: center;
    text-align: center;
}

.vertical-preset-example {
    gap: var(--h0n-ui-spacing-lg);
    width: 100%;
}

.vertical-preset-example__meta {
    gap: var(--h0n-ui-spacing-xs);
}

.vertical-preset-example__meta span {
    color: var(--h0n-ui-color-muted);
}
</style>
