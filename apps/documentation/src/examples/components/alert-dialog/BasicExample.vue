<script setup lang="ts">
import { ref } from 'vue'
import { H0AlertDialog, H0Button } from '@h0nio/ui'

const open = ref(false)
const result = ref('No decision yet')
</script>

<template>
    <div class="overlay-example">
        <H0Button tone="danger" @click="open = true">Delete project</H0Button>
        <span>{{ result }}</span>

        <H0AlertDialog v-model="open" tone="danger" title="Delete project?" text="This action cannot be undone." confirm-text="Delete" @confirm="result = 'Project deleted'" @cancel="result = 'Deletion cancelled'" />
    </div>
</template>

<style scoped>
.overlay-example {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-md);
}
</style>
