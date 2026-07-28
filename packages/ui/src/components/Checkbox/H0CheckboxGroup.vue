<script setup lang="ts">
import { checkIcon } from '../../icons'
import H0Icon from '../Icon/H0Icon.vue'
import { useTemplateRef } from 'vue'
import H0Label from '../Typography/H0Label.vue'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import { useFormField } from '../_shared/useFormField'
import type { H0CheckboxOption } from './Checkbox.types'
import { useH0ControllableState } from '../../composables/useH0ControllableState'

defineOptions({
    name: 'H0CheckboxGroup'
})

const props = withDefaults(
    defineProps<{
        modelValue?: string[]
        options: H0CheckboxOption[]
        disabled?: boolean
        label?: string
        id?: string
        name?: string
        required?: boolean
        error?: string
        hint?: string
        defaultValue?: string[]
    }>(),
    {
        disabled: false,
        label: '',
        id: '',
        name: '',
        required: false,
        error: '',
        hint: '',
        defaultValue: () => []
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: string[]]
    change: [value: string[]]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
}>()

const inputRefs = useTemplateRef<HTMLInputElement[]>('inputRefs')
const state = useH0ControllableState({
    modelValue: () => props.modelValue,
    defaultValue: () => [...props.defaultValue],
    onUpdate: (value) => emit('update:modelValue', value)
})
const { controlId, hasMessage, messageId, setFormValue, visibleError } = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error,
    hint: () => props.hint,
    idPrefix: 'h-checkbox-group',
    getValue: () => state.value.value,
    focus: () => inputRefs.value?.find((input) => !input.disabled)?.focus(),
    reset: () => {
        const value = state.reset()
        emit('change', value)
        return value
    }
})

function isChecked(value: string) {
    return state.value.value.includes(value)
}

function toggle(value: string, disabled?: boolean) {
    if (props.disabled || disabled) {
        return
    }

    const currentValue = state.value.value
    const nextValue = isChecked(value) ? currentValue.filter((item) => item !== value) : [...currentValue, value]

    state.setValue(nextValue)
    emit('change', nextValue)
    setFormValue(nextValue)
}
</script>

<template>
    <fieldset :id="controlId" data-h0n-component="checkbox-group" class="h-checkbox-group" :class="visibleError && 'h-checkbox-group--error'" :disabled="disabled" :aria-invalid="Boolean(visibleError)" :aria-describedby="hasMessage ? messageId : undefined">
        <H0Label v-if="label || $slots.label" as="legend" class="h-checkbox-group__legend" :required="required">
            <slot name="label">{{ label }}</slot>
        </H0Label>
        <label v-for="option in options" :key="option.value" class="h-checkbox-group__item" :class="[(disabled || option.disabled) && 'h-checkbox-group__item--disabled']">
            <input
                ref="inputRefs"
                class="h-checkbox-group__input"
                type="checkbox"
                :name="name || undefined"
                :value="option.value"
                :checked="isChecked(option.value)"
                :disabled="disabled || option.disabled"
                @blur="emit('blur', $event)"
                @change="toggle(option.value, option.disabled)"
                @focus="emit('focus', $event)"
            />
            <span class="h-checkbox-group__box" aria-hidden="true">
                <H0Icon class="h-checkbox-group__mark" :icon="checkIcon" :size="14" :stroke-width="3" />
            </span>
            <span class="h-checkbox-group__label">{{ option.label }}</span>
        </label>
        <H0ErrorMessage v-if="visibleError" :id="messageId" as="span" role="alert">{{ visibleError }}</H0ErrorMessage>
        <H0Description v-else-if="hint" :id="messageId" as="span">{{ hint }}</H0Description>
    </fieldset>
</template>

<style scoped lang="scss">
.h-checkbox-group {
    border: 0;
    display: grid;
    gap: 12px;
    margin: 0;
    min-width: 0;
    padding: 0;

    &__legend {
        color: var(--h0n-ui-color-text);
        margin-bottom: 10px;
        padding: 0;
    }

    &__item {
        align-items: center;
        color: var(--h0n-ui-color-text);
        cursor: pointer;
        display: inline-flex;
        font-family: var(--h0n-ui-font-family);
        gap: 10px;
        min-width: 0;
        position: relative;
    }

    &__item--disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }

    &__input {
        height: 1px;
        opacity: 0;
        position: absolute;
        width: 1px;
    }

    &__box {
        align-items: center;
        background: var(--h0n-ui-color-secondary);
        border-radius: var(--h0n-ui-radius-sm);
        display: inline-flex;
        flex: 0 0 auto;
        height: 22px;
        justify-content: center;
        width: 22px;
    }

    &__mark {
        color: var(--h0n-ui-color-primary-contrast);
        opacity: 0;
        transform: scale(0.7);
        transition:
            opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            transform var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
    }

    &__label {
        font-size: var(--h0n-ui-typography-body-size);
        font-weight: var(--h0n-ui-font-weight-medium);
        line-height: 1.35;
    }

    &__input:checked + &__box {
        background: var(--h0n-ui-color-primary);
        border-color: var(--h0n-ui-color-primary);
    }

    &__input:checked + &__box &__mark {
        opacity: 1;
        transform: scale(1);
    }

    &__input:focus-visible + &__box {
        box-shadow: var(--h0n-ui-focus-ring);
    }
}
</style>
