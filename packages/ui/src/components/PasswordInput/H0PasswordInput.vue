<script setup lang="ts">
import eyeOffIcon from '@h0nio/icons/eye-closed-stroke'
import eyeIcon from '@h0nio/icons/eye-stroke'
import { computed, ref, useAttrs } from 'vue'
import { useH0ControllableState } from '../../composables'
import { defaultH0PasswordInputLocale, useH0Locale } from '../../locale'
import type { H0PasswordStrength } from '../../types'
import H0Icon from '../Icon/H0Icon.vue'
import type { H0InputSize, H0InputVariant } from '../Input/Input.types'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import H0Label from '../Typography/H0Label.vue'
import { useFormField } from '../_shared/useFormField'

defineOptions({ name: 'H0PasswordInput', inheritAttrs: false })

const props = withDefaults(
    defineProps<{
        modelValue?: string
        defaultValue?: string
        visible?: boolean
        defaultVisible?: boolean
        strength?: H0PasswordStrength
        strengthLabels?: readonly string[]
        size?: H0InputSize
        variant?: H0InputVariant
        id?: string
        name?: string
        label?: string
        ariaLabel?: string
        placeholder?: string
        autocomplete?: string
        required?: boolean
        disabled?: boolean
        readonly?: boolean
        error?: string
        hint?: string
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        modelValue: undefined,
        defaultValue: '',
        visible: undefined,
        defaultVisible: false,
        strength: undefined,
        strengthLabels: undefined,
        size: 'md',
        variant: 'surface',
        id: '',
        name: '',
        label: '',
        ariaLabel: '',
        placeholder: '',
        autocomplete: 'current-password',
        required: false,
        disabled: false,
        readonly: false,
        error: '',
        hint: ''
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
    change: [value: string]
    'update:visible': [value: boolean]
    'visibility-change': [value: boolean]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
}>()
const attrs = useAttrs()
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))

const input = ref<HTMLInputElement>()
const capsLock = ref(false)
const valueState = useH0ControllableState({
    modelValue: () => props.modelValue,
    defaultValue: () => props.defaultValue,
    onUpdate: (value) => emit('update:modelValue', value)
})
const visibilityState = useH0ControllableState({
    modelValue: () => props.visible,
    defaultValue: () => props.defaultVisible,
    onUpdate: (value) => emit('update:visible', value)
})
const localeService = useH0Locale()
const locale = computed(() => localeService.locale.value.passwordInput ?? defaultH0PasswordInputLocale)
const labels = computed(() => props.strengthLabels ?? locale.value.strength)
const { controlId, fieldContext, hasMessage, messageId, resolvedDisabled, resolvedHint, resolvedLabel, resolvedName, resolvedRequired, setFormValue, visibleError } = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error,
    hint: () => props.hint,
    idPrefix: 'h-password-input',
    getValue: () => valueState.value.value,
    getValidationMessage: () => input.value?.validationMessage ?? '',
    focus: () => input.value?.focus(),
    reset: () => valueState.reset()
})

function update(event: Event) {
    const value = (event.target as HTMLInputElement).value
    valueState.setValue(value)
    setFormValue(value)
    emit('change', value)
}

function toggle() {
    const value = !visibilityState.value.value
    visibilityState.setValue(value)
    emit('visibility-change', value)
    input.value?.focus()
}

function detectCaps(event: KeyboardEvent) {
    capsLock.value = event.getModifierState('CapsLock')
}
</script>

<template>
    <label
        v-bind="mergedRootAttrs"
        data-h0n-component="password-input"
        class="h-password-input"
        :class="[`h-password-input--${size}`, `h-password-input--${variant}`, visibleError && 'h-password-input--error', resolvedDisabled && 'h-password-input--disabled']"
    >
        <H0Label v-if="!fieldContext && resolvedLabel" as="span" :required="resolvedRequired">{{ resolvedLabel }}</H0Label>
        <span class="h-password-input__control">
            <input
                v-bind="props.controlAttrs"
                :id="controlId"
                ref="input"
                class="h-password-input__field"
                :type="visibilityState.value.value ? 'text' : 'password'"
                :value="valueState.value.value"
                :name="resolvedName || undefined"
                :placeholder="placeholder"
                :autocomplete="autocomplete || undefined"
                :required="resolvedRequired"
                :disabled="resolvedDisabled"
                :readonly="readonly"
                :aria-label="ariaLabel || resolvedLabel || placeholder || resolvedName || 'Password input'"
                :aria-invalid="Boolean(visibleError)"
                :aria-required="resolvedRequired || undefined"
                :aria-describedby="hasMessage || capsLock || strength != null ? messageId : undefined"
                :aria-errormessage="visibleError ? messageId : undefined"
                @input="update"
                @keydown="detectCaps"
                @keyup="detectCaps"
                @focus="emit('focus', $event)"
                @blur="((capsLock = false), emit('blur', $event))"
            />
            <button
                class="h-password-input__toggle"
                type="button"
                :disabled="resolvedDisabled"
                :aria-label="visibilityState.value.value ? locale.hide : locale.reveal"
                :aria-pressed="visibilityState.value.value"
                @click="toggle"
            >
                <H0Icon :icon="visibilityState.value.value ? eyeOffIcon : eyeIcon" :size="18" />
            </button>
        </span>
        <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId">{{ visibleError }}</H0ErrorMessage>
        <H0Description v-else-if="!fieldContext && capsLock" :id="messageId">{{ locale.capsLock }}</H0Description>
        <H0Description v-else-if="!fieldContext && strength != null" :id="messageId">
            <span class="h-password-input__meter" :style="{ '--h-password-strength': String(strength) }" aria-hidden="true" />{{ labels[strength] }}
        </H0Description>
        <H0Description v-else-if="!fieldContext && resolvedHint" :id="messageId">{{ resolvedHint }}</H0Description>
    </label>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-password-input {
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

    &__field::-ms-reveal,
    &__field::-ms-clear {
        display: none;
    }

    &__toggle {
        align-items: center;
        background: transparent;
        border: 0;
        border-radius: 50%;
        color: var(--h0n-ui-color-muted);
        cursor: pointer;
        display: inline-flex;
        flex: 0 0 28px;
        height: 28px;
        justify-content: center;
        line-height: 1;
        padding: 0;
        width: 28px;
    }

    &__toggle:hover:not(:disabled) {
        background: var(--h0n-ui-color-surface-hover);
        color: var(--h0n-ui-color-text);
    }

    &__toggle:focus-visible {
        box-shadow: var(--h0n-ui-focus-ring);
        outline: none;
    }

    &__meter {
        background: linear-gradient(90deg, var(--h0n-ui-color-primary) calc(var(--h-password-strength) * 25%), var(--h0n-ui-color-border) 0);
        block-size: 0.25rem;
        border-radius: 999px;
        display: inline-block;
        inline-size: 4rem;
        margin-inline-end: 0.5rem;
    }

    &:focus-within &__control {
        @include mixins.h0n-input-focus;
    }

    &--sm &__control {
        @include mixins.h0n-input-control-size('sm');
    }

    &--sm &__field {
        @include mixins.h0n-input-field-size('sm');
    }

    &--md &__control {
        @include mixins.h0n-input-control-size('md');
    }

    &--md &__field {
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

    @media (forced-colors: active) {
        &__control {
            border-color: CanvasText;
        }
    }
}
</style>
