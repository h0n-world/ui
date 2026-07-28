<script setup lang="ts">
import { H0Carousel } from '@h0nio/ui'

const slides = ['Plan', 'Build', 'Review']
</script>

<template>
    <H0Carousel class="custom-controls-example" :items="slides" :height="170" effect="static" show-pagination aria-label="Delivery workflow">
        <template #default="{ item, index }">
            <div class="slide">
                <span>Step {{ index + 1 }}</span>
                <strong>{{ item }}</strong>
            </div>
        </template>

        <template #previous-control>
            <span class="control-symbol" aria-hidden="true">‹</span>
        </template>

        <template #next-control>
            <span class="control-symbol" aria-hidden="true">›</span>
        </template>
    </H0Carousel>
</template>

<style scoped>
.custom-controls-example {
    max-width: 38rem;
}

.slide {
    align-content: center;
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-xl);
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    height: 100%;
    justify-items: center;
}

.slide span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}

.slide strong {
    font-size: var(--h0n-ui-typography-h3-size);
}

.control-symbol {
    font-size: 1.75rem;
    line-height: 1;
}
</style>
