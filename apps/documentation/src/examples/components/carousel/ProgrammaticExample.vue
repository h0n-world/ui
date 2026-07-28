<script setup lang="ts">
import { H0Button, H0Carousel } from '@h0nio/ui'
import { ref } from 'vue'

type CarouselApi = { previous: () => void; next: () => void; goTo: (index: number) => void; play: () => void; pause: () => void }
const carousel = ref<CarouselApi | null>(null)
const slides = [1, 2, 3]
</script>

<template>
    <div class="carousel-controller">
        <H0Carousel ref="carousel" :items="slides" :height="150" :autoplay-interval="1200" loop :show-controls="false" aria-label="Programmatic carousel">
            <template #default="{ item }">
                <div class="slide">{{ item }}</div>
            </template>
        </H0Carousel>
        <div>
            <H0Button size="sm" variant="soft" @click="carousel?.previous()">Previous</H0Button>
            <H0Button size="sm" variant="soft" @click="carousel?.next()">Next</H0Button>
            <H0Button size="sm" variant="ghost" @click="carousel?.goTo(0)">First</H0Button>
            <H0Button size="sm" variant="ghost" @click="carousel?.play()">Play</H0Button>
            <H0Button size="sm" variant="ghost" @click="carousel?.pause()">Pause</H0Button>
        </div>
    </div>
</template>

<style scoped>
.carousel-controller {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    max-width: 34rem;
    width: 100%;
}

.carousel-controller > div {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
    justify-content: center;
}

.slide {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xl);
    display: grid;
    font-size: var(--h0n-ui-typography-h2-size);
    height: 100%;
    justify-items: center;
}
</style>
