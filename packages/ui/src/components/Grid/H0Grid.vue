<script lang="ts" setup>
import type { H0GridGap, H0GridVariant } from './Grid.types'
import { computed } from 'vue'

defineOptions({
    name: 'H0Grid'
})

const props = withDefaults(
    defineProps<{
        as?: 'div' | 'section' | 'article' | 'main'
        variant?: H0GridVariant
        gap?: H0GridGap
        columns?: string
        rows?: string
    }>(),
    {
        as: 'div',
        variant: 'auto-fit',
        gap: 'md'
    }
)

const classes = computed(() => [`h-grid--${props.variant}`])
function normalizeTrackValue(value: string) {
    return value.replace(/;$/, '').trim()
}

function parseGridTemplateDeclaration(value?: string) {
    if (!value) {
        return undefined
    }

    const match = value.match(/^(grid-template-columns|grid-template-rows)\s*:\s*(.+)$/i)

    if (!match) {
        return {
            property: 'gridTemplateColumns',
            value: normalizeTrackValue(value)
        } as const
    }

    return {
        property: match[1].toLowerCase() === 'grid-template-rows' ? 'gridTemplateRows' : 'gridTemplateColumns',
        value: normalizeTrackValue(match[2])
    } as const
}

const columns = computed(() => parseGridTemplateDeclaration(props.columns))
const rows = computed(() => (props.rows ? normalizeTrackValue(props.rows.replace(/^grid-template-rows\s*:\s*/i, '')) : undefined))

const gridStyle = computed(() => {
    const style: Record<string, string> = {
        '--h-grid-gap': `var(--h0n-ui-spacing-${props.gap})`
    }

    if (columns.value) {
        style[columns.value.property] = columns.value.value
    }

    if (rows.value) {
        style.gridTemplateRows = rows.value
    }

    return style
})
</script>

<template>
    <component :is="as" data-h0n-component="grid" class="h-grid" :class="classes" :style="gridStyle">
        <slot />
    </component>
</template>

<style lang="scss" scoped>
.h-grid {
    display: grid;
    gap: var(--h-grid-gap);

    height: 100%;
    width: 100%;

    &--auto-fit {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    &--vertical {
        grid-template-columns: minmax(0, 1fr);
    }

    &--three {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    &--center-wide {
        grid-template-columns:
            minmax(0, 1fr)
            minmax(320px, 2fr)
            minmax(0, 1fr);
    }

    &--sidebar-left {
        grid-template-columns: 280px minmax(0, 1fr);
    }

    &--sidebar-right {
        grid-template-columns: minmax(0, 1fr) 280px;
    }
}
</style>
