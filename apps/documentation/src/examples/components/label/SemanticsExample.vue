<script setup lang="ts">
import { H0Chip, H0Input, H0Label, H0Radio } from '@h0nio/ui'
import type { H0RadioValue } from '@h0nio/ui'
import { ref } from 'vue'

const email = ref('')
const notificationChannel = ref<H0RadioValue | null>('email')
const activeStatuses = ref(['open'])

function toggleStatus(status: string) {
    activeStatuses.value = activeStatuses.value.includes(status) ? activeStatuses.value.filter((value) => value !== status) : [...activeStatuses.value, status]
}
</script>

<template>
    <div class="label-stack">
        <div>
            <H0Input v-model="email" id="documentation-email" type="email" label="Email address" placeholder="you@example.com" required />
        </div>

        <fieldset>
            <H0Label as="legend" text="Notification channel" />
            <H0Radio v-model="notificationChannel" name="notification-channel" value="email" label="Email" />
            <H0Radio v-model="notificationChannel" name="notification-channel" value="push" label="Push notification" />
        </fieldset>

        <div class="status-group" role="group" aria-labelledby="status-filter-label">
            <H0Label id="status-filter-label" as="span">Status filters</H0Label>
            <div class="chip-row">
                <H0Chip :selected="activeStatuses.includes('open')" @click="toggleStatus('open')">Open</H0Chip>
                <H0Chip :selected="activeStatuses.includes('closed')" @click="toggleStatus('closed')">Closed</H0Chip>
            </div>
        </div>
    </div>
</template>

<style scoped>
.label-stack,
.label-stack > div,
fieldset {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(28rem, 100%);
}

fieldset {
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    color: var(--h0n-ui-color-text);
    font: inherit;
    padding: var(--h0n-ui-spacing-sm);
}

fieldset {
    margin: 0;
}

.chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
}
</style>
