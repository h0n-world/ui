<script setup lang="ts" generic="Item extends H0CarouselItem = H0CarouselItem">
import arrowLeftIcon from '@h0nio/icons/alt-arrow-left-stroke'
import arrowRightIcon from '@h0nio/icons/alt-arrow-right-stroke'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { useH0Locale } from '../../locale'
import { toH0CssSize } from '../_shared/utils'
import H0Icon from '../Icon/H0Icon.vue'
import H0Typography from '../Typography/H0Typography.vue'
import type { H0CarouselEmits, H0CarouselItem, H0CarouselProps } from './Carousel.types'

defineOptions({
    name: 'H0Carousel'
})

const props = withDefaults(defineProps<H0CarouselProps<Item>>(), {
    items: () => [],
    defaultValue: 0,
    width: undefined,
    height: undefined,
    fullWidth: true,
    fullHeight: false,
    slideWidth: '100%',
    gap: 12,
    showPagination: false,
    paginationVariant: 'dots',
    showControls: true,
    controlsPosition: 'inside',
    showCounter: false,
    draggable: true,
    keyboard: true,
    effect: 'elastic',
    loop: false,
    autoplay: false,
    autoplayInterval: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    ariaLabel: '',
    hideInactiveSlidesFromAccessibility: true
})

const emit = defineEmits<H0CarouselEmits>()

const viewport = ref<HTMLElement>()
const track = ref<HTMLElement>()
const state = useH0ControllableState({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue, onUpdate: (value) => emit('update:modelValue', value) })
const { locale } = useH0Locale()
const baseOffset = ref(0)
const dragOffset = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragCurrentX = ref(0)
const pointerId = ref<number>()
const isHovering = ref(false)
const hasFocusWithin = ref(false)
const isPlaybackRequested = ref(props.autoplay)
let autoplayTimeout: ReturnType<typeof window.setTimeout> | undefined
let resizeObserver: ResizeObserver | undefined

const slideCount = computed(() => props.items.length)
const currentIndex = computed(() => clampIndex(state.value.value))
const hasMultipleSlides = computed(() => slideCount.value > 1)
const canGoPrevious = computed(() => props.loop || currentIndex.value > 0)
const canGoNext = computed(() => props.loop || currentIndex.value < slideCount.value - 1)
const isAutoplayPaused = computed(() => (props.pauseOnHover && isHovering.value) || (props.pauseOnFocus && hasFocusWithin.value))
const canAutoplay = computed(() => isPlaybackRequested.value && hasMultipleSlides.value && !isAutoplayPaused.value && (props.loop || currentIndex.value < slideCount.value - 1))
const normalizedWidth = computed(() => toH0CssSize(props.width))
const normalizedHeight = computed(() => toH0CssSize(props.height))
const normalizedSlideWidth = computed(() => toH0CssSize(props.slideWidth) ?? '100%')
const normalizedGap = computed(() => toH0CssSize(props.gap) ?? '12px')
const rootStyle = computed(() => ({
    width: normalizedWidth.value ?? (props.fullWidth ? '100%' : undefined),
    height: normalizedHeight.value ?? (props.fullHeight ? '100%' : undefined),
    '--h-carousel-slide-width': normalizedSlideWidth.value,
    '--h-carousel-gap': normalizedGap.value
}))
const trackStyle = computed(() => ({
    transform: `translate3d(${-baseOffset.value + dragOffset.value}px, 0, 0)`
}))

function clampIndex(index: number) {
    if (slideCount.value <= 0) {
        return 0
    }

    return Math.min(Math.max(Math.floor(index || 0), 0), slideCount.value - 1)
}

function getLoopedIndex(index: number) {
    if (slideCount.value <= 0) {
        return 0
    }

    if (index < 0) {
        return props.loop ? slideCount.value - 1 : 0
    }

    if (index >= slideCount.value) {
        return props.loop ? 0 : slideCount.value - 1
    }

    return index
}

function setIndex(index: number) {
    const nextIndex = getLoopedIndex(index)

    if (nextIndex === currentIndex.value) {
        updateBaseOffset()
        return
    }

    state.setValue(nextIndex)
    emit('change', nextIndex)
}

