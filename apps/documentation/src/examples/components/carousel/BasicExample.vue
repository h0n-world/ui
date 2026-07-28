<script setup lang="ts">
import { H0Carousel } from '@h0nio/ui'

const slides = ['Workspace', 'Analytics', 'Automation', 'Settings']
</script>

<template>
    <H0Carousel
        class="carousel-example"
        :items="slides"
        :height="190"
        slide-width="min(76%, 280px)"
        gap="16px"
        aria-label="Product areas"
        ><template #default="{ item, index }"
            ><div class="slide" :class="`slide--${index + 1}`">
                <strong>{{ item }}</strong
                ><span>{{ index + 1 }} / {{ slides.length }}</span>
            </div></template
        ></H0Carousel
    >
</template>

<style scoped>
.carousel-example {
    max-width: 44rem;
}
.slide {
    align-content: end;
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xl);
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    height: 100%;
    padding: var(--h0n-ui-spacing-lg);
}
.slide span {
    font-size: var(--h0n-ui-typography-body-sm-size);
    opacity: 0.8;
}
</style>
