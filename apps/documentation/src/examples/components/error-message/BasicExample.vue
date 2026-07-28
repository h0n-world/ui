<script setup lang="ts">
import { H0Button, H0ErrorMessage } from '@h0nio/ui'
import { ref } from 'vue'

const dynamic = ref(false)
</script>

<template>
    <div class="error-stack">
        <div>
            <strong>Paragraph</strong>
            <H0ErrorMessage text="Your changes could not be saved." />
        </div>
        <div class="inline-error"><strong>Inline:</strong> <H0ErrorMessage as="span">Check the highlighted value.</H0ErrorMessage></div>
        <div>
            <strong>Neutral block</strong>
            <H0ErrorMessage as="div">The requested action is unavailable.</H0ErrorMessage>
        </div>
        <H0Button size="sm" @click="dynamic = !dynamic">{{ dynamic ? 'Clear dynamic error' : 'Show dynamic error' }}</H0Button>
        <H0ErrorMessage v-if="dynamic" role="alert">We could not complete the request. Try again.</H0ErrorMessage>
    </div>
</template>

<style scoped>
.error-stack {
    align-items: start;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    min-height: 18rem;
    width: min(32rem, 100%);
}

.error-stack > div:not(.inline-error) {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
}
</style>
