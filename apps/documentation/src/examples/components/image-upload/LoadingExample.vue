<script setup lang="ts">
import { H0ImageUpload } from '@h0nio/ui'
</script>

<template>
    <div class="state-example">
        <H0ImageUpload preset="square" label="Processing product image" loading loading-label="Processing product image" />
    </div>
</template>

<style scoped>
.state-example {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>
