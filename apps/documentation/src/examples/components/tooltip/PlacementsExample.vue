<script setup lang="ts">
import { H0Button, H0Grid, H0Tooltip, type H0FloatingPlacement } from '@h0nio/ui'

const placements: H0FloatingPlacement[] = ['top', 'right', 'bottom', 'left']
</script>

<template>
    <H0Grid min-item-width="8rem" gap="lg">
        <H0Tooltip v-for="placement in placements" :key="placement" :content="`${placement} tooltip`" :placement="placement" :open-delay="0">
            <template #trigger="{ triggerAttrs }">
                <H0Button v-bind="triggerAttrs" variant="soft">{{ placement }}</H0Button>
            </template>
        </H0Tooltip>
    </H0Grid>
</template>
