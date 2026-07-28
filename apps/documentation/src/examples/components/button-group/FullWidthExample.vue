<script setup lang="ts">
import { H0ButtonGroup } from '@h0nio/ui'
</script>

<template>
    <div class="full-width-example">
        <H0ButtonGroup full-width tone="primary" aria-label="Document workflow actions">
            <template #btn-1>Save draft</template>
            <template #btn-2>Request review</template>
            <template #btn-3>Publish</template>
        </H0ButtonGroup>
    </div>
</template>

<style scoped>
.full-width-example {
    margin-inline: auto;
    width: min(560px, 100%);
}
</style>
