<script setup lang="ts">
import { arrowRightIcon, infoIcon } from '@h0nio/ui/icons'
import { ref } from 'vue'
import { H0Alert, H0Button, H0Icon } from '@h0nio/ui'

const loading = ref(true)
const message = ref('No rich action selected')
</script>

<template>
    <div class="content-states-example">
        <H0Alert tone="success" title="Preferences saved" />

        <H0Alert tone="warning" title="Deployment needs attention" text="Several checks require review before release.">
            <template #icon>
                <H0Icon :icon="infoIcon" :size="20" :stroke-width="1.5" aria-hidden="true" />
            </template>

            <ul>
                <li>Confirm the production environment variables.</li>
                <li>Resolve the pending accessibility review.</li>
            </ul>
        </H0Alert>

        <H0Alert tone="info" title="Review requested" text="Open the change summary before approving." action-text="Review changes" @action="message = 'Review action selected'">
            <template #action>
                <H0Icon :icon="arrowRightIcon" :size="16" :stroke-width="1.5" aria-hidden="true" />
                <span>Review changes</span>
            </template>
        </H0Alert>

        <H0Alert tone="info" :loading="loading" title="Synchronizing workspace" text="The action remains available while the visual loading state is active." action-text="View details" @action="message = 'Loading alert action selected'" />

        <div class="example-controls">
            <H0Button size="sm" variant="soft" @click="loading = !loading">{{ loading ? 'Finish loading' : 'Restart loading' }}</H0Button>
            <output aria-live="polite">{{ message }}</output>
        </div>
    </div>
</template>

<style scoped>
.content-states-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: min(46rem, 100%);
}

.content-states-example ul {
    margin-block: 0;
}

.example-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--h0n-ui-spacing-sm);
}

output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
