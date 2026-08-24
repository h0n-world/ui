<script setup lang="ts">
import plusIcon from '@h0nio/icons/add-circle-stroke'
import { ref } from 'vue'
import { H0EmptyState, H0Typography } from '@h0nio/ui'

const message = ref('Choose an action to continue.')
</script>

<template>
    <div class="empty-example">
        <H0EmptyState
            :icon="plusIcon"
            variant="surface"
            title="No projects yet"
            description="Create a project or import an existing workspace to get started."
            primary-action="Create project"
            secondary-action="Import project"
            @primary-action="message = 'Create project selected'"
            @secondary-action="message = 'Import project selected'"
        />
        <output aria-live="polite">
            <H0Typography variant="body-sm" color="muted">{{ message }}</H0Typography>
        </output>
    </div>
</template>

<style scoped>
.empty-example {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: center;
    width: min(42rem, 100%);
}
</style>
