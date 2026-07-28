<script setup lang="ts">
import { H0Badge, type H0BadgeTone } from '@h0nio/ui'

const tones: H0BadgeTone[] = ['default', 'primary', 'success', 'warning', 'danger', 'neutral']
</script>

<template>
    <div class="badge-row">
        <H0Badge v-for="tone in tones" :key="tone" :tone="tone">{{ tone }}</H0Badge>
    </div>
</template>

<style scoped>
.badge-row { align-items: center; display: flex; flex-wrap: wrap; gap: var(--h0n-ui-spacing-sm); justify-content: center; text-transform: capitalize; }
</style>
