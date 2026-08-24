<script setup lang="ts">
import accessibilityIcon from '@h0nio/icons/accessibility-duotone'
import bellIcon from '@h0nio/icons/bell-stroke'
import checkIcon from '@h0nio/icons/check-circle-stroke'
import heartIcon from '@h0nio/icons/heart-duotone'
import paletteIcon from '@h0nio/icons/palette-duotone'
import searchIcon from '@h0nio/icons/search'
import settingsIcon from '@h0nio/icons/settings-stroke'
import trashIcon from '@h0nio/icons/trash-bin-trash-stroke'
import userIcon from '@h0nio/icons/user-stroke'
import { H0Icon, type H0IconSource } from '@h0nio/ui'

const icons: H0IconSource[] = [
    accessibilityIcon,
    bellIcon,
    checkIcon,
    heartIcon,
    paletteIcon,
    searchIcon,
    settingsIcon,
    trashIcon,
    userIcon
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
