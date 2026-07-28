<script setup lang="ts">
import { H0FileUpload, type H0FileUploadValidationError } from '@h0nio/ui'
import { ref } from 'vue'

const message = ref('No rejected files.')
function onInvalid(error: H0FileUploadValidationError) {
    message.value = error.message
}
</script>

<template>
    <div class="stack">
        <H0FileUpload
            accept=".pdf"
            :max-size="2_000_000"
            label="Contract"
            hint="One PDF up to 2 MB."
            :validator="(file) => (file.name.toLowerCase().includes('draft') ? 'Upload the final version, not a draft.' : null)"
            @invalid="onInvalid"
        />
        <output aria-live="polite">{{ message }}</output>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(36rem, 100%);
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
