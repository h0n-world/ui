<script setup lang="ts">
import { computed } from 'vue'
import { toH0CssSize } from '../_shared/utils'
import type { H0IconDefinition, H0IconStrokeLinecap, H0IconStrokeLinejoin } from './Icon.types'

defineOptions({
    name: 'H0Icon'
})

const props = withDefaults(
    defineProps<{
        icon: H0IconDefinition
        size?: number | string
        strokeWidth?: number | string
        title?: string
        strokeLinecap?: H0IconStrokeLinecap
        strokeLinejoin?: H0IconStrokeLinejoin
    }>(),
    {
        size: 20,
        strokeWidth: 2,
        title: '',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    }
)

const normalizedSize = computed(() => toH0CssSize(props.size))
const ariaHidden = computed(() => (props.title ? undefined : 'true'))
</script>

<template>
    <svg
        data-h0n-component="icon" class="h-icon"
        :width="normalizedSize"
        :height="normalizedSize"
        :viewBox="icon.viewBox ?? '0 0 24 24'"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLinecap"
        :stroke-linejoin="strokeLinejoin"
        :aria-hidden="ariaHidden"
        :role="title ? 'img' : undefined"
        :data-icon="icon.name"
    >
        <title v-if="title">{{ title }}</title>
        <template v-for="(node, index) in icon.nodes" :key="index">
            <path v-if="node[0] === 'path'" v-bind="node[1]" />
            <circle v-else-if="node[0] === 'circle'" v-bind="node[1]" />
            <line v-else-if="node[0] === 'line'" v-bind="node[1]" />
            <polyline v-else v-bind="node[1]" />
        </template>
    </svg>
</template>

<style scoped lang="scss">
.h-icon {
    color: currentColor;
    display: inline-block;
    flex: 0 0 auto;
    stroke: currentColor;
    vertical-align: middle;
}

.h-icon :deep(path),
.h-icon :deep(circle),
.h-icon :deep(line),
.h-icon :deep(polyline) {
    vector-effect: non-scaling-stroke;
}
</style>
