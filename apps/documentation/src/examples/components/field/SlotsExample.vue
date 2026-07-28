<script setup lang="ts">
import { H0Field, H0Input } from '@h0nio/ui'
</script>

<template>
    <H0Field class="field" required>
        <template #label>Repository name</template>
        <H0Input placeholder="h0n-ui" />
        <template #hint>Lowercase letters, numbers, and hyphens only.</template>
    </H0Field>
</template>

<style scoped>
.field {
    width: min(28rem, 100%);
}
</style>
