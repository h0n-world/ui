<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Form, H0Input, H0Modal, H0Textarea, type H0FormSubmitPayload } from '@h0nio/ui'

const open = ref(false)
const result = ref('No profile changes saved')

function save(payload: H0FormSubmitPayload) {
    result.value = `Saved profile for ${String(payload.values.name)}`
    open.value = false
}
</script>

<template>
    <H0Button @click="open = true">Edit profile</H0Button>
    <output aria-live="polite">{{ result }}</output>

    <H0Modal v-model="open" title="Edit profile" initial-focus="#profile-name" :close-on-backdrop="false">
        <H0Form id="profile-form" @submit="save">
            <H0Input id="profile-name" name="name" label="Name" default-value="Ada Lovelace" required />
            <H0Textarea name="bio" label="Bio" default-value="Computing pioneer" :rows="3" />
        </H0Form>

        <template #footer="{ close }">
            <H0Button variant="soft" @click="close">Cancel</H0Button>
            <H0Button type="submit" form="profile-form">Save changes</H0Button>
        </template>
    </H0Modal>
</template>

<style scoped>
output {
    color: var(--h0n-ui-color-muted);
    margin-inline-start: var(--h0n-ui-spacing-md);
}
</style>
