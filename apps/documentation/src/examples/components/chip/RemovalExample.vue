<script setup lang="ts">
import { H0Chip } from '@h0nio/ui'
import { ref } from 'vue'

const chips = ref(['Design', 'Frontend', 'API'])
</script>

<template>
    <div class="chip-example">
        <div class="chip-row">
            <H0Chip v-for="chip in chips" :key="chip" removable :remove-aria-label="`Remove ${chip}`" @remove="chips = chips.filter((item) => item !== chip)">{{ chip }}</H0Chip>
            <H0Chip disabled removable remove-aria-label="Remove Unavailable">Unavailable</H0Chip>
        </div>
        <span>{{ chips.length }} filters remain</span>
    </div>
</template>

<style scoped>
.chip-example {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: center;
}

.chip-row {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
    justify-content: center;
}

.chip-example > span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
