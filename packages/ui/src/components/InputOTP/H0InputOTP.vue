<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import H0Label from '../Typography/H0Label.vue'
import H0Description from '../Typography/H0Description.vue'
import { useFormField } from '../_shared/useFormField'
import type { H0InputOTPLength, H0InputOTPSize, H0InputOTPValidation, H0InputOTPValidator, H0InputOTPVariant } from './InputOTP.types'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { useH0Locale } from '../../locale'

defineOptions({
    name: 'H0InputOTP'
})

const props = withDefaults(
    defineProps<{
        modelValue?: string
        length?: H0InputOTPLength
        size?: H0InputOTPSize
        variant?: H0InputOTPVariant
        validation?: H0InputOTPValidation
        validator?: H0InputOTPValidator
        error?: string
        invalidText?: string
        autoComplete?: boolean
        disabled?: boolean
        name?: string
        label?: string
        id?: string
        required?: boolean
        hint?: string
        defaultValue?: string
    }>(),
    {
        length: 6,
        size: 'md',
        variant: 'secondary',
        validation: 'numeric',
        validator: undefined,
        error: '',
        invalidText: '',
        autoComplete: true,
        disabled: false,
        name: '',
        label: '',
        id: '',
        required: false,
        hint: '',
        defaultValue: ''
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
    change: [value: string]
    complete: [value: string]
    invalid: [value: string, message: string]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
}>()

const inputRefs = useTemplateRef<HTMLInputElement[]>('inputRefs')
const internalError = ref('')
const { locale } = useH0Locale()
const state = useH0ControllableState({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue, onUpdate: (value) => emit('update:modelValue', value) })
const normalizedValue = computed(() => normalize(state.value.value))
const chars = computed(() => Array.from({ length: props.length }, (_, index) => normalizedValue.value[index] ?? ''))
const cellGroups = computed(() =>
    props.length === 6
        ? [
              [0, 1, 2],
              [3, 4, 5]
          ]
        : [[0, 1, 2, 3]]
)
const inputMode = computed(() => (props.validation === 'numeric' ? 'numeric' : 'text'))
const pattern = computed(() => (props.validation === 'numeric' ? '[0-9]*' : '[A-Za-z0-9]*'))
const {
    controlId,
    fieldContext,
    hasMessage,
    messageId,
    resolvedDisabled,
    resolvedHint,
    resolvedLabel,
    resolvedName,
    resolvedRequired,
    setFormValue,
    visibleError: formError
} = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label || locale.value.inputOtp.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error || internalError.value,
    hint: () => props.hint,
    idPrefix: 'h-input-otp',
    getValue: () => normalizedValue.value,
    getValidationMessage: () => internalError.value,
    focus: focusNextAvailable,
    reset: () => {
        const value = normalize(props.defaultValue)
        state.setValue(value)
        emit('change', value)
        return value
    }
})

function normalize(value: string) {
    const compactValue = value.replace(/\s/g, '')
    const validValue = props.validation === 'numeric' ? compactValue.replace(/\D/g, '') : compactValue.replace(/[^a-z0-9]/gi, '')

    return validValue.slice(0, props.length)
}

function getNextIndex(value = normalizedValue.value) {
    return Math.min(value.length, props.length - 1)
}

function focusCell(index: number) {
    if (props.disabled) {
        return
    }

    const input = inputRefs.value?.[Math.max(0, Math.min(index, props.length - 1))]

    input?.focus()
}

function focusNextAvailable() {
    focusCell(getNextIndex())
}

function handleFocus(event: FocusEvent) {
    focusNextAvailable()
    emit('focus', event)
}

function updateValue(value: string) {
    const nextValue = normalize(value)

    if (nextValue === normalizedValue.value) {
        void nextTick(focusNextAvailable)
        return
    }

    internalError.value = ''
    state.setValue(nextValue)
    emit('change', nextValue)
    setFormValue(nextValue)
    void nextTick(() => focusCell(getNextIndex(nextValue)))
}

