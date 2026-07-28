import type { H0IconDefinition } from '../Icon'
import type { UnwrapNestedRefs } from 'vue'

export type H0ToastTone = 'default' | 'info' | 'success' | 'warning' | 'danger'

export type H0ToastPlacement = 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end'

export type H0ToastCloseMode = 'button' | 'toast' | 'container'

export type H0ToastId = string

export type H0ToastInput = {
    title?: string
    description?: string
    icon?: H0IconDefinition
    duration: number
    tone?: H0ToastTone
    placement?: H0ToastPlacement
    closeMode?: H0ToastCloseMode
}

export type H0ToastItem = Required<Pick<H0ToastInput, 'duration' | 'tone'>> &
    Omit<H0ToastInput, 'duration' | 'tone'> & {
        id: H0ToastId
        createdAt: number
        closeMode: H0ToastCloseMode
    }

export type H0ToastConfig = {
    placement?: H0ToastPlacement
}

export type H0ToastState = {
    toasts: H0ToastItem[]
    placement: H0ToastPlacement
}

export type H0ToastService = {
    state: UnwrapNestedRefs<H0ToastState>
    show: (input: H0ToastInput) => H0ToastId
    default: (input: Omit<H0ToastInput, 'tone'>) => H0ToastId
    info: (input: Omit<H0ToastInput, 'tone'>) => H0ToastId
    success: (input: Omit<H0ToastInput, 'tone'>) => H0ToastId
    warning: (input: Omit<H0ToastInput, 'tone'>) => H0ToastId
    danger: (input: Omit<H0ToastInput, 'tone'>) => H0ToastId
    update: (id: H0ToastId, input: Partial<H0ToastInput>) => void
    configure: (config: H0ToastConfig) => void
    dismiss: (id: H0ToastId) => void
    dismissAll: () => void
    dispose: () => void
}
import type H0ToastComponent from './H0Toast.vue'
import type H0ToastsComponent from './H0Toasts.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0ToastProps = H0PublicProps<typeof H0ToastComponent>
export type H0ToastEmits = H0PublicEmits<typeof H0ToastComponent>
export type H0ToastsProps = H0PublicProps<typeof H0ToastsComponent>
