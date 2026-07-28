<script setup lang="ts">
import { H0PasswordInput } from '@h0nio/ui'
import { ref } from 'vue'

const password = ref('correct horse battery staple')
const visible = ref(false)
</script>

<template>
    <div class="stack">
        <H0PasswordInput
            v-model="password"
            v-model:visible="visible"
            label="Controlled visibility"
            autocomplete="new-password"
        />
        <output>Password is {{ visible ? 'visible' : 'hidden' }}.</output>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(26rem, 100%);
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