function handleInput(event: Event) {
    if (props.disabled) {
        return
    }

    const target = event.target as HTMLInputElement
    const enteredValue = normalize(target.value)

    if (enteredValue.length > 1) {
        updateValue(enteredValue)
        return
    }

    if (enteredValue && normalizedValue.value.length < props.length) {
        updateValue(`${normalizedValue.value}${enteredValue}`)
    } else {
        target.value = chars.value[getNextIndex()] ?? ''
        focusNextAvailable()
    }
}

function handleKeydown(event: KeyboardEvent) {
    if (props.disabled) {
        return
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault()

        if (normalizedValue.value) {
            updateValue(normalizedValue.value.slice(0, -1))
        }

        return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Home' || event.key === 'End') {
        event.preventDefault()
        focusNextAvailable()
    }
}

function handlePaste(event: ClipboardEvent) {
    if (props.disabled) {
        return
    }

    event.preventDefault()
    updateValue(event.clipboardData?.getData('text') ?? '')
}

function validate(value = normalizedValue.value) {
    let message = ''

    if (value.length !== props.length) {
        message = `Enter all ${props.length} characters`
    } else if (props.validator) {
        const result = props.validator(value)
        message = typeof result === 'string' ? result : result ? '' : props.invalidText || locale.value.inputOtp.invalid
    }

    internalError.value = message

    if (message) {
        emit('invalid', value, message)
        return false
    }

    return true
}

function confirm() {
    const value = normalizedValue.value

    if (!validate(value)) {
        return false
    }

    emit('complete', value)
    return true
}

watch(normalizedValue, (value, previousValue) => {
    if (value !== previousValue) {
        internalError.value = ''
    }

    if (props.autoComplete && value.length === props.length && previousValue.length !== props.length) {
        confirm()
    }
})

defineExpose({
    confirm,
    focus: focusNextAvailable,
    validate
})
</script>

