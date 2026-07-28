<script setup lang="ts">
import { H0Skeleton } from '@h0nio/ui'
</script>

<template><div class="card-skeleton" role="status" aria-label="Loading article"><H0Skeleton height="10rem" radius="var(--h0n-ui-radius-xl)" /><H0Skeleton width="70%" height="20px" /><H0Skeleton variant="text" width="94%" /><H0Skeleton variant="text" width="76%" /></div></template>

<style scoped>
.card-skeleton { display: grid; gap: var(--h0n-ui-spacing-sm); width: min(26rem, 100%); }
</style>
