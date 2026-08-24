<script setup lang="ts">
import { ref } from 'vue'
import { H0Command, type H0CommandItem } from '@h0nio/ui'
import settingsIcon from '@h0nio/icons/settings-stroke'
import userIcon from '@h0nio/icons/user-stroke'
import plusIcon from '@h0nio/icons/add-circle-stroke'

const selected = ref('No command selected')
const items: H0CommandItem[] = [
    { value: 'new-file', label: 'Create new file...', group: 'Actions', icon: plusIcon, keywords: ['document'] },
    { value: 'new-folder', label: 'Create new folder...', group: 'Actions', icon: plusIcon },
    { value: 'assign', label: 'Assign to me', group: 'Actions', icon: userIcon },
    { value: 'preferences', label: 'Preferences', group: 'Settings', icon: settingsIcon, shortcut: '⌘,' },
    { value: 'theme', label: 'Change theme', group: 'Settings', icon: settingsIcon },
]

function select(item: H0CommandItem) {
    selected.value = `Selected: ${item.label}`
}
</script>

<template>
    <H0Command :items="items" hotkey="mod+k" trigger-label="Open commands" @select="select" />
    <output>{{ selected }}</output>
</template>

<style scoped>
output {
    color: var(--h0n-ui-color-muted);
    margin-inline-start: var(--h0n-ui-spacing-md);
}
</style>
