<script setup lang="ts">
import { H0Button } from '@h0nio/ui'
</script>

<template>
    <div class="button-example">
        <H0Button tone="primary">Create project</H0Button>
        <H0Button variant="soft">Save draft</H0Button>
        <H0Button variant="ghost">Cancel</H0Button>
    </div>
</template>

<style scoped>
.button-example {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-md);
    justify-content: center;
}

@container documentation-preview (max-width: 520px) {
    .button-example {
        align-items: center;
        flex-direction: column;
        flex-wrap: nowrap;
    }
}
</style>
