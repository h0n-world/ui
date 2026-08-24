<script setup lang="ts">
import errorIcon from '@h0nio/icons/danger-circle-stroke';
import { H0Icon, H0Image } from '@h0nio/ui';
</script>

<template>
    <div class="fallback-grid">
        <div>
            <strong>Default fallback</strong>
            <H0Image
                src="/missing-default-image.png"
                alt="Unavailable report preview"
                :lazy="false"
            />
        </div>
        <div>
            <strong>Custom fallback</strong>
            <H0Image
                src="/missing-custom-image.png"
                alt="Unavailable project preview"
                :lazy="false"
            >
                <template #fallback>
                    <div class="fallback" role="img" aria-label="Project preview unavailable">
                        <span class="fallback__icon" aria-hidden="true">
                            <H0Icon :icon="errorIcon" :size="24" />
                        </span>
                        <strong>Preview unavailable</strong>
                        <small>The project image could not be loaded.</small>
                    </div>
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
    align-content: center;
    background: var(--h0n-ui-color-secondary);
    color: var(--h0n-ui-color-muted);
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    height: 100%;
    justify-items: center;
    min-height: 12rem;
    padding: var(--h0n-ui-spacing-lg);
    text-align: center;
    width: 100%;
}

.fallback__icon {
    align-items: center;
    background: color-mix(in srgb, var(--h0n-ui-color-danger) 14%, transparent);
    border-radius: 50%;
    color: var(--h0n-ui-color-danger);
    display: inline-flex;
    height: 3rem;
    justify-content: center;
    margin-bottom: var(--h0n-ui-spacing-xs);
    width: 3rem;
}

.fallback strong {
    color: var(--h0n-ui-color-text);
}

.fallback small {
    max-width: 16rem;
}
</style>
