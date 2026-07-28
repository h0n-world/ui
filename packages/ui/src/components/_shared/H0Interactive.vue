<script setup lang="ts">
import { computed, useAttrs, type Component } from 'vue'

defineOptions({
    name: 'H0Interactive',
    inheritAttrs: false
})

const props = withDefaults(
    defineProps<{
        as?: string | Component
        disabled?: boolean
        interactive?: boolean
        type?: 'button' | 'submit' | 'reset'
    }>(),
    {
        as: 'button',
        disabled: false,
        interactive: true,
        type: 'button'
    }
)

const attrs = useAttrs()
const isNativeButton = computed(() => props.as === 'button')
const isNativeLink = computed(() => props.as === 'a' || typeof attrs.href === 'string' || attrs.to !== undefined)
const isCustomInteractive = computed(() => props.interactive && !isNativeButton.value && !isNativeLink.value)

function handleClick(event: MouseEvent) {
    if (!props.disabled) {
        return
    }

    event.preventDefault()
    event.stopImmediatePropagation()
}

function handleKeydown(event: KeyboardEvent) {
    if (!isCustomInteractive.value || props.disabled || (event.key !== 'Enter' && event.key !== ' ')) {
        return
    }

    event.preventDefault()
    const target = event.currentTarget as HTMLElement

    target.click()
}
</script>

<template>
    <component
        :is="as"
        v-bind="attrs"
        :type="isNativeButton ? type : undefined"
        :disabled="isNativeButton ? disabled : undefined"
        :aria-disabled="!isNativeButton && disabled ? 'true' : undefined"
        :role="isCustomInteractive ? 'button' : undefined"
        :tabindex="isCustomInteractive && !disabled ? 0 : disabled && !isNativeButton ? -1 : undefined"
        @click.capture="handleClick"
        @keydown="handleKeydown"
    >
        <slot />
    </component>
</template>
