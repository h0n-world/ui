<script setup lang="ts">
import settingsIcon from '@h0nio/icons/settings-minimalistic-stroke';
import { H0Icon } from '@h0nio/ui';
</script>

<template>
    <H0Grid variant="three" gap="md">
        <H0Card padding>
            <div class="content-icon">
                <H0Icon :icon="settingsIcon" :size="16" />
                <span>16px</span>
            </div>
        </H0Card>
        <H0Card padding>
            <div class="content-icon">
                <H0Icon :icon="settingsIcon" :size="24" />
                <span>24px</span>
            </div>
        </H0Card>
        <H0Card padding>
            <div class="content-icon">
                <H0Icon :icon="settingsIcon" :size="32" />
                <span>32px</span>
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
    gap: 6px;

    span {
        color: var(--h0n-ui-color-muted);
        font-size: var(--h0n-ui-typography-body-xs-size);
    }
}
</style>
