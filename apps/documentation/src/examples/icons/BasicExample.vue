<script setup lang="ts">
import heartIcon from '@h0nio/icons/heart-duotone'
import paletteIcon from '@h0nio/icons/palette-duotone'
import starIcon from '@h0nio/icons/star-duotone'
import { renderIcon, type IconDefinition } from '@h0nio/icons/runtime'
import { H0CellColorPicker, H0Select, type H0SelectOption } from '@h0nio/ui'
import { ref } from 'vue'

const color = ref('#6D5DFC')
const size = ref<number>(34)
const sizeOptions: H0SelectOption<number>[] = [24, 34, 46, 64].map((value) => ({
    label: `${value}px`,
    value,
}))
const examples: { icon: IconDefinition; label: string }[] = [
    { icon: heartIcon, label: 'Favorite' },
    { icon: paletteIcon, label: 'Appearance' },
    { icon: starIcon, label: 'Featured' },
]
</script>

<template>
    <div class="icons-example">
        <div class="icons-example__controls">
            <H0Select v-model="size" label="Size" :options="sizeOptions" />
            <div class="icons-example__color">
                <span>Color</span>
                <H0CellColorPicker
                    v-model="color"
                    display="minimal"
                    swatch-position="left"
                    aria-label="Preview color"
                />
            </div>
        </div>

        <div class="icons-example__grid">
            <figure v-for="item in examples" :key="item.icon.name">
                <span
                    class="icons-example__glyph"
                    v-html="renderIcon(item.icon, { color, size, title: item.label })"
                ></span>
                <figcaption>
                    <strong>{{ item.label }}</strong>
                    <code>{{ item.icon.name }}</code>
                </figcaption>
            </figure>
        </div>
    </div>
</template>

<style scoped>
.icons-example {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    width: 100%;
}

.icons-example__controls {
    align-items: end;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    grid-template-columns: minmax(9rem, 12rem) minmax(11rem, 1fr);
}

.icons-example__color {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    justify-items: start;
}

.icons-example__color > span {
    color: var(--h0n-ui-color-text);
    font-size: var(--h0n-ui-typography-body-sm-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
}

.icons-example__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

figure {
    align-content: space-between;
    border: 1px solid var(--h0n-ui-color-border);
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    min-height: 12rem;
    min-width: 0;
    padding: var(--h0n-ui-spacing-lg);
}

figure + figure {
    border-inline-start: 0;
}

.icons-example__glyph {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 5rem;
}

.icons-example__glyph :deep(svg) {
    display: block;
}

figcaption {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    min-width: 0;
}

figcaption strong {
    font-size: var(--h0n-ui-typography-body-sm-size);
}

figcaption code {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-xs-size);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@container documentation-preview (max-width: 560px) {
    .icons-example__controls,
    .icons-example__grid {
        grid-template-columns: 1fr;
    }

    figure + figure {
        border-inline-start: 1px solid var(--h0n-ui-color-border);
        border-top: 0;
    }
}
</style>
