<script setup lang="ts">
import { H0ImageUpload } from '@h0nio/ui'

const preview = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><defs><linearGradient id="g"><stop stop-color="#665cff"/><stop offset="1" stop-color="#20b486"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="320" cy="150" r="72" fill="white" opacity=".28"/></svg>')
</script>

<template>
    <div class="presets">
        <H0ImageUpload :src="preview" preset="avatar" label="Avatar" />
        <H0ImageUpload :src="preview" preset="square" label="Square cover" />
        <H0ImageUpload :src="preview" preset="banner" label="Banner" />
    </div>
</template>

<style scoped>
.presets {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    gap: var(--h0n-ui-spacing-xl);
}
</style>
