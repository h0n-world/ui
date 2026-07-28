<script setup lang="ts">
import { H0ButtonGroup, type H0ButtonGroupItem } from '@h0nio/ui'

const twoButtons: H0ButtonGroupItem[] = [{}, {}]
</script>

<template>
    <div class="sizes-example">
        <H0ButtonGroup :buttons="twoButtons" size="sm" aria-label="Small edit actions">
            <template #btn-1>Undo</template>
            <template #btn-2>Redo</template>
        </H0ButtonGroup>

        <H0ButtonGroup :buttons="twoButtons" size="md" aria-label="Medium edit actions">
            <template #btn-1>Undo</template>
            <template #btn-2>Redo</template>
        </H0ButtonGroup>

        <H0ButtonGroup :buttons="twoButtons" size="lg" aria-label="Large edit actions">
            <template #btn-1>Undo</template>
            <template #btn-2>Redo</template>
        </H0ButtonGroup>
    </div>
</template>

<style scoped>
.sizes-example {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    grid-template-columns: repeat(3, max-content);
    justify-items: center;
}

@container documentation-preview (max-width: 520px) {
    .sizes-example {
        grid-template-columns: max-content;
    }
}
</style>
