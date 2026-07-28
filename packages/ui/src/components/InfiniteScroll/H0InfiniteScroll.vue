<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import H0Spinner from '../Spinner/H0Spinner.vue'
import H0Description from '../Typography/H0Description.vue'
import type { H0InfiniteScrollRoot } from './InfiniteScroll.types'
import { useH0Locale } from '../../locale'

defineOptions({
    name: 'H0InfiniteScroll'
})

const props = withDefaults(
    defineProps<{
        loading?: boolean
        disabled?: boolean
        hasMore?: boolean
        root?: H0InfiniteScrollRoot
        rootMargin?: string
        threshold?: number
        loadingText?: string
        observeOnMount?: boolean
    }>(),
    {
        loading: false,
        disabled: false,
        hasMore: true,
        root: 'nearest',
        rootMargin: '0px 0px 160px 0px',
        threshold: 0,
        loadingText: '',
        observeOnMount: true
    }
)

const emit = defineEmits<{
    load: []
}>()

const rootRef = useTemplateRef<HTMLElement>('rootRef')
const sentinelRef = useTemplateRef<HTMLElement>('sentinelRef')
const requestLocked = ref(false)
const { locale } = useH0Locale()
const resolvedLoadingText = computed(() => props.loadingText || locale.value.infiniteScroll.loading)
let observer: IntersectionObserver | undefined

const canLoad = computed(() => !props.disabled && !props.loading && props.hasMore)

function findScrollParent(element: HTMLElement) {
    let parent = element.parentElement

    while (parent) {
        const style = window.getComputedStyle(parent)
        const overflowY = style.overflowY

        if (/(auto|scroll|overlay)/.test(overflowY)) {
            return parent
        }

        parent = parent.parentElement
    }

    return null
}

function disconnectObserver() {
    observer?.disconnect()
    observer = undefined
}

function requestLoad() {
    if (!canLoad.value || requestLocked.value) {
        return
    }

    requestLocked.value = true
    emit('load')
}

function createObserver() {
    disconnectObserver()

    if (!props.observeOnMount || typeof IntersectionObserver === 'undefined' || !sentinelRef.value) {
        return
    }

    const root = props.root === 'nearest' && rootRef.value ? findScrollParent(rootRef.value) : null

    observer = new IntersectionObserver(
        (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                requestLoad()
            }
        },
        {
            root,
            rootMargin: props.rootMargin,
            threshold: props.threshold
        }
    )

    observer.observe(sentinelRef.value)
}

watch(
    () => props.loading,
    async (loading, previousLoading) => {
        if (!loading && previousLoading) {
            requestLocked.value = false
            await nextTick()
            createObserver()
        }
    }
)

watch(
    () => [props.disabled, props.hasMore, props.root, props.rootMargin, props.threshold] as const,
    async () => {
        requestLocked.value = false
        await nextTick()
        createObserver()
    }
)

onMounted(async () => {
    await nextTick()
    createObserver()
})

onBeforeUnmount(disconnectObserver)
</script>

<template>
    <div ref="rootRef" data-h0n-component="infinite-scroll" class="h-infinite-scroll" :class="[disabled && 'h-infinite-scroll--disabled', !hasMore && 'h-infinite-scroll--complete']">
        <slot />

        <div ref="sentinelRef" class="h-infinite-scroll__sentinel" aria-hidden="true"></div>

        <div v-if="loading" class="h-infinite-scroll__loading" role="status" :aria-label="resolvedLoadingText">
            <slot name="loading">
                <H0Spinner size="18px" :label="resolvedLoadingText" />
                <H0Description as="span">{{ resolvedLoadingText }}</H0Description>
            </slot>
        </div>

        <div v-else-if="!hasMore" class="h-infinite-scroll__complete">
            <slot name="complete">{{ locale.infiniteScroll.end }}</slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.h-infinite-scroll {
    display: grid;
    font-family: var(--h0n-ui-font-family);
    min-width: 0;

    &__sentinel {
        height: 1px;
        min-height: 1px;
        width: 100%;
    }

    &__loading,
    &__complete {
        align-items: center;
        color: var(--h0n-ui-color-muted);
        display: inline-flex;
        gap: var(--h0n-ui-spacing-sm);
        justify-content: center;
        min-height: 48px;
        padding: var(--h0n-ui-spacing-md);
        width: 100%;
    }

    &__loading span,
    &__complete {
    }

    &--disabled {
        opacity: 0.72;
    }
}
</style>
