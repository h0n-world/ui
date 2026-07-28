<script setup lang="ts">
import { computed, nextTick, provide, ref, useTemplateRef, watch } from 'vue'
import { useH0Locale } from '../../locale'
import { h0FormContextKey, type H0FormErrors, type H0FormFieldState, type H0FormSubmitPayload, type H0FormValue, type H0FormValues } from './Form.types'

defineOptions({
    name: 'H0Form'
})

const props = withDefaults(
    defineProps<{
        modelValue?: H0FormValues
        errors?: H0FormErrors
        validateOnSubmit?: boolean
        clearErrorOnInput?: boolean
        novalidate?: boolean
        id?: string
        name?: string
    }>(),
    {
        modelValue: () => ({}),
        errors: () => ({}),
        validateOnSubmit: true,
        clearErrorOnInput: true,
        novalidate: true,
        id: '',
        name: ''
    }
)

const emit = defineEmits<{
    'update:modelValue': [values: H0FormValues]
    'update:errors': [errors: H0FormErrors]
    change: [values: H0FormValues]
    invalid: [payload: H0FormSubmitPayload]
    reset: [event: Event]
    submit: [payload: H0FormSubmitPayload]
}>()

const formRef = useTemplateRef<HTMLFormElement>('formRef')
const values = ref<H0FormValues>({ ...props.modelValue })
const errors = ref<H0FormErrors>({ ...props.errors })
const fields = new Map<string, Map<symbol, () => H0FormFieldState>>()
let validationErrors: H0FormErrors = {}
const { locale } = useH0Locale()

const hasErrors = computed(() => Object.keys(errors.value).length > 0)
const hasOwn = (value: object, key: string) => Object.prototype.hasOwnProperty.call(value, key)

function getFormData() {
    return formRef.value ? new FormData(formRef.value) : new FormData()
}

function normalizeRegisteredValues(fieldValues: H0FormValue[]) {
    return fieldValues.length === 1 ? fieldValues[0] : fieldValues.flatMap((value) => (Array.isArray(value) ? value : [value]))
}

function readValues(formData = getFormData(), registeredOverrides: H0FormValues = {}) {
    const nextValues: H0FormValues = {}

    fields.forEach((registrations, name) => {
        if (hasOwn(registeredOverrides, name)) {
            nextValues[name] = registeredOverrides[name]
            return
        }

        const registeredValues = [...registrations.values()]
            .map((getState) => getState())
            .filter((field) => !field.disabled)
            .map((field) => field.value ?? null)

        if (registeredValues.length) {
            nextValues[name] = normalizeRegisteredValues(registeredValues)
        }
    })

    formData.forEach((value, key) => {
        if (fields.has(key)) {
            return
        }

        if (hasOwn(nextValues, key)) {
            const currentValue = nextValues[key]

            nextValues[key] = Array.isArray(currentValue) ? [...currentValue, value] : [currentValue, value]
        } else {
            nextValues[key] = value
        }
    })

    return nextValues
}

function isSameValue(left: H0FormValue, right: H0FormValue) {
    if (Array.isArray(left) || Array.isArray(right)) {
        return Array.isArray(left) && Array.isArray(right) && left.length === right.length && left.every((value, index) => Object.is(value, right[index]))
    }

    return Object.is(left, right)
}

function isSameValues(left: H0FormValues, right: H0FormValues) {
    const leftKeys = Object.keys(left)
    const rightKeys = Object.keys(right)

    return leftKeys.length === rightKeys.length && leftKeys.every((key) => hasOwn(right, key) && isSameValue(left[key], right[key]))
}

function commitValues(nextValues: H0FormValues, emitChange = false) {
    if (isSameValues(values.value, nextValues)) {
        return values.value
    }

    values.value = nextValues
    emit('update:modelValue', nextValues)

    if (emitChange) {
        emit('change', nextValues)
    }

    return nextValues
}

function collectValues() {
    return commitValues(readValues())
}

function getNativeErrors() {
    const nextErrors: H0FormErrors = {}
    const form = formRef.value

    if (!form || !props.validateOnSubmit) {
        return nextErrors
    }

    Array.from(form.elements).forEach((element) => {
        if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
            return
        }

        if (!element.name || element.disabled || element.validity.valid) {
            return
        }

        nextErrors[element.name] = element.validationMessage
    })

    return nextErrors
}

function isEmptyValue(value: H0FormValue | null | undefined) {
    if (Array.isArray(value)) {
        return value.length === 0
    }

    return value == null || value === false || String(value).trim().length === 0
}

function getFieldErrors() {
    const nextErrors: H0FormErrors = {}

    if (!props.validateOnSubmit) {
        return nextErrors
    }

    fields.forEach((registrations, name) => {
        const states = [...registrations.values()].map((getState) => getState()).filter((field) => !field.disabled)
        const requiredField = states.find((field) => field.required && isEmptyValue(field.value))

        if (requiredField) {
            nextErrors[name] = locale.value.form.required(requiredField.label)
            return
        }

        const validationMessage = states.find((field) => field.validationMessage)?.validationMessage

        if (validationMessage) {
            nextErrors[name] = validationMessage
        }
    })

    return nextErrors
}

function isSameErrors(left: H0FormErrors, right: H0FormErrors) {
    const leftKeys = Object.keys(left)
    const rightKeys = Object.keys(right)

    return leftKeys.length === rightKeys.length && leftKeys.every((key) => left[key] === right[key])
}

