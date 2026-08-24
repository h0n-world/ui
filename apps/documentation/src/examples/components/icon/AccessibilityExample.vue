<script setup lang="ts">
import checkIcon from '@h0nio/icons/check-circle-stroke'
import trashIcon from '@h0nio/icons/trash-bin-trash-stroke'
import warningIcon from '@h0nio/icons/danger-triangle-stroke'
import { H0Button, H0Icon } from '@h0nio/ui'
</script>

<template>
    <div class="icon-row">
        <span><H0Icon :icon="checkIcon" /> Decorative beside text</span>
        <span><H0Icon :icon="warningIcon" :size="28" title="Warning" /> <span aria-hidden="true">Standalone SVG title</span></span>
        <H0Button :icon="trashIcon" button-type="onlyIcon" aria-label="Delete notification" />
    </div>
</template>

<style scoped>
.icon-row,
.icon-row span {
    align-items: center;
    display: flex;
    gap: var(--h0n-ui-spacing-sm);
    justify-content: center;
}

.icon-row {
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-lg);
}
</style>
