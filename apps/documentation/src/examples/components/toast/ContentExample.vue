<script setup lang="ts">
import bellIcon from '@h0nio/icons/bell-stroke'
import { H0Toast } from '@h0nio/ui'
</script>

<template>
    <div class="content-example">
        <H0Toast class="toast-preview" :icon="bellIcon" tone="info">
            <template #title>Custom icon and title slot</template>
            Your weekly activity report is ready to review.
        </H0Toast>
        <H0Toast class="toast-preview" title="Persistent application-owned notice" description="Set closable to false only when another dismissal path exists." :closable="false" />
    </div>
</template>

<style scoped>
.content-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: center;
    width: 100%;
}

.toast-preview {
    min-width: 0;
    width: min(28rem, 100%);
}
</style>
