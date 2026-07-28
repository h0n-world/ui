<script setup lang="ts">
import { H0Button } from '@h0nio/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <div class="click-example">
        <H0Button tone="primary" @click="count += 1">Clicked {{ count }} times</H0Button>
        <H0Button variant="ghost" :disabled="count === 0" @click="count = 0">Reset</H0Button>
    </div>
</template>

<style scoped>
.click-example {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-md);
    justify-content: center;
}

@container documentation-preview (max-width: 520px) {
    .click-example {
        align-items: center;
        flex-direction: column;
        flex-wrap: nowrap;
    }
}
</style>
