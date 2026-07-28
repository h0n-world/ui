<script setup lang="ts">
import { H0Button, H0Input } from '@h0nio/ui'
import { ref } from 'vue'

const email = ref('alex.example.com')
const error = ref('')

function validate() {
    error.value = email.value.includes('@') ? '' : 'Enter a valid email address.'
}
</script>

<template>
    <div class="validation-example">
        <H0Input v-model="email" id="account-email" name="email" label="Email address" :error="error" />
        <H0Button size="sm" @click="validate">Validate email</H0Button>
    </div>
</template>

<style scoped>
.validation-example {
    align-items: start;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    max-width: 28rem;
    width: 100%;
}
</style>
