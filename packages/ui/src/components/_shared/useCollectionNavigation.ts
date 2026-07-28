import { toValue, type MaybeRefOrGetter } from 'vue'

export type H0CollectionNavigationOptions<Item> = {
    items: MaybeRefOrGetter<Item[]>
    disabled?: (item: Item, index: number) => boolean
}

export function useH0CollectionNavigation<Item>(options: H0CollectionNavigationOptions<Item>) {
    const isDisabled = (item: Item, index: number) => options.disabled?.(item, index) ?? false

    function findEnabledIndex(start: number, direction: 1 | -1, loop = true) {
        const items = toValue(options.items)
        if (!items.length) return -1

        for (let offset = 0; offset < items.length; offset += 1) {
            const rawIndex = start + offset * direction
            if (!loop && (rawIndex < 0 || rawIndex >= items.length)) return -1
            const index = (rawIndex + items.length) % items.length
            if (!isDisabled(items[index], index)) return index
        }
        return -1
    }

    function move(current: number, direction: 1 | -1, loop = true) {
        const items = toValue(options.items)
        const start = current >= 0 ? current + direction : direction === 1 ? 0 : items.length - 1
        return findEnabledIndex(start, direction, loop)
    }

    function matchTypeahead(query: string, current = -1, getText: (item: Item) => string = (item) => String(item)) {
        const items = toValue(options.items)
        const normalized = query.trim().toLocaleLowerCase()
        if (!normalized || !items.length) return -1
        for (let offset = 1; offset <= items.length; offset += 1) {
            const index = (current + offset + items.length) % items.length
            if (!isDisabled(items[index], index) && getText(items[index]).toLocaleLowerCase().startsWith(normalized)) return index
        }
        return -1
    }

    return { findEnabledIndex, matchTypeahead, move }
}