function previous() {
    setIndex(currentIndex.value - 1)
}

function next() {
    setIndex(currentIndex.value + 1)
}

function goTo(index: number) {
    setIndex(index)
}

function updateBaseOffset() {
    nextTick(() => {
        baseOffset.value = getOffsetForIndex(currentIndex.value)
    })
}

function getMaxOffset() {
    if (!viewport.value || !track.value) {
        return 0
    }

    return Math.max(track.value.scrollWidth - viewport.value.clientWidth, 0)
}

function getOffsetForIndex(index: number) {
    const slide = track.value?.children.item(clampIndex(index)) as HTMLElement | null

    return Math.min(slide?.offsetLeft ?? 0, getMaxOffset())
}

function getClampedDragOffset(delta: number) {
    const outsideStart = currentIndex.value === 0 && delta > 0
    const outsideEnd = currentIndex.value === slideCount.value - 1 && delta < 0
    return !props.loop && (outsideStart || outsideEnd) ? delta * 0.28 : delta
}

function handlePointerDown(event: PointerEvent) {
    if (!props.draggable || !hasMultipleSlides.value || event.button > 0) {
        return
    }

    if (isInteractiveElement(event.target)) {
        return
    }

    isDragging.value = true
    pointerId.value = event.pointerId
    dragStartX.value = event.clientX
    dragCurrentX.value = event.clientX
    dragOffset.value = 0
    viewport.value?.setPointerCapture(event.pointerId)
}

function handlePointerMove(event: PointerEvent) {
    if (!isDragging.value || pointerId.value !== event.pointerId) {
        return
    }

    dragCurrentX.value = event.clientX
    const delta = dragCurrentX.value - dragStartX.value

    dragOffset.value = props.effect === 'static' ? 0 : getClampedDragOffset(delta)
}

function handlePointerEnd(event: PointerEvent) {
    if (!isDragging.value || pointerId.value !== event.pointerId) {
        return
    }

    const delta = dragCurrentX.value - dragStartX.value
    const width = viewport.value?.clientWidth ?? 0
    const threshold = Math.min(Math.max(width * 0.08, 24), 56)

    isDragging.value = false
    pointerId.value = undefined
    dragOffset.value = 0
    viewport.value?.releasePointerCapture(event.pointerId)

    if (Math.abs(delta) < threshold) {
        updateBaseOffset()
        return
    }

    setIndex(delta < 0 ? currentIndex.value + 1 : currentIndex.value - 1)
}

function handleKeydown(event: KeyboardEvent) {
    if (!props.keyboard) {
        return
    }

    if (event.key === 'ArrowLeft') {
        event.preventDefault()
        previous()
    }

    if (event.key === 'ArrowRight') {
        event.preventDefault()
        next()
    }
}

function clearAutoplayTimer() {
    if (autoplayTimeout) {
        window.clearTimeout(autoplayTimeout)
        autoplayTimeout = undefined
    }
}

function scheduleAutoplay() {
    if (typeof window === 'undefined') {
        return
    }

    clearAutoplayTimer()

    if (!canAutoplay.value) {
        return
    }

    autoplayTimeout = window.setTimeout(
        () => {
            next()
        },
        Number.isFinite(props.autoplayInterval) ? Math.max(props.autoplayInterval, 250) : 5000
    )
}

function play() {
    isPlaybackRequested.value = true
    scheduleAutoplay()
}

function pause() {
    isPlaybackRequested.value = false
    clearAutoplayTimer()
}

function handleFocusOut(event: FocusEvent) {
    if (!(event.currentTarget instanceof HTMLElement) || !event.currentTarget.contains(event.relatedTarget as Node | null)) {
        hasFocusWithin.value = false
    }
}

function isInteractiveElement(target: EventTarget | null) {
    if (!(target instanceof Element)) {
        return false
    }

    return Boolean(target.closest('a, button, input, select, textarea, label, [role="button"], [role="link"], [contenteditable="true"]'))
}

