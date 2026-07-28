<script setup lang="ts">
import {
    arrowDownIcon,
    arrowLeftIcon,
    arrowRightIcon,
    arrowUpIcon,
    bellIcon,
    checkIcon,
    closeIcon,
    emailIcon,
    errorIcon,
    infoIcon,
    loadingIcon,
    minusIcon,
    moreHorizontalIcon,
    pendingIcon,
    plusIcon,
    searchIcon,
    settingsIcon,
    successIcon,
    thumbUpIcon,
    trashIcon,
    userIcon,
    warningIcon,
    type H0IconDefinition
} from '@h0nio/ui/icons'
import { H0Icon } from '@h0nio/ui'

const icons: H0IconDefinition[] = [
    arrowDownIcon,
    arrowLeftIcon,
    arrowRightIcon,
    arrowUpIcon,
    bellIcon,
    checkIcon,
    closeIcon,
    emailIcon,
    errorIcon,
    infoIcon,
    loadingIcon,
    minusIcon,
    moreHorizontalIcon,
    pendingIcon,
    plusIcon,
    searchIcon,
    settingsIcon,
    successIcon,
    thumbUpIcon,
    trashIcon,
    userIcon,
    warningIcon
]
</script>

<template>
    <div class="icon-grid">
        <div v-for="icon in icons" :key="icon.name">
            <H0Icon :icon="icon" :size="24" />
            <code>{{ icon.name }}</code>
        </div>
    </div>
</template>

<style scoped>
.icon-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    width: 100%;
}

.icon-grid > div {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: center;
    padding: var(--h0n-ui-spacing-md);
}

.icon-grid code {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}
</style>
