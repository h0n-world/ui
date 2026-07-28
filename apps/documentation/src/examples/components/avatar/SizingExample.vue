<script setup lang="ts">
import { H0Avatar } from '@h0nio/ui'
</script>

<template>
    <div class="avatar-row">
        <H0Avatar name="Large Avatar" :size="86" />
        <H0Avatar name="Medium Avatar" size="3.5rem" radius="16px" />
        <H0Avatar name="Small Avatar" :size="44" />
        <H0Avatar name="Compact Avatar" :size="28" />
    </div>
</template>

<style scoped>
.avatar-row { align-items: center; display: flex; flex-wrap: wrap; gap: var(--h0n-ui-spacing-md); justify-content: center; }
</style>
