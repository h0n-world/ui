<script setup lang="ts">
import { H0Typography, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Stack class="line-height-example" gap="md">
        <H0Typography line-height="1.25">
            Compact line height works well for short interface copy that occupies only a few lines.
        </H0Typography>
        <H0Typography :line-height="2">
            A numeric value is unitless and scales with the current font size, including when global typography settings change.
        </H0Typography>
        <H0Typography line-height="32px">
            String values accept explicit CSS units when a layout requires a fixed typographic rhythm.
        </H0Typography>
    </H0Stack>
</template>

<style scoped>
.line-height-example {
    max-width: 38rem;
}
</style>
