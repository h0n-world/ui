<script setup lang="ts">
import { computed, useId } from 'vue'
import { toH0CssSize } from '../_shared/utils'
import type { H0IconBodyDefinition, H0IconSource, H0IconStrokeLinecap, H0IconStrokeLinejoin } from './Icon.types'

defineOptions({
    name: 'H0Icon'
})

const props = withDefaults(
    defineProps<{
        icon: H0IconSource
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
const instanceId = `h-icon-${useId().replace(/[^a-zA-Z0-9_-]/g, '-')}`
const isBodyIcon = computed((): boolean => 'body' in props.icon)
const legacyNodes = computed(() => ('nodes' in props.icon ? props.icon.nodes : []))
const scopedBody = computed(() => {
    if (!('body' in props.icon)) return ''

    return scopeSvgIds(props.icon, instanceId)
})

function scopeSvgIds(icon: H0IconBodyDefinition, prefix: string) {
    const ids = new Map<string, string>()
    const scopedId = (id: string) => {
        const existing = ids.get(id)
        if (existing) return existing

        const value = `${prefix}-${id}`
        ids.set(id, value)
        return value
    }

    return icon.body
        .replace(/\bid="([^"]+)"/g, (_match, id: string) => `id="${scopedId(id)}"`)
        .replace(/url\(#([^)]+)\)/g, (_match, id: string) => `url(#${scopedId(id)})`)
        .replace(/(href|xlink:href)="#([^"]+)"/g, (_match, attribute: string, id: string) => `${attribute}="#${scopedId(id)}"`)
}
</script>

<template>
    <svg
        data-h0n-component="icon"
        :class="['h-icon', { 'h-icon--legacy': !isBodyIcon }]"
        :width="normalizedSize"
        :height="normalizedSize"
        :viewBox="icon.viewBox ?? '0 0 24 24'"
        fill="none"
        :stroke="isBodyIcon ? undefined : 'currentColor'"
        xmlns="http://www.w3.org/2000/svg"
        :stroke-width="isBodyIcon ? undefined : strokeWidth"
        :stroke-linecap="isBodyIcon ? undefined : strokeLinecap"
        :stroke-linejoin="isBodyIcon ? undefined : strokeLinejoin"
        :aria-hidden="ariaHidden"
        :role="title ? 'img' : undefined"
        :data-icon="icon.name"
    >
        <title v-if="title">{{ title }}</title>
        <g v-if="isBodyIcon" v-html="scopedBody" />
        <template v-else>
            <template v-for="(node, index) in legacyNodes" :key="index">
                <path v-if="node[0] === 'path'" v-bind="node[1]" />
                <circle v-else-if="node[0] === 'circle'" v-bind="node[1]" />
                <line v-else-if="node[0] === 'line'" v-bind="node[1]" />
                <polyline v-else v-bind="node[1]" />
            </template>
        </template>
    </svg>
</template>

<style scoped lang="scss">
.h-icon {
    color: currentColor;
    display: inline-block;
    flex: 0 0 auto;
    vertical-align: middle;
}

.h-icon--legacy :deep(path),
.h-icon--legacy :deep(circle),
.h-icon--legacy :deep(line),
.h-icon--legacy :deep(polyline) {
    vector-effect: non-scaling-stroke;
}
</style>
