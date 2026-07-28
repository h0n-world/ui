<script setup lang="ts">
import { H0ButtonGroup, type H0ButtonGroupItem } from '@h0nio/ui'

const twoButtons: H0ButtonGroupItem[] = [{}, {}]
</script>

<template>
    <div class="appearance-example">
        <section>
            <span>Solid primary</span>
            <H0ButtonGroup tone="primary" aria-label="Solid primary actions">
                <template #btn-1>Save</template>
                <template #btn-2>Duplicate</template>
                <template #btn-3>Export</template>
            </H0ButtonGroup>
        </section>

        <section>
            <span>Soft</span>
            <H0ButtonGroup variant="soft" aria-label="Soft actions">
                <template #btn-1>Reply</template>
                <template #btn-2>Forward</template>
                <template #btn-3>Archive</template>
            </H0ButtonGroup>
        </section>

        <section>
            <span>Ghost</span>
            <H0ButtonGroup variant="ghost" aria-label="Ghost actions">
                <template #btn-1>Copy</template>
                <template #btn-2>Move</template>
                <template #btn-3>Archive</template>
            </H0ButtonGroup>
        </section>

        <section>
            <span>Danger</span>
            <H0ButtonGroup :buttons="twoButtons" tone="danger" aria-label="Destructive actions">
                <template #btn-1>Revoke access</template>
                <template #btn-2>Delete account</template>
            </H0ButtonGroup>
        </section>
    </div>
</template>

<style scoped>
.appearance-example {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    margin-inline: auto;
    width: min(440px, 100%);
}

.appearance-example section {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    justify-items: center;
    text-align: center;
}

.appearance-example span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
}
</style>
