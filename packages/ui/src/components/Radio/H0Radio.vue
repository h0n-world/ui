<script setup lang="ts">
import { computed, ref, useAttrs, useId, useTemplateRef } from 'vue'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import type { H0RadioValidator, H0RadioValue } from './Radio.types'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { useH0Locale } from '../../locale'

defineOptions({
    name: 'H0Radio',
    inheritAttrs: false
})

const props = withDefaults(
    defineProps<{
        modelValue?: H0RadioValue | null
        value: H0RadioValue
        label?: string
        description?: string
        disabled?: boolean
        required?: boolean
        error?: string
        validator?: H0RadioValidator
        invalidText?: string
        ariaLabel?: string
        id?: string
        name?: string
        defaultValue?: H0RadioValue | null
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        defaultValue: null,
        label: '',
        description: '',
        disabled: false,
        required: false,
        error: '',
        validator: undefined,
        invalidText: '',
        ariaLabel: '',
        id: '',
        name: ''
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: H0RadioValue]
    change: [value: H0RadioValue, event: Event]
}>()
const attrs = useAttrs()
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))

const generatedId = useId()
const input = useTemplateRef<HTMLInputElement>('input')
const internalError = ref('')
const { locale } = useH0Locale()
const state = useH0ControllableState<H0RadioValue | null>({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue, onUpdate: (value) => value !== null && emit('update:modelValue', value) })
const controlId = computed(() => props.id || `h-radio-${generatedId}`)
const messageId = computed(() => `${controlId.value}-message`)
const checked = computed(() => state.value.value === props.value)
const visibleError = computed(() => props.error || internalError.value)

function select(event: Event) {
    if (props.disabled || !(event.target as HTMLInputElement).checked) {
        return
    }

    internalError.value = ''
    state.setValue(props.value)
    emit('change', props.value, event)
}

function getValidationMessage(value = state.value.value) {
    if (props.required && (value === null || value === undefined || value === '')) {
        return props.invalidText || locale.value.radio.required
    }

    if (!props.validator) {
        return ''
    }

    const result = props.validator(value)

    return typeof result === 'string' ? result : result ? '' : props.invalidText || locale.value.radio.required
}

function validate() {
    internalError.value = getValidationMessage()

    return !internalError.value
}

function focus() {
    input.value?.focus()
}

defineExpose({
    focus,
    validate
})
</script>

<template>
    <label v-bind="mergedRootAttrs" data-h0n-component="radio" class="h-radio" :class="[checked && 'h-radio--checked', disabled && 'h-radio--disabled', visibleError && 'h-radio--error']">
        <input
            v-bind="props.controlAttrs"
            :id="controlId"
            ref="input"
            class="h-radio__input"
            type="radio"
            :name="name || undefined"
            :value="String(value)"
            :checked="checked"
            :disabled="disabled"
            :required="required"
            :aria-invalid="Boolean(visibleError)"
            :aria-describedby="visibleError ? messageId : undefined"
            :aria-label="ariaLabel || undefined"
            @change="select"
        />
        <span class="h-radio__indicator" aria-hidden="true">
            <span class="h-radio__dot" />
        </span>
        <span v-if="label || description || visibleError || $slots.default || $slots.description" class="h-radio__content">
            <span v-if="label || $slots.default" class="h-radio__label">
                <slot>{{ label }}</slot>
            </span>
            <H0Description v-if="description || $slots.description" as="span" class="h-radio__description" variant="body-xs">
                <slot name="description">{{ description }}</slot>
            </H0Description>
            <H0ErrorMessage v-if="visibleError" :id="messageId" as="span" class="h-radio__error" role="alert">{{ visibleError }}</H0ErrorMessage>
        </span>
    </label>
</template>

<style scoped lang="scss">
.h-radio {
    align-items: flex-start;
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

    &__indicator {
        align-items: center;
        background: var(--h0n-ui-color-secondary);
        border: 1px solid transparent;
        border-radius: var(--h0n-ui-radius-round);
        box-sizing: border-box;
        display: inline-flex;
        flex: 0 0 auto;
        height: 18px;
        justify-content: center;
        margin-top: 1px;
        transition:
            background-color var(--h0n-ui-duration-fast) ease,
            border-color var(--h0n-ui-duration-fast) ease,
            box-shadow var(--h0n-ui-duration-fast) ease;
        width: 18px;
    }

    &__dot {
        background: var(--h0n-ui-color-primary-contrast);
        border-radius: var(--h0n-ui-radius-round);
        height: 6px;
        opacity: 0;
        transform: scale(0.5);
        transition:
            opacity var(--h0n-ui-duration-fast) ease,
            transform var(--h0n-ui-duration-fast) ease;
        width: 6px;
    }

    &__content {
        display: grid;
        gap: 3px;
        min-width: 0;
    }

    &__label {
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-semibold);
        line-height: 1.3;
    }

    &__description {
        line-height: 1.35;
    }

    &--checked &__indicator {
        background: var(--h0n-ui-color-primary);
        border-color: var(--h0n-ui-color-primary);
    }

    &--checked &__dot {
        opacity: 1;
        transform: scale(1);
    }

    &--error &__indicator {
        border-color: var(--h0n-ui-color-danger);
    }

    &__input:focus-visible + &__indicator {
        box-shadow: var(--h0n-ui-focus-ring);
    }
}
</style>
