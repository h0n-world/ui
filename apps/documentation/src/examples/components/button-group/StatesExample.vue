<script setup lang="ts">
import { H0ButtonGroup, type H0ButtonGroupItem } from '@h0nio/ui'

const loadingButtons: H0ButtonGroupItem[] = [
    { label: 'Previous' },
    { label: 'Publishing', loading: true, loadingText: 'Publishing' },
    { label: 'Next' },
]

const mixedButtons: H0ButtonGroupItem[] = [
    { label: 'Locked' },
    { label: 'Available', disabled: false },
    { label: 'Locked' },
]
</script>

<template>
    <div class="states-example">
        <section>
            <span>One loading action</span>
            <H0ButtonGroup :buttons="loadingButtons" aria-label="Publishing actions" />
        </section>

        <section>
            <span>Entire group disabled</span>
            <H0ButtonGroup disabled aria-label="Disabled document actions">
                <template #btn-1>Save</template>
                <template #btn-2>Duplicate</template>
                <template #btn-3>Delete</template>
            </H0ButtonGroup>
        </section>

        <section>
            <span>One item overrides the group</span>
            <H0ButtonGroup disabled :buttons="mixedButtons" aria-label="Mixed availability actions" />
        </section>
    </div>
</template>

<style scoped>
.states-example {
    display: grid;
    gap: var(--h0n-ui-spacing-xl);
    margin-inline: auto;
    width: min(520px, 100%);
}

.states-example section {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: center;
    text-align: center;
}

.states-example span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
}
</style>
