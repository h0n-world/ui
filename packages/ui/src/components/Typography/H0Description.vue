<script setup lang="ts">
import H0Typography from './H0Typography.vue'
import type { H0DescriptionElement, H0DescriptionVariant } from './Typography.types'

defineOptions({
    name: 'H0Description'
})

withDefaults(
    defineProps<{
        as?: H0DescriptionElement
        text?: string | number
        variant?: H0DescriptionVariant
    }>(),
    {
        as: 'p',
        text: '',
        variant: 'body-sm'
    }
)
</script>

<template>
    <H0Typography data-h0n-component="description" class="h-description" :as="as" :variant="variant" color="muted" :weight="400">
        <slot>{{ text }}</slot>
    </H0Typography>
</template>

<style scoped lang="scss">
.h-description {
    line-height: 1.45;
}
</style>
