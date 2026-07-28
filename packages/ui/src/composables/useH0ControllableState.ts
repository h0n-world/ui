import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'

export type H0ControllableStateOptions<T> = {
    modelValue: MaybeRefOrGetter<T | undefined>
    defaultValue: T | (() => T)
    onUpdate?: (value: T) => void
}

export function useH0ControllableState<T>(options: H0ControllableStateOptions<T>) {
    const initialValue = typeof options.defaultValue === 'function' ? (options.defaultValue as () => T)() : options.defaultValue
    const internalValue = ref(initialValue) as { value: T }
    const isControlled = computed(() => toValue(options.modelValue) !== undefined)
    const value = computed<T>(() => (isControlled.value ? (toValue(options.modelValue) as T) : internalValue.value))

    function setValue(nextValue: T) {
        if (!isControlled.value) {
            internalValue.value = nextValue
        }

        options.onUpdate?.(nextValue)
    }

    function reset() {
        const nextValue = typeof options.defaultValue === 'function' ? (options.defaultValue as () => T)() : options.defaultValue
        setValue(nextValue)
        return nextValue
    }

    return { internalValue, isControlled, reset, setValue, value }
}
