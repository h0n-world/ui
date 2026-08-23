import type { H0IconDefinition } from '../Icon/Icon.types'
import type { H0OverlayBackdrop } from '../_shared/Overlay.types'
import type { H0CollectionValue, H0Size } from '../../types'

export type H0CommandVariant = 'surface' | 'secondary' | 'ghost' | 'outline'
export type H0CommandBackdrop = H0OverlayBackdrop
export type H0CommandSize = H0Size
export type H0CommandWindowSize = H0Size

export type H0CommandItem<Value extends H0CollectionValue = H0CollectionValue> = {
    value: Value
    label: string
    description?: string
    group?: string
    keywords?: readonly string[]
    icon?: H0IconDefinition
    shortcut?: string
    disabled?: boolean
}

export type H0CommandProps = {
    modelValue?: boolean
    defaultValue?: boolean
    query?: string
    defaultQuery?: string
    items?: readonly H0CommandItem[]
    variant?: H0CommandVariant
    backdrop?: H0CommandBackdrop
    size?: H0CommandSize
    windowSize?: H0CommandWindowSize
    hotkey?: string
    triggerLabel?: string
    placeholder?: string
    emptyText?: string
    ariaLabel?: string
    disabled?: boolean
    closeOnSelect?: boolean
    closeOnBackdrop?: boolean
    closeOnEsc?: boolean
    resetQueryOnClose?: boolean
    showFooter?: boolean
    teleportTo?: string | HTMLElement
    teleportDisabled?: boolean
    returnFocus?: boolean | HTMLElement
    lockScroll?: boolean
    rootAttrs?: Record<string, unknown>
    triggerAttrs?: Record<string, unknown>
}

export type H0CommandEmits = {
    'update:modelValue': [value: boolean]
    'update:query': [value: string]
    change: [value: boolean]
    close: []
    open: []
    search: [value: string]
    select: [item: H0CommandItem]
}