function commitErrors(nextErrors: H0FormErrors) {
    if (isSameErrors(errors.value, nextErrors)) {
        return errors.value
    }

    errors.value = { ...nextErrors }
    emit('update:errors', errors.value)

    return errors.value
}

function setErrors(nextErrors: H0FormErrors) {
    validationErrors = {}
    return commitErrors(nextErrors)
}

function setFieldValue(name: string, value: H0FormValue, source?: () => H0FormFieldState) {
    if (!name) {
        return
    }

    const registrations = fields.get(name)
    const registeredValues = source && registrations
        ? [...registrations.values()]
            .map((getState) => {
                const state = getState()
                return { ...state, value: getState === source ? value : state.value }
            })
            .filter((field) => !field.disabled)
            .map((field) => field.value ?? null)
        : []
    const nextValue = registeredValues.length ? normalizeRegisteredValues(registeredValues) : value

    commitValues({
        ...values.value,
        [name]: nextValue
    }, true)

    if (props.clearErrorOnInput) {
        clearFieldError(name)
    }
}

function getFieldError(name: string) {
    return name ? errors.value[name] ?? '' : ''
}

function clearFieldError(name: string) {
    if (!name || !errors.value[name]) {
        return
    }

    const nextErrors = { ...errors.value }

    delete nextErrors[name]
    delete validationErrors[name]
    commitErrors(nextErrors)
}

function registerField(name: string, getState: () => H0FormFieldState) {
    if (!name) {
        return () => undefined
    }

    const registrationId = Symbol(name)
    const registrations = fields.get(name) ?? new Map<symbol, () => H0FormFieldState>()

    registrations.set(registrationId, getState)
    fields.set(name, registrations)

    return () => {
        registrations.delete(registrationId)

        if (!registrations.size) {
            fields.delete(name)
        }
    }
}

function buildPayload(event: SubmitEvent): H0FormSubmitPayload {
    const formData = getFormData()
    const nextValues = commitValues(readValues(formData))
    const nextValidationErrors = {
        ...getNativeErrors(),
        ...getFieldErrors()
    }
    const persistentErrors = { ...errors.value, ...props.errors }

    Object.entries(validationErrors).forEach(([name, message]) => {
        if (persistentErrors[name] === message) {
            delete persistentErrors[name]
        }
    })

    const nextErrors = { ...nextValidationErrors, ...persistentErrors }

    validationErrors = nextValidationErrors
    commitErrors(nextErrors)

    return {
        event,
        errors: nextErrors,
        formData,
        valid: Object.keys(nextErrors).length === 0,
        values: nextValues
    }
}

function submit() {
    formRef.value?.requestSubmit()
}

function reset() {
    if (formRef.value) {
        formRef.value.reset()
        return
    }

    values.value = {}
    validationErrors = {}
    commitErrors({})
    emit('update:modelValue', values.value)
}

function handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    const payload = buildPayload(event)

    if (payload.valid) {
        emit('submit', payload)
    } else {
        emit('invalid', payload)
        const firstErrorName = Object.keys(payload.errors)[0]
        const firstField = firstErrorName ? fields.get(firstErrorName)?.values().next().value?.() : undefined

        firstField?.focus?.()
    }
}

function handleReset(event: Event) {
    emit('reset', event)

    if (event.defaultPrevented) {
        return
    }

    const resetValues: H0FormValues = {}

    fields.forEach((registrations, name) => {
        const nextValues = [...registrations.values()]
            .map((getState) => {
                const state = getState()
                const value = state.reset?.() ?? state.value ?? null

                return { disabled: state.disabled, value }
            })
            .filter((field) => !field.disabled)
            .map((field) => field.value)

        if (nextValues.length) {
            resetValues[name] = normalizeRegisteredValues(nextValues)
        }
    })

    validationErrors = {}
    commitErrors({})
    void nextTick(() => commitValues(readValues(getFormData(), resetValues), true))
}

function handleChange(event: Event) {
    const target = event.target

    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
        if (fields.has(target.name)) {
            return
        }

        if (props.clearErrorOnInput) {
            clearFieldError(target.name)
        }
    }

    commitValues(readValues(), true)
}

provide(h0FormContextKey, {
    errors,
    clearFieldError,
    getFieldError,
    registerField,
    setFieldValue
})

watch(
    () => props.modelValue,
    (nextValues) => {
        values.value = { ...nextValues }
    },
    { deep: true }
)

watch(
    () => props.errors,
    (nextErrors) => {
        errors.value = { ...nextErrors }
    },
    { deep: true }
)

defineExpose({
    clearFieldError,
    collectValues,
    errors,
    getFieldError,
    hasErrors,
    registerField,
    reset,
    setErrors,
    setFieldValue,
    submit,
    values
})
</script>

<template>
    <form ref="formRef" data-h0n-component="form" class="h-form" :id="id || undefined" :name="name || undefined" :novalidate="novalidate" @change="handleChange" @reset="handleReset" @submit="handleSubmit">
        <slot :errors="errors" :has-errors="hasErrors" :values="values" :submit="submit" :reset="reset" :set-errors="setErrors" :clear-field-error="clearFieldError" />
    </form>
</template>

<style scoped lang="scss">
.h-form {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    min-width: 0;
}
</style>
