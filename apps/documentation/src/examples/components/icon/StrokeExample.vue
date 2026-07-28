<script setup lang="ts">
import { settingsIcon } from '@h0nio/ui/icons'
import { H0Icon } from '@h0nio/ui'
</script>

<template>
    <div class="stroke-grid">
        <div>
            <H0Icon :icon="settingsIcon" :size="24" />
            <span>24px · round</span>
        </div>
        <div class="stroke-grid__primary">
            <H0Icon :icon="settingsIcon" size="2rem" :stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" />
            <span>2rem · square/miter</span>
        </div>
        <div class="stroke-grid__danger">
            <H0Icon :icon="settingsIcon" :size="32" :stroke-width="3" stroke-linecap="butt" stroke-linejoin="bevel" />
            <span>32px · butt/bevel</span>
        </div>
    </div>
</template>

<style scoped>
.stroke-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    width: 100%;
}

.stroke-grid > div {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: center;
    padding: var(--h0n-ui-spacing-lg);
}

.stroke-grid span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}

.stroke-grid__primary {
    color: var(--h0n-ui-color-primary);
}

.stroke-grid__danger {
    color: var(--h0n-ui-color-danger);
}
</style>
