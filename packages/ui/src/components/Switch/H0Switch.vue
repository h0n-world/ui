<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue'
import { useFormField } from '../_shared/useFormField'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
defineOptions({
    name: 'H0Switch',
    inheritAttrs: false
})

const props = withDefaults(
    defineProps<{
        disabled?: boolean
        modelValue?: boolean
        id?: string
        name?: string
        label?: string
        required?: boolean
        error?: string
        hint?: string
        value?: string
        defaultValue?: boolean
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        modelValue: undefined,
        disabled: false,
        id: '',
        name: '',
        label: '',
        required: false,
        error: '',
        hint: '',
        value: 'on',
        defaultValue: false
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    change: [value: boolean]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
}>()
const attrs = useAttrs()
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))

const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
const state = useH0ControllableState({
    modelValue: () => props.modelValue,
    defaultValue: () => props.defaultValue,
    onUpdate: (value) => emit('update:modelValue', value)
})
const currentValue = state.value
const { controlId, fieldContext, hasMessage, messageId, resolvedDisabled, resolvedHint, resolvedLabel, resolvedName, resolvedRequired, setFormValue, visibleError } = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error,
    hint: () => props.hint,
    idPrefix: 'h-switch',
    getValue: () => currentValue.value,
    getValidationMessage: () => inputRef.value?.validationMessage ?? '',
    focus: () => inputRef.value?.focus(),
    reset: () => {
        const value = state.reset()
        emit('change', value)
        return value
    }
})

function handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).checked

    state.setValue(value)
    emit('change', value)
    setFormValue(value)
}
</script>

<template>
    <div v-bind="mergedRootAttrs" data-h0n-component="switch" class="h-switch-field" :class="visibleError && 'h-switch-field--error'">
        <label class="h-switch-label" :class="resolvedDisabled && 'h-switch-label--disabled'">
            <input
                v-bind="props.controlAttrs"
                :id="controlId"
                ref="inputRef"
                class="h-switch__input"
                type="checkbox"
                role="switch"
                :name="resolvedName || undefined"
                :value="value"
                :checked="currentValue"
                :required="resolvedRequired"
                :disabled="resolvedDisabled"
                :aria-checked="currentValue"
                :aria-label="resolvedLabel || 'Switch'"
                :aria-invalid="Boolean(visibleError)"
                :aria-describedby="hasMessage ? messageId : undefined"
                @blur="emit('blur', $event)"
                @change="handleChange"
                @focus="emit('focus', $event)"
            />
            <span class="h-switch" :class="{ 'h-switch--checked': currentValue }" aria-hidden="true"><span class="h-switch__thumb" /></span>
            <span v-if="!fieldContext && (resolvedLabel || $slots.default)" class="h-switch__label"><slot>{{ resolvedLabel }}</slot></span>
        </label>
        <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId" as="span" role="alert">{{ visibleError }}</H0ErrorMessage>
        <H0Description v-else-if="!fieldContext && resolvedHint" :id="messageId" as="span">{{ resolvedHint }}</H0Description>
    </div>
</template>

<style scoped lang="scss">
.h-switch {
    --h-switch-bg: color-mix(in srgb, var(--h0n-ui-color-secondary) 78%, var(--h0n-ui-color-text) 22%);
    --h-switch-thumb-x: 0;

    align-items: center;
    background: var(--h-switch-bg);
    border: 0;
    border-radius: var(--h0n-ui-radius-round);
    cursor: pointer;
    display: inline-flex;
    flex: 0 0 auto;
    height: 28px;
    padding: 3px;
    transition:
        background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
        box-shadow var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
        opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
    width: 52px;

    &--checked {
        --h-switch-bg: var(--h0n-ui-color-primary);
        --h-switch-thumb-x: 24px;
    }

    &__thumb {
        background: var(--h0n-ui-color-primary-contrast);
        border-radius: 50%;
        box-shadow: var(--h0n-ui-shadow);
        display: block;
        height: 22px;
        transform: translateX(var(--h-switch-thumb-x));
        transition: transform var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
        width: 22px;
    }
}

.h-switch-field {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
}

.h-switch-label {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    gap: var(--h0n-ui-spacing-sm);
    width: fit-content;
}

.h-switch-label--disabled {
    cursor: not-allowed;
    opacity: 0.55;
}

.h-switch__input {
    height: 1px;
    opacity: 0;
    position: absolute;
    width: 1px;
}

.h-switch__input:focus-visible + .h-switch {
    box-shadow: var(--h0n-ui-focus-ring);
}

.h-switch__label {
    color: var(--h0n-ui-color-text);
    font-family: var(--h0n-ui-font-family);
    font-size: var(--h0n-ui-typography-body-size);
    font-weight: var(--h0n-ui-font-weight-medium);
}

@media (prefers-reduced-motion: reduce) {
    .h-switch,
    .h-switch__thumb {
        transition: none;
    }
}
</style>
