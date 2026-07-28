<script setup lang="ts">
import { H0Checkbox } from '@h0nio/ui'
import { computed, ref } from 'vue'

const selected = ref(['design'])
const all = computed(() => selected.value.length === 3)
const mixed = computed(() => selected.value.length > 0 && !all.value)
const choices = ['design', 'engineering', 'research']

function toggleAll(value: boolean) {
    selected.value = value ? [...choices] : []
}
</script>

<template>
    <div class="stack">
        <H0Checkbox :model-value="all" :indeterminate="mixed" label="All teams" @update:model-value="toggleAll" />
        <div class="children">
            <H0Checkbox
                v-for="choice in choices"
                :key="choice"
                :model-value="selected.includes(choice)"
                :label="choice"
                @update:model-value="(checked) => (selected = checked ? [...selected, choice] : selected.filter((item) => item !== choice))"
            />
        </div>
        <H0Checkbox label="Unavailable option" disabled />
        <H0Checkbox label="Accept policy" error="You must accept the policy." />
    </div>
</template>

<style scoped>
.stack,
.children {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
}
.children {
    padding-inline-start: var(--h0n-ui-spacing-lg);
}
</style>
