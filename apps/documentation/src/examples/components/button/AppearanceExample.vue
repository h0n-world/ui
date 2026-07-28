<script setup lang="ts">
import { H0Button } from '@h0nio/ui'
</script>

<template>
    <div class="appearance-example">
        <section>
            <span>Solid</span>
            <div>
                <H0Button>Default</H0Button>
                <H0Button tone="primary">Primary</H0Button>
                <H0Button tone="success">Success</H0Button>
                <H0Button tone="warning">Warning</H0Button>
                <H0Button tone="danger">Danger</H0Button>
            </div>
        </section>

        <section>
            <span>Soft</span>
            <div>
                <H0Button variant="soft">Default</H0Button>
                <H0Button tone="primary" variant="soft">Primary</H0Button>
                <H0Button tone="success" variant="soft">Success</H0Button>
                <H0Button tone="warning" variant="soft">Warning</H0Button>
                <H0Button tone="danger" variant="soft">Danger</H0Button>
            </div>
        </section>

        <section>
            <span>Quiet</span>
            <div>
                <H0Button variant="outline">Outline</H0Button>
                <H0Button variant="ghost">Ghost</H0Button>
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
.appearance-example {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    margin-inline: auto;
    width: min(640px, 100%);

    section {
        display: grid;
        gap: var(--h0n-ui-spacing-sm);
        justify-items: center;
        text-align: center;
    }

    section > span {
        color: var(--h0n-ui-color-muted);
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-semibold);
    }

    section > div {
        display: flex;
        flex-wrap: wrap;
        gap: var(--h0n-ui-spacing-sm);
        justify-content: center;
    }
}

@container documentation-preview (max-width: 520px) {
    .appearance-example section > div {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }
}
</style>
