<script setup lang="ts">
import { H0Card, H0Grid } from '@h0nio/ui'
</script>

<template>
    <H0Grid class="grid-example" variant="auto-fit" gap="md" columns="repeat(auto-fit, minmax(9rem, 1fr))">
        <H0Card v-for="item in 4" :key="item" class="panel">Panel {{ item }}</H0Card>
    </H0Grid>
</template>

<style scoped>
.grid-example { height: auto; }
.panel { align-items: center; display: flex; justify-content: center; min-block-size: 6rem; }
</style>
