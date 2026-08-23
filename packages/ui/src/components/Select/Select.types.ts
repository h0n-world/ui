import type { H0IconDefinition } from '../Icon'
import type { H0InputSize, H0InputVariant } from '../Input'
import type { H0AttributeRoutingProps } from '../../types'

export type H0SelectValue = string | number

export type H0SelectSize = H0InputSize
export type H0SelectVariant = H0InputVariant

export type H0SelectOption<Value extends H0SelectValue = H0SelectValue> = {
    label: string
    value: Value
    description?: string
    icon?: H0IconDefinition
    disabled?: boolean
}

export type H0SelectProps<Value extends H0SelectValue = H0SelectValue> = {
    modelValue?: Value | Value[] | null
    defaultValue?: Value | Value[] | null
    options?: H0SelectOption<Value>[]
    multiple?: boolean
    maxSelected?: number
    size?: H0SelectSize
    variant?: H0SelectVariant
    label?: string
    placeholder?: string
    disabled?: boolean
    loading?: boolean
    required?: boolean
    error?: string
    hint?: string
    id?: string
    name?: string
    emptyText?: string
    closeOnSelect?: boolean
    listAriaLabel?: string
    virtual?: boolean
    optionHeight?: number
    overscan?: number
    scrollHeight?: number | string
    teleportTo?: string | HTMLElement
    teleportDisabled?: boolean
    lockScroll?: boolean
} & H0AttributeRoutingProps

export type H0SelectEmits<Value extends H0SelectValue = H0SelectValue> = {
    'update:modelValue': [value: Value | Value[] | null]
    blur: [event: FocusEvent]
    change: [value: Value | Value[] | null]
    close: []
    focus: [event: FocusEvent]
    open: []
}
