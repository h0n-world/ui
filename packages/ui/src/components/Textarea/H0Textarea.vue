<script setup lang="ts">
import { computed, nextTick, onMounted, useAttrs, useTemplateRef, watch } from 'vue'
import { useH0ControllableState } from '../../composables'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import H0Label from '../Typography/H0Label.vue'
import H0Typography from '../Typography/H0Typography.vue'
import { useFormField } from '../_shared/useFormField'
import { toH0CssSize } from '../_shared/utils'
import type { H0TextareaInputMode, H0TextareaSize, H0TextareaVariant } from './Textarea.types'

defineOptions({
    name: 'H0Textarea',
    inheritAttrs: false
})

const props = withDefaults(
    defineProps<{
        modelValue?: string
        size?: H0TextareaSize
        variant?: H0TextareaVariant
        label?: string
        placeholder?: string
        disabled?: boolean
        readonly?: boolean
        required?: boolean
        error?: string
        hint?: string
        id?: string
        name?: string
        autocomplete?: string
        inputmode?: H0TextareaInputMode
        maxlength?: number
        minRows?: number
        maxHeight?: number | string
        resize?: boolean
        autoResize?: boolean
        spellcheck?: boolean
        defaultValue?: string
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        size: 'md',
        variant: 'surface',
        label: '',
        placeholder: '',
        disabled: false,
        readonly: false,
        required: false,
        error: '',
        hint: '',
        id: '',
        name: '',
        autocomplete: '',
        inputmode: undefined,
        maxlength: undefined,
        minRows: 2,
        maxHeight: 220,
        resize: false,
        autoResize: true,
        spellcheck: true,
        defaultValue: ''
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
    blur: [event: FocusEvent]
    focus: [event: FocusEvent]
    input: [event: Event]
    change: [value: string]
}>()
const attrs = useAttrs()
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))
const state = useH0ControllableState({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue, onUpdate: (value) => emit('update:modelValue', value) })
const currentValue = state.value

const textarea = useTemplateRef<HTMLTextAreaElement>('textarea')
const { controlId, fieldContext, hasMessage, messageId, resolvedDisabled, resolvedHint, resolvedLabel, resolvedName, resolvedRequired, setFormValue, visibleError } = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => props.label,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error,
    hint: () => props.hint,
    idPrefix: 'h-textarea',
    getValue: () => currentValue.value,
    getValidationMessage: () => textarea.value?.validationMessage ?? '',
    focus: () => textarea.value?.focus(),
    reset: () => {
        const value = state.reset()
        emit('change', value)
        return value
    }
})
const normalizedRows = computed(() => Math.max(Math.floor(props.minRows || 2), 1))
const normalizedMaxHeight = computed(() => toH0CssSize(props.maxHeight))
const counterText = computed(() => {
    if (!props.maxlength) {
        return ''
    }

    return `${currentValue.value.length}/${props.maxlength}`
})
function updateValue(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value

    emit('input', event)
    state.setValue(value)
    emit('change', value)
    setFormValue(value)
    resizeTextarea()
}

function resizeTextarea() {
    if (!props.autoResize || !textarea.value || typeof window === 'undefined') {
        return
    }

    const field = textarea.value

    field.style.height = 'auto'

    const maxHeight = Number.parseFloat(window.getComputedStyle(field).maxHeight)
    const nextHeight = Number.isFinite(maxHeight) ? Math.min(field.scrollHeight, maxHeight) : field.scrollHeight

    field.style.height = `${nextHeight}px`
    field.style.overflowY = Number.isFinite(maxHeight) && field.scrollHeight > maxHeight ? 'auto' : 'hidden'
}

watch(
    () => [currentValue.value, props.minRows, props.maxHeight, props.autoResize],
    () => {
        nextTick(resizeTextarea)
    }
)

onMounted(() => {
    resizeTextarea()
})
</script>

