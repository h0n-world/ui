<script setup lang="ts">
import { H0Button, H0Form, H0Switch, type H0FormSubmitPayload } from '@h0nio/ui'
import { ref } from 'vue'

const status = ref('')
function submit(payload: H0FormSubmitPayload) {
    status.value = payload.values.analytics ? 'Analytics enabled' : 'Analytics disabled'
}
</script>

<template>
    <H0Form class="form" @submit="submit">
        <H0Switch name="analytics" label="Share anonymous analytics" hint="The preference is included in form values." />
        <H0Button type="submit">Save preference</H0Button>
        <output aria-live="polite">{{ status }}</output>
    </H0Form>
</template>

<style scoped>
.form {
    width: min(32rem, 100%);
}
</style>
