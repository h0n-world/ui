<script setup lang="ts">
import type { H0LabelElement } from './Typography.types'

defineOptions({
    name: 'H0Label'
})

withDefaults(
    defineProps<{
        as?: H0LabelElement
        htmlFor?: string
        text?: string | number
        required?: boolean
    }>(),
    {
        as: 'label',
        htmlFor: '',
        text: '',
        required: false
    }
)
</script>

<template>
    <component :is="as" data-h0n-component="label" class="h-label" :for="as === 'label' ? htmlFor || undefined : undefined">
        <slot>{{ text }}</slot>
        <span v-if="required" class="h-label__required" aria-hidden="true">*</span>
    </component>
</template>

<style scoped lang="scss">
.h-label {
    color: var(--h0n-ui-color-text);
    display: inline-flex;
    font-family: var(--h0n-ui-font-family);
    font-size: var(--h0n-ui-typography-body-sm-size);
    gap: 4px;
    font-weight: var(--h0n-ui-font-weight-semibold);
    line-height: 1.3;
}

.h-label__required {
    color: var(--h0n-ui-color-danger);
}
</style>
