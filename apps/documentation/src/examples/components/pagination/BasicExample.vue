<script setup lang="ts">
import { H0Pagination } from '@h0nio/ui'
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
    <H0Pagination v-model:page="page" :total-pages="3" aria-label="Example pages" />
</template>
