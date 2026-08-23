<script setup lang="ts">
import { H0Button, H0CellColorPicker, H0Inline } from '@h0nio/ui'
import { ref } from 'vue'

const color = ref('#3B82F6')
</script>

<template>
    <H0Inline align="center" gap="sm" wrap>
        <H0CellColorPicker v-model="color" label="Accent" />
        <H0Button size="sm" variant="soft" @click="color = '#22C55E'">Set green</H0Button>
        <H0Button size="sm" variant="ghost" @click="color = '#F97316'">Set orange</H0Button>
    </H0Inline>
</template>
