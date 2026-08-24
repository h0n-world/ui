<script setup lang="ts">
import closeIcon from '@h0nio/icons/close'
import { computed, useAttrs, useTemplateRef } from 'vue'
import { useH0ControllableState } from '../../composables'
import { useH0Locale } from '../../locale'
import type { H0Size } from '../../types'
import { useFormField } from '../_shared/useFormField'
import type { H0IconSource } from '../Icon'
import H0Icon from '../Icon/H0Icon.vue'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import H0Label from '../Typography/H0Label.vue'
import type { H0InputEmits, H0InputInputMode, H0InputVariant } from './Input.types'

defineOptions({
    name: 'H0Input',
    inheritAttrs: false
})

const props = withDefaults(
    defineProps<{
        modelValue?: string
        type?: string
        size?: H0Size
        variant?: H0InputVariant
        label?: string
        ariaLabel?: string
        placeholder?: string
        prefix?: string
        suffix?: string
        prefixIcon?: H0IconSource
        suffixIcon?: H0IconSource
        disabled?: boolean
        readonly?: boolean
        required?: boolean
        error?: string
        hint?: string
        clearable?: boolean
        id?: string
        name?: string
        autocomplete?: string
        inputmode?: H0InputInputMode
        min?: string | number
        max?: string | number
        step?: string | number
        defaultValue?: string
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        type: 'text',
        size: 'md',
        variant: 'surface',
        label: '',
        ariaLabel: '',
        placeholder: '',
        prefix: '',
        suffix: '',
        prefixIcon: undefined,
        suffixIcon: undefined,
        disabled: false,
        readonly: false,
        required: false,
        error: '',
        hint: '',
        clearable: false,
        id: '',
        name: '',
        autocomplete: '',
        inputmode: undefined,
        min: undefined,
        max: undefined,
        step: undefined,
        defaultValue: ''
    }
)

const emit = defineEmits<H0InputEmits>()
const attrs = useAttrs()
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
const { locale } = useH0Locale()
const state = useH0ControllableState({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue, onUpdate: (value) => emit('update:modelValue', value) })
const currentValue = state.value

const { controlId, fieldContext, hasMessage, messageId, resolvedDisabled, resolvedHint, resolvedLabel, resolvedName, resolvedRequired, setFormValue, visibleError } = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error,
    hint: () => props.hint,
    idPrefix: 'h-input',
    getValue: () => currentValue.value,
    getValidationMessage: () => inputRef.value?.validationMessage ?? '',
    focus: () => inputRef.value?.focus(),
    reset: () => {
        const value = state.reset()
        emit('change', value)
        return value
    }
})
const hasStartAffix = computed(() => Boolean(props.prefix || props.prefixIcon))
const hasEndAffix = computed(() => Boolean(props.suffix || props.suffixIcon))

function updateValue(event: Event) {
    const value = (event.target as HTMLInputElement).value

    state.setValue(value)
    emit('change', value)
    emit('input', value, event)
    setFormValue(value)
}

function clear() {
    state.setValue('')
    emit('change', '')
    setFormValue('')
    emit('clear')
}

function focus() {
    inputRef.value?.focus()
}

function setValue(value: string) {
    state.setValue(value)
    emit('change', value)
    setFormValue(value)
}

defineExpose({
    clear,
    focus,
    setValue
})
</script>

<template>
    <label
        v-bind="mergedRootAttrs"
        data-h0n-component="input"
        class="h-input"
        :class="[`h-input--${size}`, `h-input--${variant}`, visibleError && 'h-input--error', resolvedDisabled && 'h-input--disabled']"
    >
        <H0Label v-if="!fieldContext && (resolvedLabel || $slots.label)" as="span" class="h-input__label" :required="resolvedRequired">
            <slot name="label">{{ resolvedLabel }}</slot>
        </H0Label>
        <span class="h-input__control">
            <span v-if="$slots.start || $slots.prefix || hasStartAffix" class="h-input__affix h-input__affix--start">
                <slot name="start">
                    <slot name="prefix">
                        <H0Icon v-if="prefixIcon" :icon="prefixIcon" :size="18" />
                        <span v-if="prefix" class="h-input__affix-text">{{ prefix }}</span>
                    </slot>
                </slot>
            </span>
            <input
                v-bind="props.controlAttrs"
                ref="inputRef"
                class="h-input__field"
                :id="controlId"
                :value="currentValue"
                :type="type"
                :name="resolvedName || undefined"
                :placeholder="placeholder"
                :disabled="resolvedDisabled"
                :readonly="readonly"
                :required="resolvedRequired"
                :autocomplete="autocomplete || undefined"
                :inputmode="inputmode || undefined"
                :min="min"
                :max="max"
                :step="step"
                :aria-invalid="Boolean(visibleError)"
                :aria-label="ariaLabel || resolvedLabel || placeholder || resolvedName || 'Input'"
                :aria-required="resolvedRequired || undefined"
                :aria-describedby="hasMessage ? messageId : undefined"
                :aria-errormessage="visibleError ? messageId : undefined"
                @blur="emit('blur', $event)"
                @focus="emit('focus', $event)"
                @input="updateValue"
            />

            <button v-if="clearable && currentValue && !resolvedDisabled && !readonly" class="h-input__clear" type="button" :aria-label="locale.common.clear" @click="clear">
                <H0Icon :icon="closeIcon" :size="16" />
            </button>
            <span v-if="$slots.end || $slots.suffix || hasEndAffix" class="h-input__affix h-input__affix--end">
                <slot name="end">
                    <slot name="suffix">
                        <span v-if="suffix" class="h-input__affix-text">{{ suffix }}</span>
                        <H0Icon v-if="suffixIcon" :icon="suffixIcon" :size="16" />
                    </slot>
                </slot>
            </span>
        </span>
        <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId" as="span" class="h-input__message" role="alert">{{ visibleError }}</H0ErrorMessage>
        <H0Description v-else-if="!fieldContext && resolvedHint" :id="messageId" as="span" class="h-input__message">{{ resolvedHint }}</H0Description>
    </label>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-input {
    @include mixins.h0n-input-root;

    &__control {
        @include mixins.h0n-input-control;
    }

    &--surface {
        @include mixins.h0n-input-variant('surface');
    }

    &--secondary {
        @include mixins.h0n-input-variant('secondary');
    }

    &__field {
        @include mixins.h0n-input-field;
    }

    &__affix {
        align-items: center;
        color: var(--h0n-ui-color-muted);
        display: inline-flex;
        flex: 0 0 auto;
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-medium);
        line-height: 1;
        white-space: nowrap;
    }

    &__affix-text {
        display: inline-block;
        min-width: 0;
    }

    &__clear {
        align-items: center;
        background: transparent;
        border: 0;
        border-radius: 50%;
        color: var(--h0n-ui-color-muted);
        cursor: pointer;
        display: inline-flex;
        height: 28px;
        justify-content: center;
        line-height: 1;
        width: 28px;
    }

    &:focus-within &__control {
        @include mixins.h0n-input-focus;
    }

    &--sm &__control {
        @include mixins.h0n-input-control-size('sm');
    }

    &--sm &__field,
    &--sm &__affix {
        @include mixins.h0n-input-field-size('sm');
    }

    &--md &__control {
        @include mixins.h0n-input-control-size('md');
    }

    &--md &__field,
    &--md &__affix {
        @include mixins.h0n-input-field-size('md');
    }

    &--lg &__control {
        @include mixins.h0n-input-control-size('lg');
    }

    &--error &__control {
        @include mixins.h0n-input-error;
    }

    &--disabled {
        @include mixins.h0n-input-disabled;
    }
}
</style>
