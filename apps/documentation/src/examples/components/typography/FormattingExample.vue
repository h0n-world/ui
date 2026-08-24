<script setup lang="ts">
import { H0Stack, H0Typography } from '@h0nio/ui'
</script>

<template>
    <H0Stack class="formatting-example" gap="md">
        <H0Typography letter-spacing="0.08em" text-transform="uppercase" :weight="600">
            Uppercase interface label
        </H0Typography>
        <H0Typography :letter-spacing="1.5" text-transform="capitalize">
            Numeric letter spacing is measured in pixels
        </H0Typography>
        <H0Typography letter-spacing="var(--tracking, 0.02em)" text-transform="lowercase">
            CSS variables and fallback values are supported
        </H0Typography>
    </H0Stack>
</template>

<style scoped>
.formatting-example {
    --tracking: 0.04em;

    max-width: 38rem;
}
</style>
