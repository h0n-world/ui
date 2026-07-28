<script setup lang="ts">
import { H0Image } from '@h0nio/ui'
</script>

<template>
    <div class="fallback-grid">
        <div>
            <strong>Default fallback</strong>
            <H0Image src="/missing-default-image.png" alt="Unavailable report preview" :lazy="false" />
        </div>
        <div>
            <strong>Custom fallback</strong>
            <H0Image src="/missing-custom-image.png" alt="Unavailable project preview" :lazy="false">
                <template #fallback="{ status }">
                    <div class="fallback" role="img" aria-label="Project preview unavailable">Project preview unavailable <small>{{ status }}</small></div>
                </template>
            </H0Image>
        </div>
    </div>
</template>

<style scoped>
.fallback-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    width: 100%;
}

.fallback-grid > div {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
}

.fallback {
    align-items: center;
    background: var(--h0n-ui-color-secondary);
    color: var(--h0n-ui-color-muted);
    display: grid;
    height: 100%;
    justify-items: center;
    min-height: 12rem;
    width: 100%;
}

.fallback small {
    color: var(--h0n-ui-color-danger);
}
</style>
