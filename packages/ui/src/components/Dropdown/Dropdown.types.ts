import type { H0CssSize, H0FloatingPlacement } from '../../types'

export type H0DropdownProps = {
    modelValue?: boolean
    defaultValue?: boolean
    disabled?: boolean
    placement?: H0FloatingPlacement
    offset?: number
    minWidth?: H0CssSize
    maxWidth?: H0CssSize
    minHeight?: H0CssSize
    maxHeight?: H0CssSize
    teleportTo?: string | HTMLElement
    teleportDisabled?: boolean
    id?: string
    ariaLabel?: string
    contentAttrs?: Record<string, unknown>
}

export type H0DropdownExpose = {
    open: () => void
    close: () => void
    toggle: () => void
}
