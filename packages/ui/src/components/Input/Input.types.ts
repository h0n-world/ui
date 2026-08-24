import type { H0IconSource } from '../Icon'
import type { H0Size } from '../../types'

export type H0InputInputMode = 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url'

export type H0InputSize = H0Size
export type H0InputVariant = 'secondary' | 'surface'

export type H0InputProps = {
    modelValue?: string
    type?: string
    size?: H0InputSize
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
}

export type H0InputEmits = {
    'update:modelValue': [value: string]
    blur: [event: FocusEvent]
    clear: []
    focus: [event: FocusEvent]
    change: [value: string]
    input: [value: string, event: Event]
}
