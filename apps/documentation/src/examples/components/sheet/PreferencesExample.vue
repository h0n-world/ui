<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Sheet, H0Stack, H0Switch } from '@h0nio/ui'

const open = ref(false)
const compactMode = ref(false)
const notifications = ref(true)
</script>

<template>
    <H0Button variant="soft" @click="open = true">Quick preferences</H0Button>

    <H0Sheet v-model="open" side="bottom" title="Quick preferences" subtitle="Adjust how the workspace behaves." initial-focus="#compact-mode">
        <H0Stack gap="md">
            <H0Switch id="compact-mode" v-model="compactMode" label="Compact mode" />
            <H0Switch v-model="notifications" label="Desktop notifications" />
            <H0Button @click="open = false">Done</H0Button>
        </H0Stack>
    </H0Sheet>
</template>