watch([currentIndex, slideCount, normalizedSlideWidth, normalizedGap], updateBaseOffset)
watch([canAutoplay, currentIndex, () => props.autoplayInterval], scheduleAutoplay)
watch(
    () => props.autoplay,
    (value) => {
        isPlaybackRequested.value = value
    }
)

onMounted(() => {
    updateBaseOffset()

    if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(updateBaseOffset)

        if (viewport.value) {
            resizeObserver.observe(viewport.value)
        }

        if (track.value) {
            resizeObserver.observe(track.value)
        }
    } else {
        window.addEventListener('resize', updateBaseOffset)
    }

    scheduleAutoplay()
})

onUnmounted(() => {
    window.removeEventListener('resize', updateBaseOffset)
    resizeObserver?.disconnect()
    clearAutoplayTimer()
})

defineExpose({
    goTo,
    next,
    pause,
    play,
    previous
})
</script>

<template>
    <section
        data-h0n-component="carousel"
        class="h-carousel"
        :class="`h-carousel--controls-${controlsPosition}`"
        :style="rootStyle"
        role="region"
        aria-roledescription="carousel"
        :aria-label="ariaLabel || locale.carousel.label"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
        @focusin="hasFocusWithin = true"
        @focusout="handleFocusOut"
    >
        <div
            ref="viewport"
            class="h-carousel__viewport"
            :class="[isDragging && 'h-carousel__viewport--dragging']"
            tabindex="0"
            @keydown="handleKeydown"
            @pointerdown="handlePointerDown"
            @pointermove="handlePointerMove"
            @pointerup="handlePointerEnd"
            @pointercancel="handlePointerEnd"
        >
            <div ref="track" class="h-carousel__track" :class="[isDragging && effect === 'elastic' && 'h-carousel__track--dragging']" :style="trackStyle">
                <article
                    v-for="(item, index) in items"
                    :key="index"
                    class="h-carousel__slide"
                    aria-roledescription="slide"
                    :aria-label="locale.carousel.slide(index, slideCount)"
                    :aria-hidden="hideInactiveSlidesFromAccessibility && index !== currentIndex ? 'true' : undefined"
                    :inert="hideInactiveSlidesFromAccessibility && index !== currentIndex ? true : undefined"
                >
                    <slot :item="item" :index="index" :active="index === currentIndex">
                        {{ item }}
                    </slot>
                </article>
            </div>

            <button
                v-if="showControls && controlsPosition === 'inside' && hasMultipleSlides"
                class="h-carousel__control h-carousel__control--previous"
                type="button"
                :aria-label="locale.carousel.previous"
                :disabled="!canGoPrevious"
                @pointerdown.stop
                @click.stop="previous"
            >
                <slot name="previous-control">
                    <H0Icon :icon="arrowLeftIcon" :size="18" />
                </slot>
            </button>
            <button
                v-if="showControls && controlsPosition === 'inside' && hasMultipleSlides"
                class="h-carousel__control h-carousel__control--next"
                type="button"
                :aria-label="locale.carousel.next"
                :disabled="!canGoNext"
                @pointerdown.stop
                @click.stop="next"
            >
                <slot name="next-control">
                    <H0Icon :icon="arrowRightIcon" :size="18" />
                </slot>
            </button>
        </div>

        <div v-if="showControls && controlsPosition === 'outside' && hasMultipleSlides" class="h-carousel__outside-controls" role="group" :aria-label="locale.carousel.controls">
            <button class="h-carousel__control h-carousel__control--outside" type="button" :aria-label="locale.carousel.previous" :disabled="!canGoPrevious" @click="previous">
                <slot name="previous-control">
                    <H0Icon :icon="arrowLeftIcon" :size="18" />
                </slot>
            </button>
            <button class="h-carousel__control h-carousel__control--outside" type="button" :aria-label="locale.carousel.next" :disabled="!canGoNext" @click="next">
                <slot name="next-control">
                    <H0Icon :icon="arrowRightIcon" :size="18" />
                </slot>
            </button>
        </div>

        <div v-if="showPagination && hasMultipleSlides" class="h-carousel__pagination" :class="`h-carousel__pagination--${paginationVariant}`" role="group" :aria-label="locale.carousel.label">
            <button
                v-for="(_, index) in items"
                :key="index"
                class="h-carousel__dot"
                :class="[index === currentIndex && 'h-carousel__dot--active']"
                type="button"
                :aria-current="index === currentIndex ? 'true' : undefined"
                :aria-label="locale.carousel.goTo(index)"
                @pointerdown.stop
                @click.stop="setIndex(index)"
            />
        </div>

        <H0Typography v-if="showCounter && hasMultipleSlides" as="p" class="h-carousel__counter" variant="body-sm" :weight="500">{{ locale.carousel.slide(currentIndex, slideCount) }}</H0Typography>
    </section>
