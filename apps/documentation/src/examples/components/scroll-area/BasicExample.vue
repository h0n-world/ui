<script setup lang="ts">
import { H0ScrollArea, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0ScrollArea
        class="scroll-area-example"
        :max-height="220"
        fade-edges
        aria-label="Recent activity"
    >
        <H0Stack gap="sm">
            <article v-for="item in 12" :key="item">
                <strong>Activity {{ item }}</strong
                ><span>Workspace settings were updated.</span>
            </article>
        </H0Stack>
    </H0ScrollArea>
</template>

<style scoped>
.scroll-area-example {
    width: min(34rem, 100%);
}
.scroll-area-example :deep(.h-scroll__viewport) {
    padding: var(--h0n-ui-spacing-md);
}
.scroll-area-example article {
    display: grid;
    gap: var(--h0n-ui-spacing-xxs);
    padding-block: var(--h0n-ui-spacing-sm);
}
.scroll-area-example article + article {
    border-block-start: 1px solid var(--h0n-ui-color-border);
}
.scroll-area-example span {
    color: var(--h0n-ui-color-muted);
}
</style>
