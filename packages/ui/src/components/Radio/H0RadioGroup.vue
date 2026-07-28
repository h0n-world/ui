<script setup lang="ts">
import { computed, ref } from 'vue'
import H0Card from '../Card/H0Card.vue'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import H0Label from '../Typography/H0Label.vue'
import H0Typography from '../Typography/H0Typography.vue'
import { useFormField } from '../_shared/useFormField'
import H0Radio from './H0Radio.vue'
import type { H0RadioGroupVariant, H0RadioOption, H0RadioOrientation, H0RadioValidator, H0RadioValue } from './Radio.types'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { useH0Locale } from '../../locale'

defineOptions({
    name: 'H0RadioGroup'
})

const props = withDefaults(
    defineProps<{
        modelValue?: H0RadioValue | null
        options: H0RadioOption[]
        orientation?: H0RadioOrientation
        variant?: H0RadioGroupVariant
        columns?: number
        disabled?: boolean
        required?: boolean
        label?: string
        description?: string
        error?: string
        validator?: H0RadioValidator
        invalidText?: string
        id?: string
        name?: string
        defaultValue?: H0RadioValue | null
    }>(),
    {
        orientation: 'vertical',
        variant: 'list',
        columns: undefined,
        disabled: false,
        required: false,
        label: '',
        description: '',
        error: '',
        validator: undefined,
        invalidText: '',
        id: '',
        name: '',
        defaultValue: null
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: H0RadioValue | null]
    change: [value: H0RadioValue]
    invalid: [value: H0RadioValue | null, message: string]
}>()

const internalError = ref('')
const { locale } = useH0Locale()
const state = useH0ControllableState<H0RadioValue | null>({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue, onUpdate: (value) => emit('update:modelValue', value) })
const currentValue = state.value
const validationMessage = computed(() => getValidationMessage(currentValue.value))
const { controlId, fieldContext, messageId, resolvedDisabled, resolvedHint, resolvedLabel, resolvedName, resolvedRequired, setFormValue, visibleError } = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error || internalError.value,
    hint: () => props.description,
    idPrefix: 'h-radio-group',
    getValue: () => currentValue.value,
    getValidationMessage: () => validationMessage.value,
    reset: () => {
        return state.reset()
    }
})
const nativeName = computed(() => resolvedName.value || controlId.value)
const optionsStyle = computed(() => (props.columns ? { '--h-radio-group-columns': `repeat(${Math.max(1, Math.floor(props.columns))}, minmax(0, 1fr))` } : undefined))

function isSelected(value: H0RadioValue) {
    return currentValue.value === value
}

function select(value: H0RadioValue, optionDisabled?: boolean) {
    if (resolvedDisabled.value || optionDisabled) {
        return
    }

    internalError.value = ''
    state.setValue(value)
    emit('change', value)
    setFormValue(value)
}

function handleCardClick(event: MouseEvent, option: H0RadioOption) {
    if (event.target instanceof Element && event.target.closest('.h-radio')) {
        return
    }

    select(option.value, option.disabled)
}

function getValidationMessage(value: H0RadioValue | null | undefined) {
    if (resolvedRequired.value && (value === null || value === undefined || value === '')) {
        return props.invalidText || locale.value.radio.required
    }

    if (!props.validator) {
        return ''
    }

    const result = props.validator(value)

    return typeof result === 'string' ? result : result ? '' : props.invalidText || locale.value.radio.required
}

function validate() {
    const message = validationMessage.value

    internalError.value = message

    if (message) {
        emit('invalid', currentValue.value, message)
        return false
    }

    return true
}

defineExpose({
    validate
})
</script>

