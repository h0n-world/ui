import { getCurrentInstance, onBeforeUnmount, onMounted, toValue, watch, type MaybeRefOrGetter } from 'vue'
import type { H0CssSize } from '../../types'

export function toH0CssSize(value: H0CssSize | undefined): string | undefined {
    return typeof value === 'number' ? `${value}px` : value
}

export function clampH0(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

export function useH0OptionalProp<T>(name: string, getValue: () => T): () => T | undefined {
    const instance = getCurrentInstance()
    const kebabName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

    return () => {
        const vnodeProps = instance?.vnode.props ?? {}
        return Object.prototype.hasOwnProperty.call(vnodeProps, name) || Object.prototype.hasOwnProperty.call(vnodeProps, kebabName) ? getValue() : undefined
    }
}

export function useH0ObjectUrl() {
    let currentUrl: string | undefined

    function revoke() {
        if (currentUrl && typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
            URL.revokeObjectURL(currentUrl)
            currentUrl = undefined
        }
    }

    function create(file: Blob) {
        revoke()
        if (typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') return ''
        currentUrl = URL.createObjectURL(file)
        return currentUrl
    }

    onBeforeUnmount(revoke)

    return { create, revoke }
}

export function useH0ResizeObserver(target: MaybeRefOrGetter<Element | null | undefined>, callback: ResizeObserverCallback) {
    let observer: ResizeObserver | undefined
    const disconnect = () => {
        observer?.disconnect()
        observer = undefined
    }
    const observe = () => {
        disconnect()
        const element = toValue(target)
        if (typeof ResizeObserver !== 'undefined' && element) {
            observer = new ResizeObserver(callback)
            observer.observe(element)
        }
    }

    onMounted(observe)
    watch(() => toValue(target), observe)
    onBeforeUnmount(disconnect)
    return { disconnect, observe }
}

export function useH0IntersectionObserver(target: MaybeRefOrGetter<Element | null | undefined>, callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    let observer: IntersectionObserver | undefined
    const disconnect = () => {
        observer?.disconnect()
        observer = undefined
    }
    const observe = () => {
        disconnect()
        const element = toValue(target)
        if (typeof IntersectionObserver !== 'undefined' && element) {
            observer = new IntersectionObserver(callback, options)
            observer.observe(element)
        }
    }

    onMounted(observe)
    watch(() => toValue(target), observe)
    onBeforeUnmount(disconnect)
    return { disconnect, observe }
}
