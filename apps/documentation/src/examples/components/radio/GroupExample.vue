<script setup lang="ts">
import { H0RadioGroup, type H0RadioOption, type H0RadioValue } from '@h0nio/ui'
import { ref } from 'vue'

const frequency = ref<H0RadioValue | null>('weekly')
const options: H0RadioOption[] = [
    { title: 'Daily', description: 'A short digest every morning.', value: 'daily' },
    { title: 'Weekly', description: 'One summary every Monday.', value: 'weekly' },
    { title: 'Never', value: 'never' },
]
</script>

<template>
    <H0RadioGroup v-model="frequency" :options="options" label="Digest frequency" description="Choose one delivery schedule." orientation="horizontal" name="frequency" />
</template>
