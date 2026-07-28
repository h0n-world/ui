import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useH0MediaQuery(query: string, fallback = false) {
    const matches = ref(fallback)
    let mediaQuery: MediaQueryList | undefined

    function update(event?: MediaQueryListEvent) {
        matches.value = event?.matches ?? mediaQuery?.matches ?? fallback
    }

    onMounted(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return
        }

        mediaQuery = window.matchMedia(query)
        update()
        mediaQuery.addEventListener('change', update)
    })

    onBeforeUnmount(() => mediaQuery?.removeEventListener('change', update))

    return matches
}
