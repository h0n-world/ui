<script setup lang="ts">
import {
    H0Button,
    H0Form,
    H0Input,
    H0Modal,
    H0Select,
    H0Textarea,
    type H0FormSubmitPayload,
    type H0SelectOption,
} from '@h0nio/ui'
import { ref } from 'vue'

const open = ref(false)
const result = ref('No profile changes saved')

const values = ref<string[]>(['design'])
const options: H0SelectOption<string>[] = [
    { value: 'design', label: 'Design' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'research', label: 'Research' },
    { value: 'operations', label: 'Operations' },
]

function save(payload: H0FormSubmitPayload) {
    result.value = `Saved profile for ${String(payload.values.name)}`
    open.value = false
}
</script>

<template>
    <H0Button @click="open = true">Edit profile</H0Button>
    <output aria-live="polite">{{ result }}</output>

    <H0Modal
        v-model="open"
        title="Edit profile"
        initial-focus="#profile-name"
        :close-on-backdrop="false"
    >
        <H0Form id="profile-form" @submit="save">
            <H0Input
                id="profile-name"
                variant="secondary"
                name="name"
                label="Name"
                default-value="Ada Lovelace"
                required
            />
            <H0Textarea
                name="bio"
                label="Bio"
                variant="secondary"
                default-value="Computing pioneer"
                :rows="3"
            />
            <H0Select
                v-model="values"
                :options="options"
                variant="secondary"
                label="Teams"
                hint="Choose up to two teams."
                name="teams"
            />
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
