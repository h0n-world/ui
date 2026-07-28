import { computed, toValue, type MaybeRefOrGetter } from 'vue'

export type H0PaginationOptions = {
    page: MaybeRefOrGetter<number>
    pageSize: MaybeRefOrGetter<number>
    totalItems: MaybeRefOrGetter<number>
}

export function useH0Pagination(options: H0PaginationOptions) {
    const pageSize = computed(() => Math.max(1, Math.trunc(toValue(options.pageSize))))
    const pageCount = computed(() => Math.max(1, Math.ceil(Math.max(0, toValue(options.totalItems)) / pageSize.value)))
    const page = computed(() => Math.min(Math.max(1, Math.trunc(toValue(options.page))), pageCount.value))
    const startIndex = computed(() => (page.value - 1) * pageSize.value)
    const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, Math.max(0, toValue(options.totalItems))))

    function slice<T>(items: readonly T[]) {
        return items.slice(startIndex.value, endIndex.value)
    }

    return { endIndex, page, pageCount, pageSize, slice, startIndex }
}
