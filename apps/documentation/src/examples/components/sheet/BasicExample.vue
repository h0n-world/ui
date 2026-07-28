<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Sheet, H0Stack } from '@h0nio/ui'

const open = ref(false)
</script>

<template>
    <H0Button @click="open = true">Open quick actions</H0Button>
    <H0Sheet v-model="open" side="bottom" aria-label="Quick actions">
        <H0Stack gap="md">
            <strong>Quick actions</strong>
            <span>Choose an action, then dismiss the sheet with Escape or the backdrop.</span>
            <H0Button @click="open = false">Done</H0Button>
        </H0Stack>
    </H0Sheet>
</template>
