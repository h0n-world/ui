import { nextTick, onBeforeUnmount, toValue, watch, type MaybeRefOrGetter, type Ref, type WatchSource } from 'vue'
import { useH0DocumentScrollLock } from './useDocumentScrollLock'

type H0DocumentOverlayState = {
    stack: symbol[]
}

const documentStates = new WeakMap<Document, H0DocumentOverlayState>()
const focusableSelector = ['a[href]', 'button', 'input', 'select', 'textarea', '[contenteditable="true"]', '[tabindex]'].join(',')

function getDocumentState(document: Document) {
    let state = documentStates.get(document)

    if (!state) {
        state = { stack: [] }
        documentStates.set(document, state)
    }

    return state
}

function isFocusable(element: HTMLElement) {
    if (element.matches(':disabled, [hidden], [inert], [aria-hidden="true"]') || element.closest('[hidden], [inert], [aria-hidden="true"], fieldset:disabled')) {
        return false
    }

    const style = element.ownerDocument.defaultView?.getComputedStyle(element)
    return element.tabIndex >= 0 && style?.display !== 'none' && style?.visibility !== 'hidden'
}

export type H0OverlayOptions = {
    isOpen: WatchSource<boolean>
    closeOnEsc?: WatchSource<boolean>
    initialFocus?: MaybeRefOrGetter<string | HTMLElement | undefined>
    lockClass: string
    lockScroll?: WatchSource<boolean>
    scrollLockActive?: WatchSource<boolean>
    onClose: () => void
    panel: Readonly<Ref<HTMLElement | null>>
    returnFocus?: MaybeRefOrGetter<boolean | HTMLElement | undefined>
}

export function useOverlay(options: H0OverlayOptions) {
    const overlayId = Symbol('h0-overlay')
    let isKeydownBound = false
    let previouslyFocusedElement: HTMLElement | null = null

    function getDocument() {
        return options.panel.value?.ownerDocument ?? (typeof document === 'undefined' ? undefined : document)
    }

    function isTopOverlay() {
        const ownerDocument = getDocument()
        return ownerDocument ? getDocumentState(ownerDocument).stack.at(-1) === overlayId : false
    }

    function addToStack() {
        const ownerDocument = getDocument()
        if (!ownerDocument) return
        const stack = getDocumentState(ownerDocument).stack
        const index = stack.indexOf(overlayId)
        if (index >= 0) stack.splice(index, 1)
        stack.push(overlayId)
    }

    function removeFromStack() {
        const ownerDocument = getDocument()
        if (!ownerDocument) return
        const stack = getDocumentState(ownerDocument).stack
        const index = stack.indexOf(overlayId)
        if (index >= 0) stack.splice(index, 1)
    }

    function getFocusableElements() {
        return Array.from(options.panel.value?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter(isFocusable)
    }

    function resolveInitialFocus(panel: HTMLElement) {
        const requested = options.initialFocus === undefined ? undefined : toValue(options.initialFocus)
        if (requested instanceof HTMLElement) return requested
        if (typeof requested === 'string') return panel.querySelector<HTMLElement>(requested)
        return panel.querySelector<HTMLElement>('[autofocus]') ?? getFocusableElements()[0] ?? panel
    }

    function trapFocus(event: KeyboardEvent) {
        const panel = options.panel.value
        if (!panel) return
        const elements = getFocusableElements()
        if (!elements.length) {
            event.preventDefault()
            panel.focus({ preventScroll: true })
            return
        }
        const first = elements[0]
        const last = elements.at(-1) ?? first
        const active = panel.ownerDocument.activeElement
        if (event.shiftKey && (active === first || !panel.contains(active))) {
            event.preventDefault()
            last.focus({ preventScroll: true })
        } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
            event.preventDefault()
            first.focus({ preventScroll: true })
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!isTopOverlay()) return
        if (event.key === 'Escape' && (options.closeOnEsc === undefined || Boolean(toValue(options.closeOnEsc)))) {
            event.preventDefault()
            options.onClose()
        } else if (event.key === 'Tab') {
            trapFocus(event)
        }
    }

    function setKeydownListener(isBound: boolean) {
        const ownerDocument = getDocument()
        if (!ownerDocument || isKeydownBound === isBound) return
        isKeydownBound = isBound
        if (isBound) ownerDocument.addEventListener('keydown', handleKeydown)
        else ownerDocument.removeEventListener('keydown', handleKeydown)
    }

    function restoreFocus() {
        const requested = options.returnFocus === undefined ? true : toValue(options.returnFocus)
        const target = requested instanceof HTMLElement ? requested : requested ? previouslyFocusedElement : null
        if (target?.isConnected) target.focus({ preventScroll: true })
        previouslyFocusedElement = null
    }

    watch(
        options.isOpen,
        async (isOpen) => {
            setKeydownListener(isOpen)
            if (isOpen) {
                const ownerDocument = getDocument()
                if (!ownerDocument) return
                previouslyFocusedElement = ownerDocument.activeElement instanceof HTMLElement ? ownerDocument.activeElement : null
                addToStack()
                await nextTick()
                if (toValue(options.isOpen) && isTopOverlay()) resolveInitialFocus(options.panel.value!)?.focus({ preventScroll: true })
                return
            }
            const wasTop = isTopOverlay()
            removeFromStack()
            if (wasTop) {
                await nextTick()
                restoreFocus()
            } else previouslyFocusedElement = null
        },
        { immediate: true }
    )

    useH0DocumentScrollLock(options.scrollLockActive ?? options.isOpen, {
        enabled: options.lockScroll,
        lockClass: options.lockClass,
        ownerDocument: getDocument
    })

    onBeforeUnmount(() => {
        const wasTop = isTopOverlay()
        removeFromStack()
        setKeydownListener(false)
        if (wasTop) restoreFocus()
    })
}
