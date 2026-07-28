<template>
    <main class="system-layout">
        <section class="system-layout--content">
            <slot />
        </section>

        <footer class="system-layout--footer">
            <SystemFooter />
        </footer>
    </main>
</template>

<script lang="ts" setup>
import SystemFooter from './SystemFooter.vue'
</script>

<style scoped lang="scss">
.system-layout {
    &--content {
    }

    &--footer {
    }
}
</style>
