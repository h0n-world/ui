<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Modal } from '@h0nio/ui'

const open = ref(false)
</script>

<template>
    <H0Button @click="open = true">Edit profile</H0Button>
    <H0Modal v-model="open" title="Edit profile" subtitle="Update the information visible to your workspace.">
        <p>Update the account details in your profile form.</p>
        <template #footer="{ close }">
            <H0Button variant="soft" @click="close">Cancel</H0Button>
            <H0Button @click="close">Save changes</H0Button>
        </template>
    </H0Modal>
</template>
