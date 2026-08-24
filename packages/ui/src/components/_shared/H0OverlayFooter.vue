<script setup lang="ts">
defineOptions({
    name: 'H0OverlayFooter'
})

withDefaults(
    defineProps<{
        border?: boolean
    }>(),
    {
        border: false
    }
)
</script>

<template>
    <footer class="h-overlay-footer" :class="{ 'h-overlay-footer--border': border }">
        <slot />
    </footer>
</template>

<style scoped lang="scss">
.h-overlay-footer {
    align-items: center;
    display: flex;
    flex-wrap: var(--h-overlay-footer-wrap, wrap);
    gap: var(--h-overlay-footer-gap, var(--h0n-ui-spacing-sm));
    justify-content: var(--h-overlay-footer-justify, flex-end);
    padding: 0 16px 16px;
}

.h-overlay-footer--border {
    border-block-start: 1px solid var(--h0n-ui-color-border);
    padding-block-start: 16px;
}
</style>
