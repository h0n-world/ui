<script setup lang="ts">
import { H0ImageUpload } from '@h0nio/ui'
</script>

<template>
    <div class="state-example">
        <H0ImageUpload preset="avatar" label="Profile image upload unavailable" disabled hint="Image changes are disabled while the profile is locked." />
    </div>
</template>

<style scoped>
.state-example {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>
