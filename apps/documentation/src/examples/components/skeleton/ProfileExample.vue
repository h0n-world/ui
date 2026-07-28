<script setup lang="ts">
import { H0Skeleton, H0Typography } from '@h0nio/ui'
</script>

<template>
    <div class="profile-example">
        <div class="profile-skeleton" role="status" aria-label="Loading profile">
            <H0Skeleton circle width="56px" height="56px" />
            <div>
                <H0Skeleton width="11rem" height="18px" />
                <H0Skeleton variant="text" width="100%" />
                <H0Skeleton variant="text" width="72%" />
            </div>
        </div>
        <H0Typography variant="body-sm" color="muted">One status label describes the complete placeholder group.</H0Typography>
    </div>
</template>

<style scoped>
.profile-example {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(28rem, 100%);
}

.profile-skeleton {
    align-items: center;
    display: flex;
    gap: var(--h0n-ui-spacing-md);
}

.profile-skeleton > div {
    display: grid;
    flex: 1;
    gap: var(--h0n-ui-spacing-sm);
    min-width: 0;
}
</style>
