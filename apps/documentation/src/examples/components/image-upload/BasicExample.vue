<script setup lang="ts">
import { H0ImageUpload } from '@h0nio/ui'
import { ref } from 'vue'
const image = ref<File | null>(null)
</script>
<template>
    <H0ImageUpload
        v-model="image"
        preset="avatar"
        label="Profile picture"
        hint="Use a clear, front-facing photo."
    />
</template>
