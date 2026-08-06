<script setup lang="ts">
import { H0ImageUpload } from '@h0nio/ui';
</script>

<template>
    <div class="preset-example">
        <article class="preset-example__item">
            <div class="preset-example__meta">
                <strong>Avatar</strong>
                <span>Profile photos and account identities.</span>
            </div>
            <H0ImageUpload preset="avatar" label="Upload avatar" />
        </article>

        <article class="preset-example__item">
            <div class="preset-example__meta">
                <strong>Square</strong>
                <span>Cover art, products, and gallery tiles.</span>
            </div>
            <H0ImageUpload preset="square" label="Upload square cover" />
        </article>

        <article class="preset-example__item">
            <div class="preset-example__meta">
                <strong>Custom</strong>
                <span>Explicit dimensions and radius.</span>
            </div>
            <H0ImageUpload
                preset="custom"
                :width="180"
                :height="120"
                radius="16px"
                label="Upload custom image"
            />
        </article>
    </div>
</template>

<style scoped>
.preset-example {
    align-items: start;
    display: grid;
    gap: var(--h0n-ui-spacing-xl);
    grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
    width: 100%;
}

.preset-example__item,
.preset-example__meta {
    display: grid;
    justify-items: center;
    text-align: center;
}

.preset-example__item {
    gap: var(--h0n-ui-spacing-lg);
    min-width: 0;
}

.preset-example__meta span {
    color: var(--h0n-ui-color-muted);
}
</style>
