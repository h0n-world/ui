<script setup lang="ts">
import { H0Button, H0Carousel } from '@h0nio/ui'
import { ref } from 'vue'

type CarouselPlaybackApi = { pause: () => void; play: () => void }

const announcements = ['New dashboard', 'Faster builds', 'Improved accessibility']
const carousel = ref<CarouselPlaybackApi | null>(null)
const isPlaying = ref(true)

function togglePlayback() {
    if (isPlaying.value) {
        carousel.value?.pause()
    } else {
        carousel.value?.play()
    }

    isPlaying.value = !isPlaying.value
}
</script>

<template>
    <div class="autoplay-example">
        <H0Carousel ref="carousel" class="carousel-example" :items="announcements" :height="160" autoplay loop :autoplay-interval="2600" pause-on-hover pause-on-focus show-pagination :show-controls="false" aria-label="Product announcements">
            <template #default="{ item }">
                <div class="slide">{{ item }}</div>
            </template>
        </H0Carousel>
        <H0Button size="sm" variant="soft" @click="togglePlayback">{{ isPlaying ? 'Pause autoplay' : 'Play autoplay' }}</H0Button>
    </div>
</template>

<style scoped>
.autoplay-example {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: center;
    max-width: 34rem;
    width: 100%;
}

.carousel-example {
    width: 100%;
}

.slide {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-xl);
    display: grid;
    font-size: var(--h0n-ui-typography-h4-size);
    height: 100%;
    justify-items: center;
    padding: var(--h0n-ui-spacing-lg);
    text-align: center;
}
</style>
