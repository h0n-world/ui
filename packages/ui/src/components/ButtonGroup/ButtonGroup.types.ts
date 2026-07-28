import type { H0ButtonSize, H0ButtonTone, H0ButtonVariant } from '../Button/Button.types'

export type H0ButtonGroupItem = {
    key?: string
    label?: string
    slot?: string
    variant?: H0ButtonVariant
    tone?: H0ButtonTone
    size?: H0ButtonSize
    disabled?: boolean
    loading?: boolean
    loadingText?: string
    fullWidth?: boolean
}

export type H0ButtonGroupProps = {
    variant?: H0ButtonVariant
    tone?: H0ButtonTone
    size?: H0ButtonSize
    disabled?: boolean
    fullWidth?: boolean
    buttons?: H0ButtonGroupItem[]
    ariaLabel?: string
}

export type H0ButtonGroupEmits = {
    'button-click': [button: H0ButtonGroupItem, index: number]
}
