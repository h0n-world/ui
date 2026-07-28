<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import { H0Alert, H0Button } from '@h0nio/ui'

const visible = ref(true)
const message = ref('No action selected')
const restoreControlRef = useTemplateRef<HTMLElement>('restoreControlRef')

function publish() {
    message.value = 'Changes published'
}

async function dismiss() {
    visible.value = false
    message.value = 'Alert dismissed'
    await nextTick()
    restoreControlRef.value?.querySelector('button')?.focus()
}
</script>

<template>
    <div class="alert-example">
        <H0Alert
            v-if="visible"
            tone="warning"
            title="Unsaved changes"
            text="Your changes have not been published."
            action-text="Publish"
            closable
            close-aria-label="Dismiss unsaved changes"
            @action="publish"
            @close="dismiss"
        />

        <div v-else ref="restoreControlRef">
            <H0Button size="sm" variant="soft" @click="visible = true">Show alert</H0Button>
        </div>

        <output aria-live="polite">{{ message }}</output>
    </div>
</template>

<style scoped>
.alert-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: start;
    width: min(44rem, 100%);
}

output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
