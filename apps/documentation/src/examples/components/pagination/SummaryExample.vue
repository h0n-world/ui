<script setup lang="ts">
import { ref } from 'vue'
import { H0Pagination } from '@h0nio/ui'

const page = ref(1)
</script>

<template>
    <H0Pagination v-model:page="page" :total-items="120" :page-size="10" show-summary aria-label="Results pages" />
</template>
