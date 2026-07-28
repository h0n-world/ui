import { computed, getCurrentInstance, inject, onBeforeUnmount, toValue, useId, watchEffect, type MaybeRefOrGetter } from 'vue'
import { h0FormContextKey, type H0FormFieldState, type H0FormValue } from '../Form/Form.types'
import { h0FieldKey } from '../Field/Field.context'

export type H0FormFieldOptions = {
    id: MaybeRefOrGetter<string | undefined>
    name: MaybeRefOrGetter<string | undefined>
    label: MaybeRefOrGetter<string | undefined>
    required: MaybeRefOrGetter<boolean | undefined>
    disabled?: MaybeRefOrGetter<boolean | undefined>
    error: MaybeRefOrGetter<string | undefined>
    hint: MaybeRefOrGetter<string | undefined>
    idPrefix: string
    getValue: () => H0FormValue | null | undefined
    getValidationMessage?: () => string
    focus?: () => void
    reset?: () => H0FormValue
}

export function useFormField(options: H0FormFieldOptions) {
    const generatedId = useId()
    const formContext = inject(h0FormContextKey, null)
    const fieldContext = inject(h0FieldKey, null)
    const instance = getCurrentInstance()
    const hasProp = (name: string) => {
        const values = instance?.vnode.props ?? {}
        const kebab = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
        return Object.prototype.hasOwnProperty.call(values, name) || Object.prototype.hasOwnProperty.call(values, kebab)
    }
    const resolvedName = computed(() => (hasProp('name') ? toValue(options.name) : fieldContext?.name.value ?? toValue(options.name)) ?? '')
    const resolvedLabel = computed(() => (hasProp('label') ? toValue(options.label) : fieldContext?.label.value ?? toValue(options.label)) ?? '')
    const resolvedRequired = computed(() => Boolean(hasProp('required') ? toValue(options.required) : fieldContext?.required.value ?? toValue(options.required)))
    const resolvedDisabled = computed(() => Boolean(hasProp('disabled') ? toValue(options.disabled) : fieldContext?.disabled.value ?? toValue(options.disabled)))
    const resolvedHint = computed(() => (hasProp('hint') ? toValue(options.hint) : fieldContext?.hint.value ?? toValue(options.hint)) ?? '')
    const resolvedExternalError = computed(() => (hasProp('error') ? toValue(options.error) : fieldContext?.error.value ?? toValue(options.error)) ?? '')
    const fieldName = resolvedName
    const controlId = computed(() => (hasProp('id') ? toValue(options.id) : fieldContext?.id.value ?? toValue(options.id)) || `${options.idPrefix}-${generatedId}`)
    const messageId = computed(() => fieldContext?.messageId.value ?? `${controlId.value}-message`)
    const fieldError = computed(() => resolvedExternalError.value || formContext?.getFieldError(fieldName.value) || '')
    const visibleError = computed(() => fieldError.value)
    const hasMessage = computed(() => Boolean(visibleError.value || resolvedHint.value))
    let unregisterField: (() => void) | undefined

    const getState = (): H0FormFieldState => ({
        disabled: resolvedDisabled.value,
        label: resolvedLabel.value,
        required: resolvedRequired.value,
        validationMessage: options.getValidationMessage?.() ?? '',
        value: options.getValue() ?? null,
        focus: options.focus,
        reset: options.reset
    })

    function setFormValue(value: H0FormValue) {
        formContext?.setFieldValue(fieldName.value, value, getState)
    }

    watchEffect(() => {
        unregisterField?.()
        unregisterField = formContext?.registerField(fieldName.value, getState)
    })

    onBeforeUnmount(() => {
        unregisterField?.()
    })

    return {
        controlId,
        fieldContext,
        fieldError,
        hasMessage,
        messageId,
        resolvedDisabled,
        resolvedHint,
        resolvedLabel,
        resolvedName,
        resolvedRequired,
        setFormValue,
        visibleError
    }
}
