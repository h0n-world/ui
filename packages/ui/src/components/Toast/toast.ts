import { inject, reactive, type App, type InjectionKey } from 'vue'
import type { H0ToastConfig, H0ToastId, H0ToastInput, H0ToastItem, H0ToastPlacement, H0ToastService, H0ToastState, H0ToastTone } from './Toast.types'

type ToastTimer = ReturnType<typeof setTimeout>

export const h0ToastKey: InjectionKey<H0ToastService> = Symbol('h0-toast')

export function createH0ToastService(config: H0ToastConfig = {}): H0ToastService {
    const timers = new Map<H0ToastId, ToastTimer>()
    const state = reactive<H0ToastState>({
        toasts: [],
        placement: config.placement ?? 'bottom-end'
    })
    let toastCounter = 0

    function createToastId() {
        toastCounter += 1
        return `h-toast-${Date.now()}-${toastCounter}`
    }

    function clearToastTimer(id: H0ToastId) {
        const timer = timers.get(id)

        if (timer) {
            clearTimeout(timer)
            timers.delete(id)
        }
    }

    function dismiss(id: H0ToastId) {
        clearToastTimer(id)
        state.toasts = state.toasts.filter((toast) => toast.id !== id)
    }

    function scheduleDismiss(id: H0ToastId, duration: number) {
        clearToastTimer(id)

        if (duration <= 0 || typeof window === 'undefined') {
            return
        }

        timers.set(id, window.setTimeout(() => dismiss(id), duration))
    }

    function show(input: H0ToastInput) {
        if (input.placement) {
            state.placement = input.placement
        }

        const id = createToastId()
        const toast: H0ToastItem = {
            ...input,
            id,
            tone: input.tone ?? 'default',
            closeMode: input.closeMode ?? 'button',
            createdAt: Date.now()
        }

        state.toasts.push(toast)
        scheduleDismiss(id, toast.duration)
        return id
    }

    function showTone(tone: H0ToastTone, input: Omit<H0ToastInput, 'tone'>) {
        return show({ ...input, tone })
    }

    function configure(nextConfig: H0ToastConfig) {
        if (nextConfig.placement) {
            state.placement = nextConfig.placement
        }
    }

    function update(id: H0ToastId, input: Partial<H0ToastInput>) {
        const index = state.toasts.findIndex((toast) => toast.id === id)

        if (index < 0) {
            return
        }

        state.toasts[index] = { ...state.toasts[index], ...input }

        if (input.placement) {
            state.placement = input.placement
        }

        if (input.duration !== undefined) {
            scheduleDismiss(id, input.duration)
        }
    }

    function dismissAll() {
        timers.forEach((timer) => clearTimeout(timer))
        timers.clear()
        state.toasts = []
    }

    return {
        state,
        show,
        default: (input) => showTone('default', input),
        info: (input) => showTone('info', input),
        success: (input) => showTone('success', input),
        warning: (input) => showTone('warning', input),
        danger: (input) => showTone('danger', input),
        update,
        configure,
        dismiss,
        dismissAll,
        dispose: dismissAll
    }
}

export function provideH0Toast(app: App, service: H0ToastService) {
    app.provide(h0ToastKey, service)
}

export function useH0Toast() {
    const service = inject(h0ToastKey)

    if (!service) {
        throw new Error('[H0N UI] Toast service is not provided. Install H0Nui or pass a service to H0Toasts.')
    }

    return service
}
