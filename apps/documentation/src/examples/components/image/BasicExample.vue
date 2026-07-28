<script setup lang="ts">
import { H0Image } from '@h0nio/ui'
import type { H0ImageStatus } from '@h0nio/ui'
import { ref } from 'vue'

const landscape = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#315efb"/><stop offset="1" stop-color="#7928ca"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/><circle cx="620" cy="100" r="54" fill="#fff" opacity=".8"/><path d="M0 390 220 170l130 130 100-90 350 240H0" fill="#101522" opacity=".75"/></svg>')}`
const status = ref<H0ImageStatus>('idle')
</script>

<template>
    <div class="image-example">
        <H0Image :src="landscape" alt="Abstract mountain landscape" aspect-ratio="16 / 9" :lazy="false" @status-change="status = $event" />
        <span>Status: {{ status }}</span>
    </div>
</template>

<style scoped>
.image-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    max-width: 42rem;
    width: 100%;
}

.image-example span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}
</style>
