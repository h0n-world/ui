<script setup lang="ts">
import settingsIcon from '@h0nio/icons/settings-minimalistic-stroke';
import { H0Icon } from '@h0nio/ui';
</script>

<template>
    <H0Grid variant="three" gap="md">
        <H0Card padding>
            <div class="content-icon-color">
                <H0Icon :icon="settingsIcon" :size="24" />
                <span>Current</span>
            </div>
        </H0Card>
        <H0Card padding>
            <div class="content-icon-color color-grid__primary">
                <H0Icon :icon="settingsIcon" :size="24" />
                <span>Primary</span>
            </div>
        </H0Card>
        <H0Card padding>
            <div class="content-icon-color color-grid__danger">
                <H0Icon :icon="settingsIcon" :size="24" />
                <span>Danger</span>
            </div>
        </H0Card>
    </H0Grid>
</template>

<style scoped>
.content-icon-color {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    gap: 6px;

    span {
        color: var(--h0n-ui-color-muted);
        font-size: var(--h0n-ui-typography-body-xs-size);
    }
}

.color-grid__primary {
    color: var(--h0n-ui-color-primary);
}

.color-grid__danger {
    color: var(--h0n-ui-color-danger);
}
</style>
