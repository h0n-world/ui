import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'

export type H0SelectionMode = 'single' | 'multiple'

export type H0SelectionOptions<Key extends string | number> = {
    modelValue?: MaybeRefOrGetter<readonly Key[] | undefined>
    defaultValue?: readonly Key[]
    mode?: H0SelectionMode
    max?: number
    onUpdate?: (value: Key[]) => void
}

export function useH0Selection<Key extends string | number>(options: H0SelectionOptions<Key> = {}) {
    const internalValue = ref<Key[]>([...(options.defaultValue ?? [])])
    const isControlled = computed(() => options.modelValue !== undefined && toValue(options.modelValue) !== undefined)
    const value = computed(() => [...(isControlled.value ? (toValue(options.modelValue!) ?? []) : internalValue.value)] as Key[])

    function commit(nextValue: Key[]) {
        if (!isControlled.value) {
            internalValue.value = nextValue
        }
        options.onUpdate?.(nextValue)
    }

    function toggle(key: Key) {
        const selected = value.value.includes(key)
        let nextValue = selected ? value.value.filter((item) => item !== key) : options.mode === 'single' ? [key] : [...value.value, key]

        if (options.max !== undefined) {
            nextValue = nextValue.slice(0, Math.max(0, options.max))
        }

        commit(nextValue)
    }

    return {
        clear: () => commit([]),
        isSelected: (key: Key) => value.value.includes(key),
        selectAll: (keys: readonly Key[]) => commit(options.mode === 'single' ? keys.slice(0, 1) : [...keys]),
        toggle,
        value
    }
}
