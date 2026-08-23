<script setup lang="ts">
import { H0CellColorPicker } from '@h0nio/ui'
import { ref } from 'vue'

const accent = ref('#3B82F6')
</script>

<template>
    <H0CellColorPicker v-model="accent" label="Accent" />
</template>
