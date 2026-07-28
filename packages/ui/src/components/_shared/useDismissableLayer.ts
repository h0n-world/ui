import { onBeforeUnmount, watch, type MaybeRefOrGetter, type Ref, toValue } from 'vue'

const documentLayers = new WeakMap<Document, symbol[]>()

export function useDismissableLayer(options: { open: MaybeRefOrGetter<boolean>; layers: Ref<Array<HTMLElement | null>>; onDismiss: () => void; closeOnEscape?: MaybeRefOrGetter<boolean> }) {
    const id = Symbol('h0-layer')
    let ownerDocument: Document | undefined

    function stack() {
        if (!ownerDocument) return []
        let value = documentLayers.get(ownerDocument)
        if (!value) documentLayers.set(ownerDocument, (value = []))
        return value
    }

    function top() {
        return stack().at(-1) === id
    }

    function onPointerDown(event: PointerEvent) {
        if (!top() || options.layers.value.some((layer) => layer?.contains(event.target as Node))) return
        options.onDismiss()
    }

    function onKeydown(event: KeyboardEvent) {
        if (top() && event.key === 'Escape' && toValue(options.closeOnEscape) !== false) {
            event.preventDefault()
            options.onDismiss()
        }
    }

    function remove() {
        if (!ownerDocument) return
        const values = stack()
        const index = values.indexOf(id)
        if (index >= 0) values.splice(index, 1)
        ownerDocument.removeEventListener('pointerdown', onPointerDown, true)
        ownerDocument.removeEventListener('keydown', onKeydown)
        ownerDocument = undefined
    }

    watch(
        () => Boolean(toValue(options.open)),
        (open) => {
            remove()
            if (!open) return
            const element = options.layers.value.find(Boolean)
            ownerDocument = element?.ownerDocument ?? (typeof document === 'undefined' ? undefined : document)
            if (!ownerDocument) return
            stack().push(id)
            ownerDocument.addEventListener('pointerdown', onPointerDown, true)
            ownerDocument.addEventListener('keydown', onKeydown)
        },
        { flush: 'post' }
    )
    onBeforeUnmount(remove)
}
