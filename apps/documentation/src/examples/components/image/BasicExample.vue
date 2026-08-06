<script setup lang="ts">
import type { H0ImageStatus } from '@h0nio/ui'
import { H0Image } from '@h0nio/ui'
import { ref } from 'vue'

const landscape = `https://th.bing.com/th/id/R.20ebe42d85d819696194c2ff332b81cb?rik=fM7nn7YZkEX92A&pid=ImgRaw&r=0`
const status = ref<H0ImageStatus>('idle')
</script>

<template>
    <div class="image-example">
        <H0Image
            :src="landscape"
            alt="Abstract mountain landscape"
            aspect-ratio="16 / 9"
            :lazy="false"
            @status-change="status = $event"
        />
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
