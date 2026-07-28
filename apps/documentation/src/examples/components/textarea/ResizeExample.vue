<script setup lang="ts">
import { H0Textarea } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Textarea
            label="Automatic height"
            default-value="This field grows with its content until it reaches the configured maximum height."
            :min-rows="2"
            :max-height="140"
            auto-resize
        />
        <H0Textarea label="Manual height" :min-rows="4" :auto-resize="false" resize hint="Drag the lower edge to resize vertically." />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-xl);
    width: min(34rem, 100%);
}
</style>
