<script setup lang="ts">
import { inject, onBeforeUnmount, useSlots } from 'vue'
import { previewActionsKey } from './previewActions'

defineOptions({ name: 'DocumentationPreviewActions' })

const slots = useSlots()
const actions = inject(previewActionsKey, undefined)
if (actions) actions.value = slots.default

onBeforeUnmount(() => {
    if (actions && actions.value === slots.default) actions.value = undefined
})
</script>

<template>
    <slot v-if="!actions" />
</template>
