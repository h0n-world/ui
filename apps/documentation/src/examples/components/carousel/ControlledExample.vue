<script setup lang="ts">
import { H0Carousel } from '@h0nio/ui'
import { ref } from 'vue'

const slides = ['Discover', 'Configure', 'Deploy']
const active = ref(0)
</script>

<template>
    <div class="carousel-state">
        <H0Carousel v-model="active" :items="slides" :height="180" controls-position="outside" show-pagination pagination-variant="pills" show-counter aria-label="Setup steps">
            <template #default="{ item }">
                <div class="slide">{{ item }}</div>
            </template>
        </H0Carousel>
        <output aria-live="polite">Active index: {{ active }}</output>
    </div>
</template>

<style scoped>
.carousel-state {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    max-width: 36rem;
    width: 100%;
}

.slide {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-xl);
    display: grid;
    font-size: var(--h0n-ui-typography-h3-size);
    height: 100%;
    justify-items: center;
}

output {
    color: var(--h0n-ui-color-muted);
    text-align: center;
}
</style>
