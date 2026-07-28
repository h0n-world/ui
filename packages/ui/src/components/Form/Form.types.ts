import type { InjectionKey, Ref } from 'vue'

export type H0FormScalar = string | number | boolean | File | null
export type H0FormValue = H0FormScalar | H0FormScalar[]
export type H0FormValues = Record<string, H0FormValue>
export type H0FormErrors = Record<string, string>

export type H0FormSubmitPayload = {
    event: SubmitEvent
    errors: H0FormErrors
    formData: FormData
    valid: boolean
    values: H0FormValues
}

export type H0FormInvalidPayload = H0FormSubmitPayload

export type H0FormFieldState = {
    disabled?: boolean
    label?: string
    required?: boolean
    validationMessage?: string
    value?: H0FormValue
    focus?: () => void
    reset?: () => H0FormValue
}

export type H0FormContext = {
    errors: Ref<H0FormErrors>
    clearFieldError: (name: string) => void
    getFieldError: (name: string) => string
    registerField: (name: string, getState: () => H0FormFieldState) => () => void
    setFieldValue: (name: string, value: H0FormValue, source?: () => H0FormFieldState) => void
}

export const h0FormContextKey: InjectionKey<H0FormContext> = Symbol('h0FormContext')
import type H0FormComponent from './H0Form.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0FormProps = H0PublicProps<typeof H0FormComponent>
export type H0FormEmits = H0PublicEmits<typeof H0FormComponent>
