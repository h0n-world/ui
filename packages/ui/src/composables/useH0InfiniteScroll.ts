import { onBeforeUnmount, onMounted, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'

export type H0InfiniteScrollOptions = {
    target: Readonly<Ref<Element | null | undefined>>
    hasMore: MaybeRefOrGetter<boolean>
    loading: MaybeRefOrGetter<boolean>
    onLoadMore: () => void
    root?: MaybeRefOrGetter<Element | Document | null | undefined>
    rootMargin?: string
    threshold?: number
}

export function useH0InfiniteScroll(options: H0InfiniteScrollOptions) {
    const locked = ref(false)
    let observer: IntersectionObserver | undefined

    function disconnect() {
        observer?.disconnect()
        observer = undefined
    }

    function observe() {
        disconnect()
        const target = options.target.value

        if (!target || typeof IntersectionObserver === 'undefined') {
            return
        }

        observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting) || locked.value || toValue(options.loading) || !toValue(options.hasMore)) {
                    return
                }

                locked.value = true
                options.onLoadMore()
            },
            { root: toValue(options.root) as Element | Document | null | undefined, rootMargin: options.rootMargin ?? '200px', threshold: options.threshold ?? 0 }
        )
        observer.observe(target)
    }

    watch(() => toValue(options.loading), (loading) => {
        if (!loading) {
            locked.value = false
        }
    })
    watch(() => options.target.value, observe)
    onMounted(observe)
    onBeforeUnmount(disconnect)

    return { disconnect, locked, observe }
}
