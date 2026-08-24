<script lang="ts" setup>
import errorIcon from '@h0nio/icons/danger-circle-stroke'
import { computed, nextTick, onBeforeUnmount, ref, watch, type ImgHTMLAttributes } from 'vue'
import H0Icon from '../Icon/H0Icon.vue'
import H0Skeleton from '../Skeleton/H0Skeleton.vue'
import type { H0ImageFit, H0ImageLoading, H0ImageStatus } from './Image.types'

defineOptions({
    name: 'H0Image'
})

const props = withDefaults(
    defineProps<{
        alt?: string
        aspectRatio?: number | string
        crossorigin?: ImgHTMLAttributes['crossorigin']
        decoding?: ImgHTMLAttributes['decoding']
        draggable?: boolean
        fetchpriority?: 'high' | 'low' | 'auto'
        fit?: H0ImageFit
        height?: number | string
        lazy?: boolean
        loading?: H0ImageLoading
        objectPosition?: string
        radius?: string
        referrerpolicy?: ImgHTMLAttributes['referrerpolicy']
        rootMargin?: string
        showSkeleton?: boolean
        sizes?: string
        skeleton?: boolean
        src?: string | null
        srcset?: string
        threshold?: number
        width?: number | string
    }>(),
    {
        alt: '',
        aspectRatio: '16 / 9',
        crossorigin: undefined,
        decoding: 'async',
        draggable: false,
        fetchpriority: 'auto',
        fit: 'cover',
        height: undefined,
        lazy: true,
        loading: undefined,
        objectPosition: 'center',
        radius: 'var(--h0n-ui-radius-lg)',
        referrerpolicy: undefined,
        rootMargin: '200px',
        showSkeleton: undefined,
        sizes: undefined,
        skeleton: true,
        src: '',
        srcset: undefined,
        threshold: 0,
        width: '100%'
    }
)

const emit = defineEmits<{
    error: [event: Event]
    load: [event: Event]
    'status-change': [status: H0ImageStatus]
}>()

const rootRef = ref<HTMLElement>()
const status = ref<H0ImageStatus>('idle')
const canLoad = ref(false)
let observer: IntersectionObserver | undefined

const normalizedSrc = computed(() => props.src?.trim() ?? '')
const resolvedLoading = computed<H0ImageLoading>(() => props.loading ?? (props.lazy ? 'lazy' : 'eager'))
const shouldLazyLoad = computed(() => resolvedLoading.value === 'lazy')
const shouldShowSkeleton = computed(() => props.showSkeleton ?? props.skeleton)
const imageSrc = computed(() => (canLoad.value ? normalizedSrc.value : undefined))
const isWaiting = computed(() => Boolean(normalizedSrc.value) && status.value !== 'loaded' && status.value !== 'error')
const hasFallback = computed(() => !normalizedSrc.value || status.value === 'error')

const imageSize = computed(() => ({
    width: toCssSize(props.width),
    height: toCssSize(props.height)
}))

const rootStyle = computed(() => ({
    '--h-image-width': imageSize.value.width,
    '--h-image-height': imageSize.value.height,
    '--h-image-radius': props.radius,
    '--h-image-fit': props.fit,
    '--h-image-position': props.objectPosition,
    aspectRatio: props.aspectRatio === undefined ? undefined : String(props.aspectRatio)
}))

function toCssSize(value: number | string | undefined) {
    if (typeof value === 'number') {
        return `${value}px`
    }

    return value
}

function setStatus(nextStatus: H0ImageStatus) {
    if (status.value === nextStatus) {
        return
    }

    status.value = nextStatus
    emit('status-change', nextStatus)
}

function stopObserver() {
    observer?.disconnect()
    observer = undefined
}

function startLoading() {
    if (!normalizedSrc.value) {
        canLoad.value = false
        setStatus('error')
        return
    }

    canLoad.value = true
    setStatus('loading')
    stopObserver()
}

