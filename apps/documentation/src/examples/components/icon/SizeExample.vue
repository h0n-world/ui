<script setup lang="ts">
import settingsIcon from '@h0nio/icons/settings-minimalistic-stroke'
import { H0Icon } from '@h0nio/ui'
</script>

<template>
    <div class="size-grid">
        <div>
            <H0Icon :icon="settingsIcon" :size="16" />
            <span>16px</span>
        </div>
        <div>
            <H0Icon :icon="settingsIcon" :size="24" />
            <span>24px</span>
        </div>
        <div>
            <H0Icon :icon="settingsIcon" size="2rem" />
            <span>2rem</span>
        </div>
    </div>
</template>

<style scoped>
.size-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    width: 100%;
}

.size-grid > div {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: center;
    padding: var(--h0n-ui-spacing-lg);
}

.size-grid span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}
</style>
