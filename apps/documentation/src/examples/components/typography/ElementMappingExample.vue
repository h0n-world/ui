<script setup lang="ts">
import { H0Typography, type H0TypographyElement, type H0TypographyVariant } from '@h0nio/ui'

const mappings: Array<{ variant: H0TypographyVariant; element: H0TypographyElement }> = [
    { variant: 'h1', element: 'h1' },
    { variant: 'h2', element: 'h2' },
    { variant: 'h3', element: 'h3' },
    { variant: 'h4', element: 'h4' },
    { variant: 'h5', element: 'h5' },
    { variant: 'h6', element: 'h6' },
    { variant: 'body', element: 'p' },
    { variant: 'body-sm', element: 'p' },
    { variant: 'body-xs', element: 'span' },
    { variant: 'code', element: 'code' },
]
</script>

<template>
    <div class="element-map">
        <div v-for="item in mappings" :key="item.variant" class="element-map__row">
            <code>{{ item.variant }}</code>
            <span aria-hidden="true">&rarr;</span>
            <code>&lt;{{ item.element }}&gt;</code>
            <H0Typography :variant="item.variant" class="element-map__preview" role="presentation">Rendered element</H0Typography>
        </div>
    </div>
</template>

<style scoped>
.element-map {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    width: 100%;
}

.element-map__row {
    display: grid;
    grid-template-columns: minmax(4.5rem, auto) auto minmax(3.5rem, auto) minmax(0, 1fr);
    align-items: baseline;
    gap: var(--h0n-ui-spacing-sm);
    padding-block: var(--h0n-ui-spacing-xs);
    border-bottom: 1px solid var(--h0n-ui-color-border);
}

.element-map__row > code,
.element-map__row > span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
}

.element-map__preview {
    overflow: hidden;
}

@media (max-width: 40rem) {
    .element-map__row {
        grid-template-columns: minmax(4rem, auto) auto minmax(3.5rem, 1fr);
    }

    .element-map__preview {
        grid-column: 1 / -1;
    }
}
</style>
