<script setup lang="ts">
import { H0Button, H0Form, H0Input, type H0FormErrors, type H0FormSubmitPayload } from '@h0nio/ui'
import { ref } from 'vue'

const errors = ref<H0FormErrors>({})
function submit(payload: H0FormSubmitPayload) {
    errors.value = payload.values.email === 'taken@example.com' ? { email: 'This email is already registered.' } : {}
}
</script>

<template>
    <H0Form v-model:errors="errors" class="form" @submit="submit">
        <H0Input name="email" label="Email" default-value="taken@example.com" :error="errors.email" required />
        <div class="actions">
            <H0Button type="submit">Check email</H0Button>
            <H0Button type="reset" variant="ghost">Reset</H0Button>
        </div>
    </H0Form>
</template>

<style scoped>
.form {
    width: min(30rem, 100%);
}
.actions {
    display: flex;
    gap: var(--h0n-ui-spacing-sm);
}
</style>
