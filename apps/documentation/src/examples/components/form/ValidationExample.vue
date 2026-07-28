<script setup lang="ts">
import {
    H0Button,
    H0Form,
    H0Input,
    type H0FormInvalidPayload,
    type H0FormSubmitPayload,
} from '@h0nio/ui'
import { ref } from 'vue'

const status = ref('')
function onSubmit(payload: H0FormSubmitPayload) {
    status.value = `Welcome, ${String(payload.values.name)}`
}
function onInvalid(payload: H0FormInvalidPayload) {
    status.value = `Please fix ${Object.keys(payload.errors).length} field(s).`
}
</script>

<template>
    <H0Form class="form" @submit="onSubmit" @invalid="onInvalid">
        <H0Input name="name" label="Name" required />
        <H0Input name="email" label="Email" type="email" required />
        <H0Button type="submit">Continue</H0Button>
        <output aria-live="polite">{{ status }}</output>
    </H0Form>
</template>

<style scoped>
.form {
    width: min(26rem, 100%);
}
</style>
