import { computed } from 'vue'
import { useH0Theme } from '../theme'
import { useH0MediaQuery } from './useH0MediaQuery'

export function useH0ReducedMotion() {
    const systemPreference = useH0MediaQuery('(prefers-reduced-motion: reduce)')
    const { animation } = useH0Theme()

    return computed(() => systemPreference.value || animation.value === 'low')
}