function observeImage() {
    stopObserver()

    if (!shouldLazyLoad.value) {
        startLoading()
        return
    }

    if (typeof IntersectionObserver === 'undefined') {
        startLoading()
        return
    }

    canLoad.value = false
    setStatus('idle')

    nextTick(() => {
        if (!rootRef.value || canLoad.value) {
            return
        }

        observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    startLoading()
                }
            },
            {
                rootMargin: props.rootMargin,
                threshold: props.threshold
            }
        )

        observer.observe(rootRef.value)
    })
}

function handleLoad(event: Event) {
    setStatus('loaded')
    emit('load', event)
}

function handleError(event: Event) {
    setStatus('error')
    emit('error', event)
}

watch(
    () => [normalizedSrc.value, resolvedLoading.value, props.rootMargin, props.threshold] as const,
    () => {
        if (!normalizedSrc.value) {
            stopObserver()
            canLoad.value = false
            setStatus('error')
            return
        }

        observeImage()
    },
    { immediate: true }
)

onBeforeUnmount(stopObserver)
</script>

<template>
    <figure
        ref="rootRef"
        data-h0n-component="image"
        class="h-image"
        :class="[`h-image--${status}`, shouldLazyLoad && 'h-image--lazy', hasFallback && 'h-image--fallback', !height && !aspectRatio && 'h-image--auto-height']"
        :style="rootStyle"
    >
        <slot v-if="shouldShowSkeleton && isWaiting" name="skeleton" :status="status">
            <H0Skeleton class="h-image__skeleton" height="100%" :radius="radius" width="100%" />
        </slot>

        <img
            v-if="imageSrc"
            class="h-image__img"
            :class="status === 'loaded' && 'h-image__img--visible'"
            :src="imageSrc"
            :srcset="srcset"
            :sizes="sizes"
            :alt="alt"
            :width="typeof width === 'number' ? width : undefined"
            :height="typeof height === 'number' ? height : undefined"
            :loading="resolvedLoading"
            :decoding="decoding"
            :fetchpriority="fetchpriority"
            :crossorigin="crossorigin"
            :referrerpolicy="referrerpolicy"
            :draggable="draggable"
            @error="handleError"
            @load="handleLoad"
        />

        <slot v-if="hasFallback" name="fallback" :status="status">
            <div class="h-image__fallback" role="img" :aria-label="alt || 'Image is not available'">
                <H0Icon class="h-image__fallback-icon" :icon="errorIcon" :size="32" aria-hidden="true" />
            </div>
        </slot>
    </figure>
</template>

<style scoped lang="scss">
.h-image {
    background: var(--h0n-ui-color-secondary);
    border-radius: var(--h-image-radius);
    color: var(--h0n-ui-color-muted);
    display: block;
    font-family: var(--h0n-ui-font-family);
    height: var(--h-image-height);
    margin: 0;
    min-height: 1px;
    min-width: 0;
    overflow: hidden;
    position: relative;
    width: var(--h-image-width);

    &--auto-height {
        height: auto;
    }

    &__skeleton,
    &__fallback,
    &__img {
        inset: 0;
        position: absolute;
    }

    &--auto-height &__skeleton,
    &--auto-height &__fallback,
    &--auto-height &__img {
        position: relative;
    }

    &__img {
        display: block;
        height: 100%;
        object-fit: var(--h-image-fit);
        object-position: var(--h-image-position);
        opacity: 0;
        transition: opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
        width: 100%;
    }

    &__img--visible {
        opacity: 1;
    }

    &__skeleton {
        z-index: 1;
    }

    &__fallback {
        align-items: center;
        background: color-mix(in srgb, var(--h0n-ui-color-secondary) 86%, var(--h0n-ui-color-text) 14%);
        display: flex;
        justify-content: center;
        z-index: 2;
    }

    &__fallback-icon {
        opacity: 0.72;
    }
}

@media (prefers-reduced-motion: reduce) {
    .h-image__img {
        transition: none;
    }
}
</style>
