<script setup lang="ts">
import searchIcon from '@h0nio/icons/search'
import { computed, useAttrs, useTemplateRef } from 'vue'
import { useH0ControllableState } from '../../composables'
import H0Icon from '../Icon/H0Icon.vue'
import H0Input from '../Input/H0Input.vue'
import type { H0InputSize } from '../Input/Input.types'
import type { H0SearchFieldEmits, H0SearchFieldVariant } from './SearchField.types'

defineOptions({
    name: 'H0SearchField',
    inheritAttrs: false
})

type H0InputInstance = {
    clear: () => void
    focus: () => void
    setValue: (value: string) => void
}

const props = withDefaults(
    defineProps<{
        modelValue?: string
        variant?: H0SearchFieldVariant
        size?: H0InputSize
        label?: string
        placeholder?: string
        disabled?: boolean
        readonly?: boolean
        required?: boolean
        error?: string
        hint?: string
        clearable?: boolean
        id?: string
        name?: string
        autocomplete?: string
        ariaLabel?: string
        defaultValue?: string
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        variant: 'surface',
        size: 'sm',
        label: '',
        placeholder: 'Search...',
        disabled: false,
        readonly: false,
        required: false,
        error: '',
        hint: '',
        clearable: true,
        id: '',
        name: '',
        autocomplete: 'off',
        ariaLabel: '',
        defaultValue: ''
    }
)

const emit = defineEmits<H0SearchFieldEmits>()
const attrs = useAttrs()
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))
const field = useTemplateRef<H0InputInstance>('field')
const state = useH0ControllableState({
    modelValue: () => props.modelValue,
    defaultValue: () => props.defaultValue,
    onUpdate: (value) => emit('update:modelValue', value)
})
const currentValue = state.value

function handleUpdate(value: string) {
    state.setValue(value)
}

function handleInput(value: string, event: Event) {
    emit('input', value, event)
}

function clear() {
    if (!currentValue.value) {
        return
    }

    field.value?.clear()
}

function focus() {
    field.value?.focus()
}

function setValue(value: string) {
    field.value?.setValue(value)
}

defineExpose({
    clear,
    focus,
    setValue
})
</script>

<template>
    <div v-bind="mergedRootAttrs" data-h0n-component="search-field">
        <H0Input
            ref="field"
            type="search"
            :model-value="currentValue"
            :default-value="defaultValue"
            :variant="variant"
            :size="size"
            :label="label"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :required="required"
            :error="error"
            :hint="hint"
            :clearable="clearable"
            :id="id"
            :name="name"
            :autocomplete="autocomplete"
            :aria-label="ariaLabel"
            :control-attrs="props.controlAttrs"
            inputmode="search"
            @update:model-value="handleUpdate"
            @input="handleInput"
            @clear="emit('clear')"
            @blur="emit('blur', $event)"
            @focus="emit('focus', $event)"
        >
            <template #start>
                <span class="h-search-field__icon" aria-hidden="true">
                    <slot name="icon">
                        <H0Icon :icon="searchIcon" :size="20" />
                    </slot>
                </span>
            </template>
        </H0Input>
    </div>
</template>

<style scoped lang="scss">
.h-search-field__icon {
    align-items: center;
    color: var(--h0n-ui-color-muted);
    display: inline-flex;
    justify-content: center;
}

:deep(.h-input__field) {
    appearance: none;

    &::-webkit-search-cancel-button {
        appearance: none;
    }
}
</style>
