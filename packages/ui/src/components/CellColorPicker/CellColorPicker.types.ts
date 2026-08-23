import type { H0Size } from '../../types'

export type H0CellColorPickerDisplay = 'standard' | 'minimal'
export type H0CellColorPickerSwatchPosition = 'left' | 'right'
export type H0CellColorPickerVariant = 'secondary' | 'surface' | 'ghost'
export type H0CellColorPickerSize = H0Size

export type H0CellColorPickerProps = {
    modelValue?: string
    defaultValue?: string
    label?: string
    ariaLabel?: string
    display?: H0CellColorPickerDisplay
    swatchPosition?: H0CellColorPickerSwatchPosition
    variant?: H0CellColorPickerVariant
    size?: H0CellColorPickerSize
    disabled?: boolean
    id?: string
    name?: string
    teleportTo?: string | HTMLElement
    teleportDisabled?: boolean
    rootAttrs?: Record<string, unknown>
    controlAttrs?: Record<string, unknown>
}

export type H0CellColorPickerEmits = {
    'update:modelValue': [value: string]
    blur: [event: FocusEvent]
    change: [value: string]
    close: []
    focus: [event: FocusEvent]
    open: []
}
