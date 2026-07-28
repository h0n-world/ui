<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Inline, H0Switch, H0Tooltip } from '@h0nio/ui'

const disabled = ref(false)
</script>

<template>
    <H0Inline gap="md" align="center">
        <H0Tooltip :disabled="disabled" :open-delay="0">
            <template #trigger="{ triggerAttrs, open }">
                <H0Button v-bind="triggerAttrs" variant="soft">{{ open ? 'Tooltip open' : 'Hover or focus' }}</H0Button>
            </template>
            <template #content>
                <strong>Keyboard friendly</strong><br />
                Opens on focus and closes with Escape.
            </template>
        </H0Tooltip>
        <H0Switch v-model="disabled" label="Disable tooltip" />
    </H0Inline>
</template>
