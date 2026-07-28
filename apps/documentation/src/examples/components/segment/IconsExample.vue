<script setup lang="ts">
import { settingsIcon, userIcon, warningIcon } from '@h0nio/ui/icons'
import { H0Segment, type H0SegmentItem } from '@h0nio/ui'
import { ref } from 'vue'

const value = ref('profile')
const items: H0SegmentItem[] = [
    { label: 'Profile', value: 'profile', icon: userIcon },
    { label: 'Settings', value: 'settings', icon: settingsIcon },
    { label: 'Issues', value: 'issues', icon: warningIcon, disabled: true },
]
</script>

<template>
    <H0Segment v-model="value" :items="items" icon-expand aria-label="Account section" />
</template>
