<script setup lang="ts">
import settingsIcon from '@h0nio/icons/settings-minimalistic-stroke';
import { H0Icon } from '@h0nio/ui';
</script>

<template>
    <H0Card padding>
        <div class="content-stroke-icon">
            <H0Icon :icon="settingsIcon" :size="32" />
            <div>
                <strong>settings-minimalistic-stroke</strong>
                <span>Authored geometry from @h0nio/icons</span>
            </div>
        </div>
    </H0Card>
</template>

<style scoped>
.content-stroke-icon {
    align-items: center;
    display: flex;
    gap: var(--h0n-ui-spacing-md);

    div {
        display: grid;
    }

    span {
        color: var(--h0n-ui-color-muted);
        font-size: var(--h0n-ui-typography-body-xs-size);
    }
}
</style>