<template>
    <div :id="controlId" data-h0n-component="input-otp" class="h-input-otp" :class="[`h-input-otp--${size}`, `h-input-otp--${variant}`, formError && 'h-input-otp--error', resolvedDisabled && 'h-input-otp--disabled']">
        <H0Label v-if="!fieldContext && (resolvedLabel || $slots.label)" as="span" class="h-input-otp__label" :required="resolvedRequired">
            <slot name="label">{{ resolvedLabel }}</slot>
        </H0Label>

        <span
            class="h-input-otp__cells"
            role="group"
            :aria-label="resolvedLabel || locale.inputOtp.label"
            :aria-disabled="resolvedDisabled || undefined"
            :aria-describedby="hasMessage ? messageId : undefined"
            @paste="handlePaste"
        >
            <template v-for="(group, groupIndex) in cellGroups" :key="groupIndex">
                <span v-if="groupIndex > 0" class="h-input-otp__separator" aria-hidden="true" />
                <span class="h-input-otp__group">
                    <span v-for="index in group" :key="index" class="h-input-otp__cell-shell" :class="chars[index] && 'h-input-otp__cell-shell--filled'">
                        <input
                            ref="inputRefs"
                            class="h-input-otp__cell"
                            type="text"
                            :inputmode="inputMode"
                            :pattern="pattern"
                            :autocomplete="index === 0 ? 'one-time-code' : 'off'"
                            maxlength="1"
                            :value="chars[index]"
                            :disabled="resolvedDisabled"
                            :aria-label="locale.inputOtp.character(index + 1)"
                            :aria-invalid="Boolean(formError)"
                            :aria-describedby="hasMessage ? messageId : undefined"
                            @blur="emit('blur', $event)"
                            @focus="handleFocus"
                            @input="handleInput"
                            @keydown="handleKeydown"
                            @pointerdown.prevent="focusNextAvailable"
                        />
                        <Transition name="h-input-otp-character">
                            <span v-if="chars[index]" :key="chars[index]" class="h-input-otp__character" aria-hidden="true">{{ chars[index] }}</span>
                        </Transition>
                    </span>
                </span>
            </template>
        </span>

        <input v-if="resolvedName" type="hidden" :name="resolvedName" :value="normalizedValue" :disabled="resolvedDisabled" />
        <H0ErrorMessage v-if="!fieldContext && formError" :id="messageId" as="span" class="h-input-otp__message" role="alert">{{ formError }}</H0ErrorMessage>
        <H0Description v-else-if="!fieldContext && resolvedHint" :id="messageId" as="span" class="h-input-otp__message">{{ resolvedHint }}</H0Description>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-input-otp {
    --h-input-otp-cell-background: var(--h0n-ui-color-secondary);

    display: grid;
    font-family: var(--h0n-ui-font-family);
    gap: 10px;
    min-width: 0;

    &__cell-shell {
        background: var(--h-input-otp-cell-background);
        border: 1px solid transparent;
        border-radius: var(--h0n-ui-radius-xl);
        color: var(--h0n-ui-color-text);
        font-size: var(--h0n-ui-typography-h4-size);
        font-weight: var(--h0n-ui-font-weight-medium);
        overflow: hidden;
        position: relative;
        transition:
            background-color var(--h0n-ui-duration-fast) ease,
            box-shadow var(--h0n-ui-duration-fast) ease;
        width: 42px;

        &:focus-within {
            box-shadow: 0 0 0 2px var(--h0n-ui-color-primary);
        }
    }

    &__cell {
        background: transparent;
        border: 0;
        caret-color: transparent;
        color: transparent;
        font: inherit;
        font-size: inherit;
        font-weight: inherit;
        height: 100%;
        inset: 0;
        line-height: 1;
        outline: none;
        padding: 0 0 2px;
        position: absolute;
        text-align: center;
        width: 100%;
        z-index: 1;

        &:disabled {
            cursor: not-allowed;
        }
    }

    &__cell-shell:not(&__cell-shell--filled):focus-within::after {
        animation: h-input-otp-caret 1s step-end infinite;
        background: var(--h0n-ui-color-text);
        border-radius: var(--h0n-ui-radius-round);
        content: '';
        height: 16px;
        left: 50%;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 2px;
    }

    &__character {
        align-items: center;
        display: flex;
        inset: 0;
        justify-content: center;
        line-height: 1;
        padding-top: 2px;
        pointer-events: none;
        position: absolute;
    }

    &--surface {
        --h-input-otp-cell-background: var(--h0n-ui-color-surface);
    }

    &--sm &__cell-shell {
        @include mixins.h0n-input-control-size('sm');

        padding-inline: 0;
        width: 36px;
    }

    &--md &__cell-shell {
        @include mixins.h0n-input-control-size('md');

        padding-inline: 0;
        width: 42px;
    }

    &--lg &__cell-shell {
        @include mixins.h0n-input-control-size('lg');

        padding-inline: 0;
        width: 48px;
    }

    &--error &__cell-shell {
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--h0n-ui-color-danger) 64%, transparent);
    }

    &--disabled {
        opacity: 0.55;
    }
}

.h-input-otp-character-enter-active,
.h-input-otp-character-leave-active {
    transition:
        opacity var(--h0n-ui-duration-normal) ease,
        transform var(--h0n-ui-duration-normal) cubic-bezier(0.2, 0.8, 0.2, 1);
}

.h-input-otp-character-enter-from,
.h-input-otp-character-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

@keyframes h-input-otp-caret {
    0%,
    45% {
        opacity: 1;
    }

    50%,
    95% {
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .h-input-otp__cell-shell:not(.h-input-otp__cell-shell--filled):focus-within::after {
        animation: none;
    }
}

:global(.h-input-otp__cells),
:global(.h-input-otp__group) {
    align-items: center;
    display: flex;
    min-width: 0;
}

:global(.h-input-otp__cells) {
    flex-wrap: wrap;
    gap: 12px;
}

:global(.h-input-otp__group) {
    gap: 8px;
}

:global(.h-input-otp__separator) {
    background: var(--h0n-ui-color-muted);
    border-radius: var(--h0n-ui-radius-round);
    display: block;
    flex: 0 0 8px;
    height: 2px;
    opacity: 0.72;
    width: 8px;
}
</style>
