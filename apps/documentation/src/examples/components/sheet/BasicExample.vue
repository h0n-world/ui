<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Sheet, H0Stack } from '@h0nio/ui'

const open = ref(false)
</script>

<template>
    <H0Button @click="open = true">Open quick actions</H0Button>
    <H0Sheet v-model="open" side="bottom" title="Quick actions" subtitle="Choose what to do with the selected item.">
        <H0Stack gap="md">
            <span>Choose an action, then dismiss the sheet with Escape, the backdrop, or the header close button.</span>
        </H0Stack>
        <template #footer="{ close }">
            <H0Button @click="close">Done</H0Button>
        </template>
    </H0Sheet>
</template>
