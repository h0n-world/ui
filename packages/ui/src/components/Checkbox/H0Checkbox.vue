<script setup lang="ts">
import minusIcon from '@h0nio/icons/minus-stroke'
import unreadIcon from '@h0nio/icons/unread-stroke'
import { computed, useAttrs, useTemplateRef, watchEffect } from 'vue'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import H0Icon from '../Icon/H0Icon.vue'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import { useFormField } from '../_shared/useFormField'
import type { H0CheckboxSize, H0CheckboxVariant } from './Checkbox.types'

defineOptions({
    name: 'H0Checkbox',
    inheritAttrs: false
})

const props = withDefaults(
    defineProps<{
        modelValue?: boolean
        size?: H0CheckboxSize
        variant?: H0CheckboxVariant
        label?: string
        disabled?: boolean
        indeterminate?: boolean
        id?: string
        name?: string
        value?: string
        required?: boolean
        error?: string
        hint?: string
        defaultValue?: boolean
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        modelValue: undefined,
        size: 'md',
        variant: 'surface',
        label: '',
        disabled: false,
        indeterminate: false,
        id: '',
        name: '',
        value: 'on',
        required: false,
        error: '',
        hint: '',
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
const checked = computed(() => state.value.value)
const { controlId, fieldContext, hasMessage, messageId, resolvedDisabled, resolvedHint, resolvedLabel, resolvedName, resolvedRequired, setFormValue, visibleError } = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error,
    hint: () => props.hint,
    idPrefix: 'h-checkbox',
    getValue: () => checked.value,
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

watchEffect(() => {
    if (inputRef.value) {
        inputRef.value.indeterminate = props.indeterminate
    }
})
</script>

<template>
    <div v-bind="mergedRootAttrs" data-h0n-component="checkbox" class="h-checkbox-field" :class="visibleError && 'h-checkbox-field--error'">
        <label
            class="h-checkbox"
            :class="[`h-checkbox--${size}`, `h-checkbox--${variant}`, resolvedDisabled && 'h-checkbox--disabled', checked && 'h-checkbox--checked', indeterminate && 'h-checkbox--indeterminate']"
        >
            <input
                v-bind="props.controlAttrs"
                :id="controlId"
                ref="inputRef"
                class="h-checkbox__input"
                type="checkbox"
                :name="resolvedName || undefined"
                :value="value"
                :checked="checked"
                :disabled="resolvedDisabled"
                :required="resolvedRequired"
                :aria-checked="indeterminate ? 'mixed' : checked"
                :aria-invalid="Boolean(visibleError)"
                :aria-describedby="hasMessage ? messageId : undefined"
                @blur="emit('blur', $event)"
                @change="handleChange"
                @focus="emit('focus', $event)"
            />
            <span class="h-checkbox__box" aria-hidden="true">
                <H0Icon class="h-checkbox__mark" :icon="indeterminate ? minusIcon : unreadIcon" :size="size === 'sm' ? 16 : size === 'lg' ? 26 : 20" />
            </span>
            <span v-if="!fieldContext && (resolvedLabel || $slots.default)" class="h-checkbox__label"
                ><slot>{{ resolvedLabel }}</slot></span
            >
        </label>
        <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId" as="span" role="alert">{{ visibleError }}</H0ErrorMessage>
        <H0Description v-else-if="!fieldContext && resolvedHint" :id="messageId" as="span">{{ resolvedHint }}</H0Description>
    </div>
</template>

<style scoped lang="scss">
.h-checkbox {
    --h0n-checkbox-box-background: var(--h0n-ui-color-surface);

    align-items: center;
    color: var(--h0n-ui-color-text);
    cursor: pointer;
    display: inline-flex;
    font-family: var(--h0n-ui-font-family);
    gap: 10px;
    min-width: 0;
    position: relative;

    &--disabled {
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
        background: var(--h0n-checkbox-box-background);
        border-radius: var(--h0n-ui-radius-sm);
        display: inline-flex;
        flex: 0 0 auto;
        height: 22px;
        justify-content: center;
        transition:
            background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            border-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            box-shadow var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
        width: 22px;
    }

    &--surface {
        --h0n-checkbox-box-background: var(--h0n-ui-color-surface);
    }

    &--secondary {
        --h0n-checkbox-box-background: var(--h0n-ui-color-secondary);
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
        min-width: 0;
    }

    &--sm {
        gap: 8px;
    }

    &--sm &__box {
        height: 18px;
        width: 18px;
    }

    &--sm &__label {
        font-size: var(--h0n-ui-typography-body-sm-size);
    }

    &--lg {
        gap: 12px;
    }

    &--lg &__box {
        height: 26px;
        width: 26px;
    }

    &--lg &__label {
        font-size: var(--h0n-ui-typography-h5-size);
    }

    &--checked &__box,
    &--indeterminate &__box {
        background: var(--h0n-ui-color-primary);
        border-color: var(--h0n-ui-color-primary);
    }

    &--checked &__mark,
    &--indeterminate &__mark {
        opacity: 1;
        transform: scale(1);
    }

    &__input:focus-visible + &__box {
        box-shadow: var(--h0n-ui-focus-ring);
    }
}

.h-checkbox-field {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    min-width: 0;
}
</style>
