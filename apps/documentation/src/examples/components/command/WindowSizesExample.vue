<script setup lang="ts">
import { H0Command, H0Inline, type H0CommandItem, type H0CommandWindowSize } from '@h0nio/ui'

const sizes: H0CommandWindowSize[] = ['sm', 'md', 'lg']
const items: H0CommandItem[] = [
    { value: 'new-file', label: 'Create new file...', group: 'Actions' },
    { value: 'new-folder', label: 'Create new folder...', group: 'Actions' },
    { value: 'preferences', label: 'Preferences', group: 'Settings' },
    { value: 'theme', label: 'Change theme', group: 'Settings' },
    { value: 'shortcuts', label: 'Keyboard shortcuts', group: 'Settings' },
]
</script>

<template>
    <H0Inline align="center" gap="sm" wrap>
        <H0Command v-for="size in sizes" :key="size" :items="items" :window-size="size" :trigger-label="`${size} window`" />
    </H0Inline>
</template>
