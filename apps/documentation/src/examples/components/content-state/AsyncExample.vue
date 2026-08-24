<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { H0Alert, H0Button, H0ContentState, H0EmptyState, H0Skeleton, H0Stack, H0Typography, type H0ContentStateValue } from '@h0nio/ui'

const state = ref<H0ContentStateValue>('empty')
let requestTimer: ReturnType<typeof setTimeout> | undefined

function loadUsers(result: Exclude<H0ContentStateValue, 'loading'> = 'content') {
    if (requestTimer) clearTimeout(requestTimer)
    state.value = 'loading'
    requestTimer = setTimeout(() => {
        state.value = result
        requestTimer = undefined
    }, 700)
}

onBeforeUnmount(() => {
    if (requestTimer) clearTimeout(requestTimer)
})
</script>

<template>
    <H0Stack class="async-example" gap="md">
        <H0Stack gap="sm">
            <H0Button size="sm" @click="loadUsers('content')">Load users</H0Button>
            <H0Button size="sm" variant="soft" @click="loadUsers('error')">Simulate error</H0Button>
        </H0Stack>

        <H0ContentState class="state-region" :state="state">
            <template #loading>
                <H0Stack role="status" aria-label="Loading users" gap="sm">
                    <H0Skeleton v-for="index in 3" :key="index" height="2.75rem" />
                </H0Stack>
            </template>

            <template #error>
                <H0Alert tone="danger" title="Unable to load users" text="The simulated request failed." action-text="Try again" @action="loadUsers('content')" />
            </template>

            <template #empty>
                <H0EmptyState title="Users are not loaded" description="Start the simulated request to display the list." />
            </template>

            <template #content>
                <H0Stack as="ul" gap="sm" class="user-list">
                    <li v-for="user in ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton']" :key="user">
                        <H0Typography variant="body-sm" :weight="500">{{ user }}</H0Typography>
                    </li>
                </H0Stack>
            </template>
        </H0ContentState>
    </H0Stack>
</template>

<style scoped>
.async-example {
    width: min(34rem, 100%);
}

.state-region {
    min-block-size: 10rem;
}

.user-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.user-list li {
    background: var(--h0n-ui-color-secondary);
    border-radius: var(--h0n-ui-radius-md);
    padding: var(--h0n-ui-spacing-md);
}
</style>
