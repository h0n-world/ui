<script setup lang="ts">
import { H0Select, type H0SelectOption } from '@h0nio/ui'
import { ref } from 'vue'

const value = ref<number | null>(null)
const options: H0SelectOption<number>[] = Array.from({ length: 500 }, (_, index) => ({
    value: index + 1,
    label: `Project ${String(index + 1).padStart(3, '0')}`,
    description: index % 10 === 0 ? 'Recently updated' : undefined,
}))
</script>

<template>
    <H0Select
        v-model="value"
        class="control"
        :options="options"
        label="Project"
        placeholder="Choose from 500 projects"
        virtual
        :option-height="44"
        :scroll-height="264"
    />
</template>

<style scoped>
.control {
    width: min(26rem, 100%);
}
</style>
