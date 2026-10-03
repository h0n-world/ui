<script setup lang="ts">
import accessibilityIcon from '@h0nio/icons/accessibility-duotone'
import bellIcon from '@h0nio/icons/bell-stroke'
import checkIcon from '@h0nio/icons/check-circle-stroke'
import heartIcon from '@h0nio/icons/heart-duotone'
import paletteIcon from '@h0nio/icons/palette-duotone'
// import searchIcon from '@h0nio/icons/search'
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
    userIcon,
    settingsIcon,
    trashIcon,
]
</script>

<template>
    <H0Grid variant="three" gap="md" columns="repeat(auto-fit, minmax(10rem, 1fr))">
        <H0Card v-for="icon in icons" :key="icon.name" padding>
            <div class="content-icon">
                <H0Icon :icon="icon" :size="24" />
                <code>{{ icon.name }}</code>
            </div>
        </H0Card>
    </H0Grid>
</template>

<style scoped>
.content-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    gap: 10px;

    code {
        color: var(--h0n-ui-color-muted);
        font-size: var(--h0n-ui-typography-body-xs-size);
    }
}
</style>
