<script setup lang="ts">
import settingsIcon from '@h0nio/icons/settings-minimalistic-stroke'
import { H0Icon } from '@h0nio/ui'
</script>

<template>
    <div class="stroke-example">
        <H0Icon :icon="settingsIcon" :size="32" />
        <div>
            <strong>settings-minimalistic-stroke</strong>
            <span>Authored geometry from @h0nio/icons</span>
        </div>
    </div>
</template>

<style scoped>
.stroke-example {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    display: flex;
    gap: var(--h0n-ui-spacing-md);
    padding: var(--h0n-ui-spacing-lg);
    width: 100%;
}

.stroke-example div {
    display: grid;
    gap: var(--h0n-ui-spacing-xxs);
}

.stroke-example span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}
</style>
