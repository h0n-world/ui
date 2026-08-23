import { onBeforeUnmount, toValue, watch, type MaybeRefOrGetter, type WatchSource } from 'vue'

type H0ScrollLockSnapshot = {
    scrollX: number
    scrollY: number
    documentElement: {
        overflow: string
        overscrollBehavior: string
    }
    body: {
        paddingInlineEnd: string
    }
}

type H0DocumentScrollLockState = {
    locks: Map<string, number>
    releaseScrollGuard?: () => void
    snapshot?: H0ScrollLockSnapshot
}

type H0DocumentScrollLockOptions = {
    enabled?: WatchSource<boolean>
    lockClass?: string
    ownerDocument?: MaybeRefOrGetter<Document | undefined>
}

const documentStates = new WeakMap<Document, H0DocumentScrollLockState>()

function getDocumentState(ownerDocument: Document) {
    let state = documentStates.get(ownerDocument)
    if (!state) {
        state = { locks: new Map() }
        documentStates.set(ownerDocument, state)
    }
    return state
}

function getLockCount(state: H0DocumentScrollLockState) {
    return Array.from(state.locks.values()).reduce((total, count) => total + count, 0)
}

function installScrollGuard(view: Window, state: H0DocumentScrollLockState) {
    const keepLayoutViewportLocked = () => {
        const snapshot = state.snapshot
        if (!snapshot) return

        if (view.scrollX === snapshot.scrollX && view.scrollY === snapshot.scrollY) return
        view.scrollTo(snapshot.scrollX, snapshot.scrollY)
    }

    view.addEventListener('scroll', keepLayoutViewportLocked, { passive: true })
    view.visualViewport?.addEventListener('scroll', keepLayoutViewportLocked, { passive: true })
    state.releaseScrollGuard = () => {
        view.removeEventListener('scroll', keepLayoutViewportLocked)
        view.visualViewport?.removeEventListener('scroll', keepLayoutViewportLocked)
        state.releaseScrollGuard = undefined
    }
}

function applyDocumentLock(ownerDocument: Document, state: H0DocumentScrollLockState) {
    const view = ownerDocument.defaultView
    const documentElement = ownerDocument.documentElement
    const body = ownerDocument.body
    const scrollX = view?.scrollX ?? 0
    const scrollY = view?.scrollY ?? 0

    state.snapshot = {
        scrollX,
        scrollY,
        documentElement: {
            overflow: documentElement.style.overflow,
            overscrollBehavior: documentElement.style.overscrollBehavior
        },
        body: {
            paddingInlineEnd: body.style.paddingInlineEnd
        }
    }

    const scrollbarWidth = view && documentElement.clientWidth > 0 ? Math.max(0, view.innerWidth - documentElement.clientWidth) : 0
    if (scrollbarWidth) {
        const currentPadding = Number.parseFloat(view?.getComputedStyle(body).paddingInlineEnd ?? '') || 0
        body.style.paddingInlineEnd = `${currentPadding + scrollbarWidth}px`
    }

    documentElement.style.overflow = 'hidden'
    documentElement.style.overscrollBehavior = 'none'

    if (view) installScrollGuard(view, state)
}

function restoreDocumentLock(ownerDocument: Document, state: H0DocumentScrollLockState) {
    const snapshot = state.snapshot
    if (!snapshot) return

    const documentElement = ownerDocument.documentElement
    const body = ownerDocument.body
    state.releaseScrollGuard?.()
    documentElement.style.overflow = snapshot.documentElement.overflow
    documentElement.style.overscrollBehavior = snapshot.documentElement.overscrollBehavior
    body.style.paddingInlineEnd = snapshot.body.paddingInlineEnd
    state.snapshot = undefined

    const view = ownerDocument.defaultView
    if ((snapshot.scrollX || snapshot.scrollY) && view) {
        const restoreScrollPosition = () => view.scrollTo(snapshot.scrollX, snapshot.scrollY)
        restoreScrollPosition()
        view.requestAnimationFrame?.(() => {
            if (getLockCount(state) === 0 && !state.snapshot) restoreScrollPosition()
        })
    }
}

function toggleLockClass(ownerDocument: Document, state: H0DocumentScrollLockState, lockClass: string) {
    const active = (state.locks.get(lockClass) ?? 0) > 0
    ownerDocument.documentElement.classList.toggle(lockClass, active)
    ownerDocument.body.classList.toggle(lockClass, active)
}

export function useH0DocumentScrollLock(isLocked: WatchSource<boolean>, options: H0DocumentScrollLockOptions = {}) {
    const lockClass = options.lockClass ?? 'h-overlay-lock-scroll'
    let lockedDocument: Document | undefined

    function getDocument() {
        return options.ownerDocument === undefined ? (typeof document === 'undefined' ? undefined : document) : toValue(options.ownerDocument)
    }

    function setLock(shouldLock: boolean) {
        const ownerDocument = lockedDocument ?? getDocument()
        if (!ownerDocument) return
        const state = getDocumentState(ownerDocument)
        const currentCount = state.locks.get(lockClass) ?? 0

        if (shouldLock && !lockedDocument) {
            const isFirstLock = getLockCount(state) === 0
            lockedDocument = ownerDocument
            state.locks.set(lockClass, currentCount + 1)
            if (isFirstLock) applyDocumentLock(ownerDocument, state)
        } else if (!shouldLock && lockedDocument) {
            const nextCount = Math.max(currentCount - 1, 0)
            if (nextCount) state.locks.set(lockClass, nextCount)
            else state.locks.delete(lockClass)
            lockedDocument = undefined
            if (getLockCount(state) === 0) restoreDocumentLock(ownerDocument, state)
        }

        toggleLockClass(ownerDocument, state, lockClass)
    }

    watch([() => Boolean(toValue(isLocked)), () => (options.enabled === undefined ? true : Boolean(toValue(options.enabled)))], ([active, enabled]) => setLock(active && enabled), { immediate: true })

    onBeforeUnmount(() => setLock(false))
}