<template>
    <label v-bind="mergedRootAttrs" data-h0n-component="textarea" class="h-textarea" :class="[`h-textarea--${size}`, `h-textarea--${variant}`, visibleError && 'h-textarea--error', resolvedDisabled && 'h-textarea--disabled', resize && 'h-textarea--resizable']">
        <H0Label v-if="!fieldContext && (resolvedLabel || $slots.label)" as="span" class="h-textarea__label" :required="resolvedRequired">
            <slot name="label">{{ resolvedLabel }}</slot>
        </H0Label>

        <span class="h-textarea__control">
            <textarea
                v-bind="props.controlAttrs"
                ref="textarea"
                class="h-textarea__field"
                :id="controlId"
                :value="currentValue"
                :name="resolvedName || undefined"
                :placeholder="placeholder"
                :disabled="resolvedDisabled"
                :readonly="readonly"
                :required="resolvedRequired"
                :autocomplete="autocomplete || undefined"
                :inputmode="inputmode || undefined"
                :maxlength="maxlength"
                :rows="normalizedRows"
                :spellcheck="spellcheck"
                :style="{ maxHeight: normalizedMaxHeight }"
                :aria-invalid="Boolean(visibleError)"
                :aria-required="resolvedRequired || undefined"
                :aria-describedby="hasMessage ? messageId : undefined"
                :aria-errormessage="visibleError ? messageId : undefined"
                @blur="emit('blur', $event)"
                @focus="emit('focus', $event)"
                @input="updateValue"
            />
        </span>

        <span v-if="(!fieldContext && hasMessage) || counterText" class="h-textarea__meta">
            <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId" as="span" class="h-textarea__message" role="alert">{{ visibleError }}</H0ErrorMessage>
            <H0Description v-else-if="!fieldContext && resolvedHint" :id="messageId" as="span" class="h-textarea__message">{{ resolvedHint }}</H0Description>
            <H0Typography v-if="counterText" as="span" class="h-textarea__counter" variant="body-xs" color="muted" :weight="500">{{ counterText }}</H0Typography>
        </span>
    </label>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-textarea {
    @include mixins.h0n-input-root;

    &--surface {
        @include mixins.h0n-input-variant('surface');
    }

    &--secondary {
        @include mixins.h0n-input-variant('secondary');
    }

    &__control {
        background: var(--h0n-input-control-background);
        border: 1px solid transparent;
        border-radius: var(--h0n-ui-radius-lg);
        display: flex;
        min-width: 0;
        padding: 10px 12px;
        transition:
            background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            box-shadow var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
    }

    &__field {
        background: transparent;
        border: 0;
        color: var(--h0n-ui-color-text);
        display: block;
        flex: 1 1 auto;
        font: inherit;
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-regular);
        line-height: 1.45;
        min-height: 0;
        min-width: 0;
        outline: none;
        overflow-y: hidden;
        padding: 0;
        resize: none;
        width: 100%;

        &::placeholder {
            color: var(--h0n-ui-color-muted);
            font-weight: var(--h0n-ui-font-weight-regular);
            opacity: 1;
        }
    }

    &__meta {
        align-items: start;
        display: flex;
        gap: var(--h0n-ui-spacing-md);
        justify-content: space-between;
        min-width: 0;
    }

    &__message {
        min-width: 0;
    }

    &__counter {
        flex: 0 0 auto;
        white-space: nowrap;
    }

    &:focus-within &__control {
        box-shadow: 0 0 0 2px var(--h0n-ui-color-primary);
    }

    &--sm &__control {
        padding: 8px 11px;
    }

    &--sm &__field {
        font-size: var(--h0n-ui-typography-body-sm-size);
        line-height: 1.4;
    }

    &--lg &__control {
        padding: 12px;
    }

    &--lg &__field {
        font-size: var(--h0n-ui-typography-body-size);
        line-height: 1.5;
    }

    &--resizable &__field {
        resize: vertical;
    }

    &--error &__control {
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--h0n-ui-color-danger) 52%, transparent);
    }

    &--disabled {
        opacity: 0.55;
    }
}
</style>
