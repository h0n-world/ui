<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { H0Button, H0Typography } from '@h0nio/ui'

const saving = ref(false)
let timer: ReturnType<typeof window.setTimeout> | undefined

function save() {
    saving.value = true
    timer = window.setTimeout(() => {
        saving.value = false
    }, 1400)
}

onBeforeUnmount(() => {
    if (timer) window.clearTimeout(timer)
})
</script>

<template>
    <div class="button-example">
        <H0Button :loading="saving" loading-text="Saving changes" @click="save">Save changes</H0Button>
        <H0Typography variant="body-sm" color="muted">H0Button integrates a correctly sized H0Spinner and disables duplicate activation.</H0Typography>
    </div>
</template>

<style scoped>
.button-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: start;
    width: min(30rem, 100%);
}
</style>
