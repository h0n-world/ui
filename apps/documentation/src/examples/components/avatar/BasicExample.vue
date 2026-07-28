<script setup lang="ts">
import { H0Avatar } from '@h0nio/ui'

const avatarImage = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="#315efb"/><circle cx="48" cy="36" r="18" fill="#fff"/><path d="M18 92c3-22 15-34 30-34s27 12 30 34" fill="#fff"/></svg>')}`
</script>

<template>
    <div class="avatar-row">
        <H0Avatar :src="avatarImage" name="Alex Morgan" alt="Alex Morgan" :size="64" />
        <H0Avatar name="Alex Morgan" :size="64" />
        <H0Avatar username="@h0n_ui" :size="64" />
        <H0Avatar name="H0N UI" fallback="UI" :size="64" />
    </div>
</template>

<style scoped>
.avatar-row { align-items: center; display: flex; flex-wrap: wrap; gap: var(--h0n-ui-spacing-md); justify-content: center; }
</style>
