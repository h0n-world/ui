<script setup lang="ts">
import { computed } from 'vue'
import type { H0TypographyAlign, H0TypographyColor, H0TypographyElement, H0TypographyLetterSpacing, H0TypographyLineHeight, H0TypographyTextTransform, H0TypographyVariant, H0TypographyWeight } from './Typography.types'

defineOptions({
    name: 'H0Typography'
})

const props = withDefaults(
    defineProps<{
        variant?: H0TypographyVariant
        as?: H0TypographyElement
        align?: H0TypographyAlign
        color?: H0TypographyColor
        truncate?: boolean
        text?: string | number
        weight?: H0TypographyWeight
        lineHeight?: H0TypographyLineHeight
        letterSpacing?: H0TypographyLetterSpacing
        textTransform?: H0TypographyTextTransform
    }>(),
    {
        variant: 'body',
        align: 'left',
        color: 'default',
        truncate: false
    }
)

const defaultElementByVariant: Record<H0TypographyVariant, H0TypographyElement> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    'body-sm': 'p',
    'body-xs': 'span',
    code: 'code'
}

const tag = computed(() => props.as ?? defaultElementByVariant[props.variant])
const weightClass = computed(() => (props.weight ? `h-typography--weight-${props.weight}` : undefined))
const typographyStyle = computed(() => ({
    lineHeight: props.lineHeight === undefined ? undefined : String(props.lineHeight),
    letterSpacing: props.letterSpacing === undefined
        ? undefined
        : typeof props.letterSpacing === 'number'
            ? `${props.letterSpacing}px`
            : props.letterSpacing,
    textTransform: props.textTransform
}))
</script>

<template>
    <component
        :is="tag"
        data-h0n-component="typography"
        class="h-typography"
        :class="[`h-typography--${variant}`, `h-typography--align-${align}`, `h-typography--color-${color}`, weightClass, { 'h-typography--truncate': truncate }]"
        :style="typographyStyle"
    >
        <template v-if="text !== undefined">{{ text }}</template>
        <slot v-else />
    </component>
</template>

<style scoped lang="scss">
.h-typography {
    margin: 0;
    font-family: var(--h0n-ui-font-family);
    color: var(--h0n-ui-color-text);
}

.h-typography--h1 {
    font-size: var(--h0n-ui-typography-h1-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
    line-height: 1.11;
    letter-spacing: 0;
}

.h-typography--h2 {
    font-size: var(--h0n-ui-typography-h2-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
    line-height: 1.17;
    letter-spacing: 0;
}

.h-typography--h3 {
    font-size: var(--h0n-ui-typography-h3-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
    line-height: 1.25;
    letter-spacing: 0;
}

.h-typography--h4 {
    font-size: var(--h0n-ui-typography-h4-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
    line-height: 1.33;
    letter-spacing: 0;
}

.h-typography--h5 {
    font-size: var(--h0n-ui-typography-h5-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
    line-height: 1.39;
    letter-spacing: 0;
}

.h-typography--h6 {
    font-size: var(--h0n-ui-typography-h6-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
    line-height: 1.5;
    letter-spacing: 0;
}

.h-typography--body {
    font-size: var(--h0n-ui-typography-body-size);
    font-weight: var(--h0n-ui-font-weight-regular);
    line-height: 1.75;
    letter-spacing: 0;
}

.h-typography--body-sm {
    font-size: var(--h0n-ui-typography-body-sm-size);
    font-weight: var(--h0n-ui-font-weight-regular);
    line-height: 1.5;
    letter-spacing: 0;
}

.h-typography--body-xs {
    font-size: var(--h0n-ui-typography-body-xs-size);
    font-weight: var(--h0n-ui-font-weight-regular);
    line-height: 1.25;
    letter-spacing: 0;
}

.h-typography--code {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
    font-size: var(--h0n-ui-typography-code-size);
    font-weight: var(--h0n-ui-font-weight-regular);
    line-height: 1.5;
    letter-spacing: 0;
}

.h-typography--align-left {
    text-align: left;
}

.h-typography--weight-400 {
    font-weight: var(--h0n-ui-font-weight-regular);
}

.h-typography--weight-500 {
    font-weight: var(--h0n-ui-font-weight-medium);
}

.h-typography--weight-600 {
    font-weight: var(--h0n-ui-font-weight-semibold);
}

.h-typography--weight-700 {
    font-weight: var(--h0n-ui-font-weight-bold);
}

.h-typography--align-center {
    text-align: center;
}

.h-typography--align-right {
    text-align: right;
}

.h-typography--color-muted {
    color: var(--h0n-ui-color-muted);
}

.h-typography--color-secondary {
    color: var(--h0n-ui-color-text-secondary);
}

.h-typography--color-primary {
    color: var(--h0n-ui-color-primary);
}

.h-typography--color-inherit {
    color: inherit;
}

.h-typography--truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
