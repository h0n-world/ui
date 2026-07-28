<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Drawer, H0Stack } from '@h0nio/ui'

const open = ref(false)
</script>

<template>
    <H0Button @click="open = true">Open navigation drawer</H0Button>
    <H0Drawer v-model="open" title="Workspace navigation" aria-label="Workspace navigation">
        <H0Stack gap="sm">
            <a href="#overview">Overview</a>
            <a href="#activity">Activity</a>
            <a href="#settings">Settings</a>
        </H0Stack>
        <template #footer="{ close }">
            <H0Button variant="soft" @click="close">Done</H0Button>
        </template>
    </H0Drawer>
</template>
