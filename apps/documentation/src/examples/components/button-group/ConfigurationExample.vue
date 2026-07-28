<script setup lang="ts">
import { H0ButtonGroup, type H0ButtonGroupItem } from '@h0nio/ui'
import { ref } from 'vue'

const lastAction = ref('No action selected')

const actions: H0ButtonGroupItem[] = [
    { key: 'duplicate', label: 'Duplicate', slot: 'duplicate' },
    { key: 'archive', label: 'Archive' },
    { key: 'delete', label: 'Delete', tone: 'danger' },
]

function handleAction(button: H0ButtonGroupItem, index: number) {
    lastAction.value = `${button.label} selected at index ${index}`
}
</script>

<template>
    <div class="configuration-example">
        <H0ButtonGroup
            :buttons="actions"
            variant="soft"
            aria-label="Record actions"
            @button-click="handleAction"
        >
            <template #duplicate="{ index }">Duplicate ({{ index + 1 }})</template>
        </H0ButtonGroup>

        <output aria-live="polite">{{ lastAction }}</output>
    </div>
</template>

<style scoped>
.configuration-example {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: center;
}

.configuration-example output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
