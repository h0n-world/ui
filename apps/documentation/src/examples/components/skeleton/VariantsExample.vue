<script setup lang="ts">
import { H0Skeleton, H0Typography } from '@h0nio/ui'
</script>

<template>
    <div class="variants-example">
        <div class="variant">
            <H0Skeleton width="100%" height="72px" />
            <H0Typography variant="body-xs" color="muted">block</H0Typography>
        </div>
        <div class="variant">
            <H0Skeleton variant="text" width="100%" height="1em" />
            <H0Typography variant="body-xs" color="muted">text</H0Typography>
        </div>
        <div class="variant variant--circle">
            <H0Skeleton variant="circle" width="48px" height="48px" />
            <H0Typography variant="body-xs" color="muted">circle</H0Typography>
        </div>
    </div>
</template>

<style scoped>
.variants-example {
    align-items: end;
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    grid-template-columns: minmax(10rem, 2fr) minmax(8rem, 1fr) auto;
    width: min(42rem, 100%);
}

.variant {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
}

.variant--circle {
    justify-items: center;
}

@container documentation-preview (max-width: 520px) {
    .variants-example {
        align-items: start;
        grid-template-columns: 1fr;
    }

    .variant--circle {
        justify-items: start;
    }
}
</style>
