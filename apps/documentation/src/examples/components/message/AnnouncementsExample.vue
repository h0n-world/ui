<script setup lang="ts">
import { H0Button, H0Message } from '@h0nio/ui'
import type { H0MessageTone } from '@h0nio/ui'
import { ref } from 'vue'

type Announcement = {
    role: 'alert' | 'status'
    text: string
    tone: H0MessageTone
}

const announcement = ref<Announcement | null>(null)

function showStatus() {
    announcement.value = { role: 'status', text: 'Changes were saved successfully.', tone: 'success' }
}

function showAlert() {
    announcement.value = { role: 'alert', text: 'The connection was lost. Try again.', tone: 'error' }
}
</script>

<template>
    <div class="announcement-example">
        <div class="announcement-example__actions">
            <H0Button size="sm" @click="showStatus">Show status</H0Button>
            <H0Button size="sm" variant="soft" @click="showAlert">Show urgent error</H0Button>
            <H0Button size="sm" variant="ghost" :disabled="!announcement" @click="announcement = null">Clear</H0Button>
        </div>
        <H0Message v-if="announcement" :tone="announcement.tone" :role="announcement.role" :text="announcement.text" />
    </div>
</template>

<style scoped>
.announcement-example {
    align-items: start;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    min-height: 6rem;
    width: min(36rem, 100%);
}

.announcement-example__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
}
</style>
