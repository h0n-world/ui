<script setup lang="ts">
import {
    H0Alert,
    H0Button,
    H0Card,
    H0ContentState,
    H0EmptyState,
    H0Inline,
    H0Skeleton,
    H0Stack,
    H0Typography,
    type H0ContentStateValue,
} from '@h0nio/ui';
import { ref } from 'vue';

const state = ref<H0ContentStateValue>('loading')
const states: H0ContentStateValue[] = ['loading', 'error', 'empty', 'content']
</script>

<template>
    <H0Stack class="state-example" gap="md">
        <H0Inline gap="sm" wrap>
            <H0Button
                v-for="value in states"
                :key="value"
                size="sm"
                :variant="state === value ? 'solid' : 'soft'"
                @click="state = value"
            >
                {{ value }}
            </H0Button>
        </H0Inline>

        <H0ContentState class="state-region" :state="state">
            <template #loading>
                <H0Stack role="status" aria-label="Loading projects" gap="sm">
                    <H0Skeleton height="5rem" radius="1rem" />
                    <H0Skeleton variant="text" width="58%" />
                    <H0Skeleton variant="text" width="82%" />
                </H0Stack>
            </template>

            <template #error>
                <H0Alert
                    tone="danger"
                    variant="outline"
                    title="Projects could not be loaded"
                    text="Check your connection and try again."
                />
            </template>

            <template #empty>
                <H0EmptyState
                    title="No projects yet"
                    description="Create a project to start organizing your work."
                />
            </template>

            <template #content>
                <H0Card padding>
                    <template #header>Design system</template>
                    <template #description>12 components updated today</template>
                    <H0Typography variant="body-sm"
                        >The loaded content replaces the previous state in the same
                        region.</H0Typography
                    >
                </H0Card>
            </template>
        </H0ContentState>
    </H0Stack>
</template>

<style scoped>
.state-example {
    width: min(34rem, 100%);
}

.state-region {
    min-block-size: 10rem;
}
</style>
