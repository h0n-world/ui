import { computed } from 'vue'
import { useH0Theme } from '../theme'

export function useH0ReducedMotion() {
    const { resolvedAnimation } = useH0Theme()
    return computed(() => resolvedAnimation.value === 'off' || resolvedAnimation.value === 'low')
}
