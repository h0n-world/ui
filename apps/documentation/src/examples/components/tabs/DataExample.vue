<script setup lang="ts">
import { H0Tabs, type H0TabItem } from '@h0nio/ui'
import { ref } from 'vue'

const active = ref<number>(1)
const items: H0TabItem<number>[] = [
    { value: 1, label: 'Overview' },
    { value: 2, label: 'Activity' },
    { value: 3, label: 'Settings', disabled: true },
]
</script>

<template>
    <H0Tabs v-model="active" :items="items" aria-label="Project sections">
        <template #panel="{ item }">Content for {{ item.label }}.</template>
    </H0Tabs>
</template>
