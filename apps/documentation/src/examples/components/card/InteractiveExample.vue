<script setup lang="ts">
import { H0Card } from '@h0nio/ui'
</script>

<template>
    <H0Card class="card-example" as="a" href="#accessibility" interactive shadow>
        <template #header>Read accessibility guidance</template>
        <template #description>Use a native anchor card when activating the whole surface navigates to a destination.</template>
    </H0Card>
</template>

<style scoped>
.card-example { max-width: 32rem; text-align: start; text-decoration: none; }
</style>
