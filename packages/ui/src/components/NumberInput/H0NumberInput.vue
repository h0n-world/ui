<script setup lang="ts">
import { minusIcon, plusIcon } from '../../icons'
import { computed, ref, useAttrs, watch } from 'vue'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { defaultH0NumberInputLocale, useH0Locale } from '../../locale'
import H0Icon from '../Icon/H0Icon.vue'
import type { H0InputSize, H0InputVariant } from '../Input/Input.types'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import H0Label from '../Typography/H0Label.vue'
import { clampH0Number, getH0DecimalPrecision, parseH0Number, stepH0Number } from '../_shared/number'
import { useFormField } from '../_shared/useFormField'
import type { H0NumberFormatter, H0NumberParser } from './NumberInput.types'

defineOptions({ name: 'H0NumberInput', inheritAttrs: false })

const props = withDefaults(
    defineProps<{
        modelValue?: number | null
        defaultValue?: number | null
        min?: number
        max?: number
        step?: number
        precision?: number
        locale?: string
        formatOptions?: Intl.NumberFormatOptions
        parse?: H0NumberParser
        format?: H0NumberFormatter
        clampOnBlur?: boolean
        wheel?: boolean
        showSteps?: boolean
        size?: H0InputSize
        variant?: H0InputVariant
        id?: string
        name?: string
        label?: string
        ariaLabel?: string
        autocomplete?: string
        required?: boolean
        disabled?: boolean
        readonly?: boolean
        error?: string
        hint?: string
        placeholder?: string
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        modelValue: undefined,
        defaultValue: null,
        step: 1,
        precision: undefined,
        locale: '',
        formatOptions: () => ({}),
        parse: undefined,
        format: undefined,
        clampOnBlur: true,
        wheel: false,
        showSteps: true,
        size: 'md',
        variant: 'surface',
        id: '',
        name: '',
        label: '',
        ariaLabel: '',
        autocomplete: '',
        required: false,
        disabled: false,
        readonly: false,
        error: '',
        hint: '',
        placeholder: ''
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: number | null]
    change: [value: number | null]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
    invalid: [value: string]
}>()
const attrs = useAttrs()
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))

const input = ref<HTMLInputElement>()
const localeService = useH0Locale()
const language = computed(() => props.locale || localeService.language?.value || 'en-US')
const locale = computed(() => localeService.locale.value.numberInput ?? defaultH0NumberInputLocale)
const state = useH0ControllableState<number | null>({
    modelValue: () => props.modelValue,
    defaultValue: () => props.defaultValue,
    onUpdate: (value) => emit('update:modelValue', value)
})
const formatter = computed(() => new Intl.NumberFormat(language.value, { maximumFractionDigits: props.precision ?? 20, useGrouping: false, ...props.formatOptions }))
const formatValue = (value: number | null) => (value == null ? '' : (props.format?.(value, language.value) ?? formatter.value.format(value)))
const raw = ref(formatValue(state.value.value))
const internalError = ref('')

watch(state.value, (value) => {
    if (typeof document === 'undefined' || document.activeElement !== input.value) {
        raw.value = formatValue(value)
    }
})

const parsed = () => props.parse?.(raw.value, language.value) ?? parseH0Number(raw.value, language.value)
const { controlId, fieldContext, hasMessage, messageId, resolvedDisabled, resolvedHint, resolvedLabel, resolvedName, resolvedRequired, setFormValue, visibleError } = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error || internalError.value,
    hint: () => props.hint,
    idPrefix: 'h-number-input',
    getValue: () => state.value.value,
    getValidationMessage: () => internalError.value,
    focus: () => input.value?.focus(),
    reset: () => {
        state.reset()
        raw.value = formatValue(props.defaultValue)
        return props.defaultValue
    }
})

function updateRaw(event: Event) {
    raw.value = (event.target as HTMLInputElement).value
    internalError.value = ''

    if (!raw.value.trim()) {
        state.setValue(null)
        setFormValue(null)
        return
    }

    const value = parsed()

    if (typeof value === 'number') {
        state.setValue(value)
        setFormValue(value)
    }
}

function commit() {
    let value = parsed()

    if (value === null && !raw.value.trim()) {
        value = null
    }

    if (value === undefined || (value === null && raw.value.trim())) {
        internalError.value = input.value?.validationMessage || 'Invalid number'
        emit('invalid', raw.value)
        return
    }

    if (typeof value === 'number') {
        if (props.clampOnBlur) {
            value = clampH0Number(value, props.min, props.max)
        }

        const precision = props.precision ?? getH0DecimalPrecision(props.step)
        value = Number(value.toFixed(precision))
        state.setValue(value)
        setFormValue(value)
    }

    raw.value = formatValue(value)
    emit('change', value)
}

function step(direction: 1 | -1) {
    if (resolvedDisabled.value || props.readonly) {
        return
    }

    const parsedValue = parsed()
    const base = typeof parsedValue === 'number' ? parsedValue : (state.value.value ?? (direction > 0 ? (props.min ?? 0) : (props.max ?? 0)))
    const precision = props.precision ?? getH0DecimalPrecision(props.step, base)
    const value = clampH0Number(stepH0Number(base, props.step, direction, precision), props.min, props.max)

    state.setValue(value)
    setFormValue(value)
    raw.value = formatValue(value)
    emit('change', value)
    input.value?.focus()
}

function keydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
        event.preventDefault()
        step(1)
    } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        step(-1)
    } else if (event.key === 'PageUp') {
        event.preventDefault()
        for (let i = 0; i < 10; i += 1) step(1)
    } else if (event.key === 'PageDown') {
        event.preventDefault()
        for (let i = 0; i < 10; i += 1) step(-1)
    } else if (event.key === 'Home' && props.min != null) {
        event.preventDefault()
        state.setValue(props.min)
        setFormValue(props.min)
        raw.value = formatValue(props.min)
        emit('change', props.min)
    } else if (event.key === 'End' && props.max != null) {
        event.preventDefault()
        state.setValue(props.max)
        setFormValue(props.max)
        raw.value = formatValue(props.max)
        emit('change', props.max)
    } else if (event.key === 'Enter') {
        commit()
    }
}

function wheel(event: WheelEvent) {
    if (!props.wheel || typeof document === 'undefined' || document.activeElement !== input.value) {
        return
    }

    event.preventDefault()
    step(event.deltaY < 0 ? 1 : -1)
}
</script>

<template>
    <div
        v-bind="mergedRootAttrs"
        data-h0n-component="number-input"
        class="h-number-input"
        :class="[`h-number-input--${size}`, `h-number-input--${variant}`, visibleError && 'h-number-input--error', resolvedDisabled && 'h-number-input--disabled']"
    >
        <H0Label v-if="!fieldContext && resolvedLabel" :for="controlId" :required="resolvedRequired">{{ resolvedLabel }}</H0Label>
        <div class="h-number-input__control">
            <button
                v-if="showSteps"
                class="h-number-input__step h-number-input__step--decrement"
                type="button"
                :aria-label="locale.decrement"
                :disabled="resolvedDisabled || readonly || (min != null && state.value.value != null && state.value.value <= min)"
                @click="step(-1)"
            >
                <H0Icon :icon="minusIcon" :size="14" :stroke-width="2.2" />
            </button>
            <input
                v-bind="props.controlAttrs"
                :id="controlId"
                ref="input"
                class="h-number-input__input"
                type="text"
                inputmode="decimal"
                role="spinbutton"
                :name="resolvedName || undefined"
                :value="raw"
                :placeholder="placeholder"
                :autocomplete="autocomplete || undefined"
                :disabled="resolvedDisabled"
                :readonly="readonly"
                :required="resolvedRequired"
                :aria-label="ariaLabel || resolvedLabel || placeholder || resolvedName || 'Number input'"
                :aria-valuenow="state.value.value ?? undefined"
                :aria-valuemin="min"
                :aria-valuemax="max"
                :aria-invalid="Boolean(visibleError)"
                :aria-required="resolvedRequired || undefined"
                :aria-describedby="hasMessage ? messageId : undefined"
                :aria-errormessage="visibleError ? messageId : undefined"
                @input="updateRaw"
                @focus="emit('focus', $event)"
                @blur="commit(); emit('blur', $event)"
                @keydown="keydown"
                @wheel="wheel"
            >
            <button
                v-if="showSteps"
                class="h-number-input__step h-number-input__step--increment"
                type="button"
                :aria-label="locale.increment"
                :disabled="resolvedDisabled || readonly || (max != null && state.value.value != null && state.value.value >= max)"
                @click="step(1)"
            >
                <H0Icon :icon="plusIcon" :size="14" :stroke-width="2.2" />
            </button>
        </div>
        <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId">{{ visibleError }}</H0ErrorMessage>
        <H0Description v-else-if="!fieldContext && resolvedHint" :id="messageId">{{ resolvedHint }}</H0Description>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-number-input {
    @include mixins.h0n-input-root;

    &__control {
        @include mixins.h0n-input-control;
        gap: 0;
        overflow: hidden;
        padding: 0;
    }

    &--surface {
        @include mixins.h0n-input-variant('surface');
    }

    &--secondary {
        @include mixins.h0n-input-variant('secondary');
    }

    &__input {
        @include mixins.h0n-input-field;
        padding-inline: 12px;
    }

    &__step {
        align-items: center;
        align-self: stretch;
        background: transparent;
        border: 0;
        color: var(--h0n-ui-color-muted);
        cursor: pointer;
        display: inline-flex;
        flex: 0 0 36px;
        justify-content: center;
        min-height: 0;
        padding: 0;
        transition:
            background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
    }

    &__step--decrement {
        border-inline-end: 1px solid var(--h0n-ui-color-border);
    }

    &__step--increment {
        border-inline-start: 1px solid var(--h0n-ui-color-border);
    }

    &__step:hover:not(:disabled) {
        background: var(--h0n-ui-color-surface-hover);
        color: var(--h0n-ui-color-text);
    }

    &__step:focus-visible {
        box-shadow: inset 0 0 0 2px var(--h0n-ui-color-primary);
        outline: none;
    }

    &__step:disabled {
        cursor: default;
        opacity: 0.45;
    }

    &:focus-within &__control {
        @include mixins.h0n-input-focus;
    }

    &--sm &__control {
        @include mixins.h0n-input-control-size('sm');
        padding: 0;
    }

    &--sm &__input {
        @include mixins.h0n-input-field-size('sm');
        padding-inline: 11px;
    }

    &--md &__control {
        @include mixins.h0n-input-control-size('md');
        padding: 0;
    }

    &--md &__input {
        @include mixins.h0n-input-field-size('md');
    }

    &--lg &__control {
        @include mixins.h0n-input-control-size('lg');
        padding: 0;
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