</template>

<style scoped lang="scss">
.h-carousel {
    --h-carousel-motion-duration: var(--h0n-ui-duration-slow);
    --h-carousel-motion-easing: cubic-bezier(0.2, 0.8, 0.2, 1);

    display: grid;
    font-family: var(--h0n-ui-font-family);
    gap: var(--h0n-ui-spacing-md);
    grid-auto-rows: auto;
    grid-template-rows: minmax(0, 1fr);
    min-width: 0;
}

.h-carousel__viewport {
    border-radius: inherit;
    height: 100%;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    position: relative;
    touch-action: pan-y;
    user-select: none;
    width: 100%;

    &:focus-visible {
        box-shadow: var(--h0n-ui-focus-ring);
        outline: none;
    }

    &--dragging {
        cursor: grabbing;
    }
}

.h-carousel__track {
    align-items: stretch;
    display: flex;
    gap: var(--h-carousel-gap);
    height: 100%;
    min-width: 0;
    transition: transform var(--h-carousel-motion-duration) var(--h-carousel-motion-easing);

    &--dragging {
        transition: none;
    }

    &--dragging {
        will-change: transform;
    }
}

.h-carousel__slide {
    flex: 0 0 var(--h-carousel-slide-width);
    height: 100%;
    min-width: 0;
}

.h-carousel__control {
    align-items: center;
    background: color-mix(in srgb, var(--h0n-ui-color-surface) 88%, transparent);
    border: 0;
    border-radius: var(--h0n-ui-radius-round);
    color: var(--h0n-ui-color-text);
    cursor: pointer;
    display: inline-flex;
    height: 36px;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        color var(--h0n-ui-duration-fast) ease,
        opacity var(--h0n-ui-duration-fast) ease;
    width: 36px;
    z-index: 2;

    @media (hover: hover) and (pointer: fine) {
        &:hover:not(:disabled) {
            background: var(--h0n-ui-color-surface);
            color: var(--h0n-ui-color-primary);
        }
    }

    &:focus-visible {
        box-shadow: var(--h0n-ui-focus-ring);
        outline: none;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.4;
    }

    &--previous {
        inset-inline-start: var(--h0n-ui-spacing-md);
    }

    &--next {
        inset-inline-end: var(--h0n-ui-spacing-md);
    }

    &--outside {
        position: static;
        transform: none;
    }
}

.h-carousel__outside-controls {
    align-items: center;
    display: flex;
    gap: 8px;
    justify-content: center;
}

.h-carousel__pagination {
    align-items: center;
    display: flex;
    gap: 8px;
    justify-content: center;
    min-width: 0;
}

.h-carousel__dot {
    background: var(--h0n-ui-color-control-muted);
    border: 0;
    border-radius: var(--h0n-ui-radius-round);
    cursor: pointer;
    height: 8px;
    padding: 0;
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        transform var(--h0n-ui-duration-fast) ease,
        width var(--h0n-ui-duration-fast) ease;
    width: 8px;

    &--active {
        background: var(--h0n-ui-color-primary);
        transform: scale(1.08);
    }

    &:focus-visible {
        box-shadow: var(--h0n-ui-focus-ring);
        outline: none;
    }
}

.h-carousel__pagination--pills .h-carousel__dot--active {
    transform: none;
    width: 22px;
}

.h-carousel__counter {
    color: var(--h0n-ui-color-primary);
    line-height: 1.35;
    margin: 0;
    text-align: center;
}
</style>