<template>
    <fieldset
        data-h0n-component="radio-group" class="h-radio-group"
        :class="[`h-radio-group--${orientation}`, `h-radio-group--${variant}`, visibleError && 'h-radio-group--error']"
        :disabled="resolvedDisabled"
        :aria-invalid="Boolean(visibleError)"
        :aria-describedby="resolvedHint || visibleError ? messageId : undefined"
    >
        <H0Label v-if="!fieldContext && (resolvedLabel || $slots.label)" as="legend" class="h-radio-group__legend" :required="resolvedRequired">
            <slot name="label">{{ resolvedLabel }}</slot>
        </H0Label>
        <H0Description v-if="!fieldContext && (resolvedHint || $slots.description)" :id="!visibleError ? messageId : undefined" as="div" class="h-radio-group__description">
            <slot name="description">{{ resolvedHint }}</slot>
        </H0Description>

        <div class="h-radio-group__options" :style="optionsStyle">
            <template v-for="(option, index) in options" :key="String(option.value)">
                <div
                    v-if="variant === 'cards'"
                    class="h-radio-group__card-option"
                    :class="[isSelected(option.value) && 'h-radio-group__card-option--selected', (resolvedDisabled || option.disabled) && 'h-radio-group__card-option--disabled']"
                    @click="handleCardClick($event, option)"
                >
                    <H0Card class="h-radio-group__card" variant="secondary" padding>
                        <slot name="option" :option="option" :selected="isSelected(option.value)">
                            <div class="h-radio-group__card-content">
                                <H0Typography as="strong" variant="body-sm" :weight="600">{{ option.title }}</H0Typography>
                                <H0Description v-if="option.description" variant="body-xs">{{ option.description }}</H0Description>
                                <H0Typography v-if="option.price !== undefined" as="span" class="h-radio-group__price" variant="body-sm" :weight="600">{{ option.price }}</H0Typography>
                            </div>
                        </slot>
                        <H0Radio
                            :id="`${controlId}-${index}`"
                            class="h-radio-group__card-radio"
                            :model-value="currentValue"
                            :value="option.value"
                            :name="nativeName"
                            :disabled="resolvedDisabled || option.disabled"
                            :required="resolvedRequired"
                            :aria-label="option.title"
                            @update:model-value="select($event, option.disabled)"
                        />
                    </H0Card>
                </div>
                <H0Radio
                    v-else
                    :id="`${controlId}-${index}`"
                    class="h-radio-group__option"
                    :class="isSelected(option.value) && 'h-radio-group__option--selected'"
                    :model-value="currentValue"
                    :value="option.value"
                    :name="nativeName"
                    :disabled="resolvedDisabled || option.disabled"
                    :required="resolvedRequired"
                    @update:model-value="select($event, option.disabled)"
                >
                    <slot name="option" :option="option" :selected="isSelected(option.value)">
                        <span class="h-radio-group__list-content">
                            <span class="h-radio-group__title">{{ option.title }}</span>
                            <H0Description v-if="option.description" as="span" variant="body-xs">{{ option.description }}</H0Description>
                            <span v-if="option.price !== undefined" class="h-radio-group__list-price">{{ option.price }}</span>
                        </span>
                    </slot>
                </H0Radio>
            </template>
        </div>

        <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId" as="div" class="h-radio-group__error" role="alert">{{ visibleError }}</H0ErrorMessage>
    </fieldset>
</template>

<style scoped lang="scss">
.h-radio-group {
    border: 0;
    display: grid;
    gap: 10px;
    margin: 0;
    min-width: 0;
    padding: 0;

    &__legend {
        margin-bottom: 2px;
        padding: 0;
    }

    &__options {
        min-width: 0;
    }

    &--vertical &__options {
        display: grid;
        gap: 14px;
    }

    &--horizontal &__options {
        align-items: flex-start;
        display: flex;
        flex-wrap: wrap;
        gap: 18px;
    }

    &--cards &__options {
        display: grid;
        gap: 14px;
        grid-template-columns: var(--h-radio-group-columns, repeat(auto-fit, minmax(min(190px, 100%), 1fr)));
    }

    &__option {
        min-width: 0;
    }

    &__list-content {
        display: grid;
        gap: 3px;
        min-width: 0;
    }

    &__title,
    &__list-price {
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-semibold);
        line-height: 1.3;
    }

    &__list-price {
        margin-top: 3px;
    }

    &__card {
        height: 100%;
    }

    &__card-content {
        display: grid;
        gap: 4px;
        min-height: 88px;
    }

    &__price {
        align-self: end;
        margin-top: auto;
        padding-top: 14px;
    }
}

.h-radio-group__card-option {
    cursor: pointer;
    min-width: 0;
    position: relative;
    width: 100%;
}

.h-radio-group__card-option--disabled {
    cursor: not-allowed;
    opacity: 0.55;
}

.h-radio-group__card-radio {
    position: absolute;
    right: 14px;
    top: 14px;
    z-index: 2;
}

.h-radio-group__card {
    border-color: transparent;
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        border-color var(--h0n-ui-duration-fast) ease,
        box-shadow var(--h0n-ui-duration-fast) ease;
}

.h-radio-group__card-option--selected .h-radio-group__card {
    border-color: var(--h0n-ui-color-primary);
    box-shadow: inset 0 0 0 1px var(--h0n-ui-color-primary);
}
</style>
