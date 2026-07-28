<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Checkbox, H0Drawer, H0Stack, H0Switch } from '@h0nio/ui'

const open = ref(false)
const availableOnly = ref(true)
const includeArchived = ref(false)

function reset() {
    availableOnly.value = false
    includeArchived.value = false
}
</script>

<template>
    <H0Button variant="soft" @click="open = true">Open filters</H0Button>

    <H0Drawer v-model="open" title="Project filters" initial-focus="#available-projects">
        <H0Stack gap="md">
            <H0Switch id="available-projects" v-model="availableOnly" label="Available projects only" />
            <H0Checkbox v-model="includeArchived" label="Include archived projects" />
        </H0Stack>

        <template #footer="{ close }">
            <H0Button variant="soft" @click="reset">Reset</H0Button>
            <H0Button @click="close">Apply filters</H0Button>
        </template>
    </H0Drawer>
</template>
