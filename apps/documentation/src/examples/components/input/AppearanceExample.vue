<script setup lang="ts">
import searchIcon from '@h0nio/icons/search'
import { H0Input } from '@h0nio/ui'
</script>

<template>
    <div class="stack">
        <H0Input label="Small" size="sm" placeholder="Compact controls" />
        <H0Input
            label="Medium with affixes"
            prefix="https://"
            suffix=".com"
            placeholder="example"
        />
        <H0Input
            label="Large search"
            size="lg"
            :prefix-icon="searchIcon"
            placeholder="Search projects"
            clearable
        />
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: min(26rem, 100%);
}
</style>
