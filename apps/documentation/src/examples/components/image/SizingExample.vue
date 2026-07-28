<script setup lang="ts">
import { H0Image } from '@h0nio/ui'
import type { H0ImageFit } from '@h0nio/ui'

const image = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="#1d2433"/><circle cx="180" cy="150" r="90" fill="#315efb"/><rect x="280" y="80" width="220" height="240" rx="32" fill="#f4b740"/></svg>')}`
const fits: H0ImageFit[] = ['contain', 'cover', 'fill', 'none', 'scale-down']
</script>

<template>
    <div class="image-grid">
        <div v-for="(fit, index) in fits" :key="fit">
            <H0Image :src="image" :alt="`Abstract shapes using ${fit} fit`" :width="index % 2 === 0 ? 180 : '180px'" :height="140" :fit="fit" :lazy="false" />
            <code>{{ fit }}</code>
        </div>
    </div>
</template>

<style scoped>
.image-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(11.25rem, 1fr));
    width: 100%;
}

.image-grid > div {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    justify-items: center;
}

.image-grid code {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}
</style>
