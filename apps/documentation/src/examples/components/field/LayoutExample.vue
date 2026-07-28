<script setup lang="ts">
import { H0Field, H0Input } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Field label="Project name" hint="Shown to workspace members.">
            <H0Input placeholder="Design system" />
        </H0Field>
        <H0Field label="Workspace ID" orientation="horizontal" error="This ID is already in use." required>
            <H0Input model-value="design-system" />
        </H0Field>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-xl);
    width: min(42rem, 100%);
}
</style>
