<script setup lang="ts">
import { moreHorizontalIcon, settingsIcon, trashIcon } from '@h0nio/ui/icons'
import { H0Button } from '@h0nio/ui'
</script>

<template>
    <div class="icon-only-example">
        <H0Button
            button-type="onlyIcon"
            :icon="moreHorizontalIcon"
            variant="soft"
            aria-label="More actions"
        />
        <H0Button
            button-type="onlyIcon"
            :icon="settingsIcon"
            variant="outline"
            aria-label="Settings"
        />
        <H0Button button-type="onlyIcon" :icon="trashIcon" tone="danger" aria-label="Delete" />
        <H0Button button-type="onlyIcon" variant="ghost" aria-label="Custom favorite">
            <template #icon>
                <svg class="custom-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
                </svg>
            </template>
        </H0Button>
    </div>
</template>

<style scoped>
.icon-only-example {
    display: flex;
    gap: var(--h0n-ui-spacing-md);
    justify-content: center;
}

.custom-icon {
    fill: none;
    height: 1rem;
    stroke: currentColor;
    stroke-linejoin: round;
    width: 1rem;
}

@container documentation-preview (max-width: 520px) {
    .icon-only-example {
        align-items: center;
        flex-direction: column;
    }
}
</style>
