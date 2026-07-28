<script setup lang="ts">
import H0Typography from './H0Typography.vue'
import type { H0ErrorMessageElement } from './Typography.types'

defineOptions({
    name: 'H0ErrorMessage'
})

withDefaults(
    defineProps<{
        as?: H0ErrorMessageElement
        text?: string | number
    }>(),
    {
        as: 'p',
        text: ''
    }
)
</script>

<template>
    <H0Typography data-h0n-component="error-message" class="h-error-message" :as="as" variant="body-sm" :weight="500">
        <slot>{{ text }}</slot>
    </H0Typography>
</template>

<style scoped lang="scss">
.h-error-message {
    color: var(--h0n-ui-color-danger);
    line-height: 1.35;
}
</style>
