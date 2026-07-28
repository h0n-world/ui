import { ref, type MaybeRefOrGetter, toValue } from 'vue'
import type { H0Orientation } from '../types'

export type H0RovingFocusItem = { disabled?: boolean; text?: string }
export type H0RovingFocusOptions = {
    items: MaybeRefOrGetter<H0RovingFocusItem[]>
    orientation?: MaybeRefOrGetter<H0Orientation>
    loop?: MaybeRefOrGetter<boolean>
    direction?: MaybeRefOrGetter<'ltr' | 'rtl'>
    initialIndex?: number
}

export function useH0RovingFocus(options: H0RovingFocusOptions) {
    const activeIndex = ref(options.initialIndex ?? -1)
    let search = ''
    let searchTimer: ReturnType<typeof setTimeout> | undefined

    function enabled(index: number) {
        return !toValue(options.items)[index]?.disabled
    }

    function move(step: number) {
        const items = toValue(options.items)
        if (!items.length) return -1
        let index = activeIndex.value < 0 ? (step > 0 ? -1 : items.length) : activeIndex.value
        for (let count = 0; count < items.length; count += 1) {
            index += step
            if (toValue(options.loop) !== false) index = (index + items.length) % items.length
            else if (index < 0 || index >= items.length) return activeIndex.value
            if (enabled(index)) return (activeIndex.value = index)
        }
        return activeIndex.value
    }

    function first() {
        const index = toValue(options.items).findIndex((item) => !item.disabled)
        if (index >= 0) activeIndex.value = index
        return activeIndex.value
    }

    function last() {
        const items = toValue(options.items)
        for (let index = items.length - 1; index >= 0; index -= 1) if (enabled(index)) return (activeIndex.value = index)
        return activeIndex.value
    }

    function typeahead(key: string) {
        if (key.length !== 1 || /\s/.test(key)) return activeIndex.value
        search += key.toLocaleLowerCase()
        clearTimeout(searchTimer)
        searchTimer = setTimeout(() => (search = ''), 500)
        const items = toValue(options.items)
        const start = Math.max(activeIndex.value + 1, 0)
        const ordered = [...items.slice(start), ...items.slice(0, start)]
        const offset = ordered.findIndex((item) => !item.disabled && item.text?.toLocaleLowerCase().startsWith(search))
        if (offset >= 0) activeIndex.value = (start + offset) % items.length
        return activeIndex.value
    }

    function handleKeydown(event: KeyboardEvent) {
        const orientation = toValue(options.orientation) ?? 'vertical'
        const rtl = toValue(options.direction) === 'rtl'
        const previous = orientation === 'vertical' ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft'
        const next = orientation === 'vertical' ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight'
        if (event.key === previous || event.key === next || event.key === 'Home' || event.key === 'End') event.preventDefault()
        if (event.key === previous) move(-1)
        else if (event.key === next) move(1)
        else if (event.key === 'Home') first()
        else if (event.key === 'End') last()
        else typeahead(event.key)
        return activeIndex.value
    }

    function setActiveIndex(index: number) {
        if (index >= -1 && (index === -1 || enabled(index))) activeIndex.value = index
    }

    function dispose() {
        clearTimeout(searchTimer)
    }

    return { activeIndex, dispose, first, handleKeydown, last, move, setActiveIndex, typeahead }
}
