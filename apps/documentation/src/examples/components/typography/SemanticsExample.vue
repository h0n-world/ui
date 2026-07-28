<script setup lang="ts">
import { H0Typography } from '@h0nio/ui'
</script>

<template>
    <div class="semantics-example">
        <H0Typography variant="h3" as="h2">Visual h3 rendered as the correct h2</H0Typography>

        <div class="alignment-grid">
            <H0Typography align="left" color="muted">Left aligned</H0Typography>
            <H0Typography align="center" color="secondary">Center aligned</H0Typography>
            <H0Typography align="right" color="primary" :weight="700">Right aligned and bold</H0Typography>
        </div>

        <div class="inherited-color">
            <H0Typography color="inherit">This text inherits the color of its parent.</H0Typography>
        </div>

        <H0Typography class="truncate" truncate>Long single-line content that truncates when its available width becomes constrained.</H0Typography>
    </div>
</template>

<style scoped>
.semantics-example {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: 100%;
}

.alignment-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
}

.inherited-color {
    padding: var(--h0n-ui-spacing-md);
    border-radius: var(--h0n-ui-radius-md);
    color: var(--h0n-ui-color-success-text);
    background: var(--h0n-ui-color-surface-subtle);
}

.truncate {
    max-width: 18rem;
}
</style>
