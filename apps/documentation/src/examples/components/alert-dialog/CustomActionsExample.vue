<script setup lang="ts">
import { ref } from 'vue'
import { H0AlertDialog, H0Button, H0Stack } from '@h0nio/ui'

const open = ref(false)
const result = ref('Draft is still available')

function discard(confirm: () => void) {
    confirm()
    result.value = 'Draft discarded'
}
</script>

<template>
    <H0Stack gap="sm">
        <H0Button tone="warning" @click="open = true">Discard draft</H0Button>
        <output aria-live="polite">{{ result }}</output>
    </H0Stack>

    <H0AlertDialog v-model="open" tone="warning" initial-focus="#keep-editing">
        <template #title>Discard unsaved draft?</template>
        Changes made in this session will be lost, but the published version will remain available.
        <template #actions="{ cancel, confirm }">
            <H0Button id="keep-editing" variant="soft" @click="cancel">Keep editing</H0Button>
            <H0Button tone="danger" @click="discard(confirm)">Discard draft</H0Button>
        </template>
    </H0AlertDialog>
</template>
