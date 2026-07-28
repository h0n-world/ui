import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import type { H0SelectOption, H0SelectValue } from './Select.types'
import { useH0CollectionNavigation } from '../_shared/useCollectionNavigation'

export type H0SelectNavigationOptions<Value extends H0SelectValue = H0SelectValue> = {
    interactive: MaybeRefOrGetter<boolean>
    isOptionDisabled: (option: H0SelectOption<Value>) => boolean
    isSelected: (option: H0SelectOption<Value>) => boolean
    onClose: () => void
    onOpen: () => void
    onSelect: (option: H0SelectOption<Value>) => void
    options: MaybeRefOrGetter<H0SelectOption<Value>[]>
}

export function useSelectNavigation<Value extends H0SelectValue>(config: H0SelectNavigationOptions<Value>) {
    const isOpen = ref(false)
    const activeIndex = ref(-1)

    const collection = useH0CollectionNavigation({ items: config.options, disabled: (option) => config.isOptionDisabled(option) })

    function setInitialActiveIndex(direction: 1 | -1 = 1) {
        const options = toValue(config.options)
        const selectedIndex = options.findIndex((option) => config.isSelected(option) && !config.isOptionDisabled(option))

        activeIndex.value = selectedIndex >= 0 ? selectedIndex : collection.findEnabledIndex(direction === 1 ? 0 : options.length - 1, direction)
    }

    function moveActiveIndex(direction: 1 | -1) {
        activeIndex.value = collection.move(activeIndex.value, direction)
    }

    function setActiveIndex(index: number) {
        const option = toValue(config.options)[index]

        if (option && !config.isOptionDisabled(option)) {
            activeIndex.value = index
        }
    }

    function openSelect(direction: 1 | -1 = 1) {
        if (!toValue(config.interactive) || isOpen.value) {
            return
        }

        setInitialActiveIndex(direction)
        isOpen.value = true
        config.onOpen()
    }

    function closeSelect() {
        if (!isOpen.value) {
            return
        }

        isOpen.value = false
        activeIndex.value = -1
        config.onClose()
    }

    function toggleSelect() {
        if (!toValue(config.interactive)) {
            return
        }

        if (isOpen.value) {
            closeSelect()
        } else {
            openSelect()
        }
    }

    function handleTriggerKeydown(event: KeyboardEvent) {
        const options = toValue(config.options)

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            const direction = event.key === 'ArrowDown' ? 1 : -1

            isOpen.value ? moveActiveIndex(direction) : openSelect(direction)
            return
        }

        if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault()
            const direction = event.key === 'Home' ? 1 : -1

            if (!isOpen.value) {
                openSelect(direction)
            } else {
                activeIndex.value = collection.findEnabledIndex(direction === 1 ? 0 : options.length - 1, direction)
            }

            return
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()

            if (!isOpen.value) {
                openSelect()
            } else if (activeIndex.value >= 0) {
                config.onSelect(options[activeIndex.value])
            }

            return
        }

        if (event.key === 'Escape') {
            event.preventDefault()
            closeSelect()
            return
        }

        if (event.key === 'Tab') {
            closeSelect()
        }
    }

    watch(
        () => toValue(config.options),
        () => {
            if (isOpen.value) {
                setInitialActiveIndex()
            }
        },
        { deep: true }
    )

    return {
        activeIndex,
        closeSelect,
        handleTriggerKeydown,
        isOpen,
        setActiveIndex,
        toggleSelect
    }
}
