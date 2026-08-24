<script setup lang="ts">
defineOptions({
    name: 'H0OverlayContent'
})
</script>

<template>
    <div class="h-overlay-content">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.h-overlay-content {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    padding: 16px;
}
</style>
