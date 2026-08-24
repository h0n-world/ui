<script setup lang="ts">
import settingsIcon from '@h0nio/icons/settings-minimalistic-stroke'
import { H0Icon } from '@h0nio/ui'
</script>

<template>
    <div class="color-grid">
        <div>
            <H0Icon :icon="settingsIcon" :size="28" />
            <span>Current</span>
        </div>
        <div class="color-grid__primary">
            <H0Icon :icon="settingsIcon" :size="28" />
            <span>Primary</span>
        </div>
        <div class="color-grid__danger">
            <H0Icon :icon="settingsIcon" :size="28" />
            <span>Danger</span>
        </div>
    </div>
</template>

<style scoped>
.color-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    width: 100%;
}

.color-grid > div {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: center;
    padding: var(--h0n-ui-spacing-lg);
}

.color-grid span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}

.color-grid__primary {
    color: var(--h0n-ui-color-primary);
}

.color-grid__danger {
    color: var(--h0n-ui-color-danger);
}
</style>
