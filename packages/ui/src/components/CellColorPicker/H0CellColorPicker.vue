<script setup lang="ts">
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { computed, inject, nextTick, onBeforeUnmount, ref, useAttrs, useId, useTemplateRef, watch } from 'vue'
import { useH0ControllableState } from '../../composables'
import { useH0Locale } from '../../locale'
import { h0OverlayContextKey, toH0OverlayZIndex } from '../_shared/Overlay.context'
import type { H0CellColorPickerDisplay, H0CellColorPickerEmits, H0CellColorPickerSize, H0CellColorPickerSwatchPosition, H0CellColorPickerVariant } from './CellColorPicker.types'

defineOptions({ name: 'H0CellColorPicker', inheritAttrs: false })

const props = withDefaults(
    defineProps<{
        modelValue?: string
        defaultValue?: string
        label?: string
        ariaLabel?: string
        display?: H0CellColorPickerDisplay
        swatchPosition?: H0CellColorPickerSwatchPosition
        variant?: H0CellColorPickerVariant
        size?: H0CellColorPickerSize
        disabled?: boolean
        id?: string
        name?: string
        teleportTo?: string | HTMLElement
        teleportDisabled?: boolean
        rootAttrs?: Record<string, unknown>
        controlAttrs?: Record<string, unknown>
    }>(),
    {
        defaultValue: '#3B82F6',
        label: 'Color',
        ariaLabel: '',
        display: 'standard',
        swatchPosition: 'right',
        variant: 'surface',
        size: 'md',
        disabled: false,
        id: '',
        name: '',
        teleportTo: 'body',
        teleportDisabled: false
    }
)

const emit = defineEmits<H0CellColorPickerEmits>()
const attrs = useAttrs()
const { locale } = useH0Locale()
const overlayContext = inject(h0OverlayContextKey, null)
const generatedId = useId()
const controlId = computed(() => props.id || `h-cell-color-picker-${generatedId}`)
const popoverId = computed(() => `${controlId.value}-popover`)
const resolvedAriaLabel = computed(() => props.ariaLabel || props.label || locale.value.colorPicker.label)
const mergedRootAttrs = computed(() => ({ ...attrs, ...props.rootAttrs }))
const triggerRef = useTemplateRef<HTMLButtonElement>('triggerRef')
const popoverRef = useTemplateRef<HTMLElement>('popoverRef')
const saturationRef = useTemplateRef<HTMLElement>('saturationRef')
const isOpen = ref(false)
const popoverStyle = ref<Record<string, string>>({})
let stopAutoUpdate: (() => void) | undefined

function normalizeHex(value: string | undefined, fallback = '#3B82F6') {
    const raw = value?.trim().replace(/^#/, '') ?? ''
    if (/^[\da-f]{3}$/i.test(raw))
        return `#${[...raw]
            .map((part) => part.repeat(2))
            .join('')
            .toUpperCase()}`
    if (/^[\da-f]{6}$/i.test(raw)) return `#${raw.toUpperCase()}`
    return fallback
}

type Hsv = { h: number; s: number; v: number }

function hexToHsv(hex: string): Hsv {
    const normalized = normalizeHex(hex)
    const r = Number.parseInt(normalized.slice(1, 3), 16) / 255
    const g = Number.parseInt(normalized.slice(3, 5), 16) / 255
    const b = Number.parseInt(normalized.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    let h = 0
    if (delta) {
        if (max === r) h = 60 * (((g - b) / delta) % 6)
        else if (max === g) h = 60 * ((b - r) / delta + 2)
        else h = 60 * ((r - g) / delta + 4)
    }
    return { h: (h + 360) % 360, s: max ? (delta / max) * 100 : 0, v: max * 100 }
}

function hsvToHex({ h, s, v }: Hsv) {
    const saturation = s / 100
    const value = v / 100
    const chroma = value * saturation
    const section = h / 60
    const x = chroma * (1 - Math.abs((section % 2) - 1))
    const [r1, g1, b1] = section < 1 ? [chroma, x, 0] : section < 2 ? [x, chroma, 0] : section < 3 ? [0, chroma, x] : section < 4 ? [0, x, chroma] : section < 5 ? [x, 0, chroma] : [chroma, 0, x]
    const match = value - chroma
    return `#${[r1, g1, b1]
        .map((channel) =>
            Math.round((channel + match) * 255)
                .toString(16)
                .padStart(2, '0')
        )
        .join('')
        .toUpperCase()}`
}

const state = useH0ControllableState({
    modelValue: () => (props.modelValue == null ? undefined : normalizeHex(props.modelValue)),
    defaultValue: () => normalizeHex(props.defaultValue),
    onUpdate: (value) => emit('update:modelValue', value)
})
const currentValue = computed(() => normalizeHex(state.value.value))
const hsv = ref(hexToHsv(currentValue.value))
const hueColor = computed(() => hsvToHex({ h: hsv.value.h, s: 100, v: 100 }))
const swatchStyle = computed(() => ({ backgroundColor: currentValue.value }))
const saturationMarkerStyle = computed(() => ({ left: `${hsv.value.s}%`, top: `${100 - hsv.value.v}%` }))
const hueMarkerStyle = computed(() => ({ left: `${(hsv.value.h / 360) * 100}%` }))
const contextualPopoverStyle = computed(() => (overlayContext && !props.teleportDisabled ? { zIndex: toH0OverlayZIndex(overlayContext.layer.value, overlayContext.offset.value + 1) } : undefined))

watch(currentValue, (value) => {
    hsv.value = hexToHsv(value)
})
watch(isOpen, async (open) => {
    stopAutoUpdate?.()
    stopAutoUpdate = undefined
    if (!open) return
    await nextTick()
    if (triggerRef.value && popoverRef.value) {
        stopAutoUpdate = autoUpdate(triggerRef.value, popoverRef.value, updatePosition)
        await updatePosition()
        saturationRef.value?.focus()
    }
})

function commit(next: Hsv) {
    hsv.value = { h: (next.h + 360) % 360, s: Math.min(100, Math.max(0, next.s)), v: Math.min(100, Math.max(0, next.v)) }
    const value = hsvToHex(hsv.value)
    state.setValue(value)
    emit('change', value)
}

function open() {
    if (props.disabled || isOpen.value) return
    isOpen.value = true
    emit('open')
}

function close(options: { restoreFocus?: boolean } = {}) {
    if (!isOpen.value) return
    isOpen.value = false
    emit('close')
    if (options.restoreFocus !== false) nextTick(() => triggerRef.value?.focus())
}

function toggle() {
    isOpen.value ? close() : open()
}
function focus() {
    triggerRef.value?.focus()
}
function setValue(value: string) {
    commit(hexToHsv(normalizeHex(value, currentValue.value)))
}

async function updatePosition() {
    if (!triggerRef.value || !popoverRef.value) return
    const result = await computePosition(triggerRef.value, popoverRef.value, { placement: 'bottom-start', strategy: 'fixed', middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })] })
    popoverStyle.value = { left: `${result.x}px`, top: `${result.y}px` }
}

function updateSaturation(event: PointerEvent) {
    const rect = saturationRef.value?.getBoundingClientRect()
    if (!rect) return
    commit({ ...hsv.value, s: ((event.clientX - rect.left) / rect.width) * 100, v: 100 - ((event.clientY - rect.top) / rect.height) * 100 })
}

function handleSaturationPointerDown(event: PointerEvent) {
    if (props.disabled) return
    ;(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId)
    updateSaturation(event)
}

function updateHue(event: PointerEvent) {
    const element = event.currentTarget as HTMLElement
    const rect = element.getBoundingClientRect()
    commit({ ...hsv.value, h: ((event.clientX - rect.left) / rect.width) * 360 })
}

function handleHuePointerDown(event: PointerEvent) {
    ;(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId)
    updateHue(event)
}

function handleSaturationKeydown(event: KeyboardEvent) {
    const step = event.shiftKey ? 10 : 1
    if (event.key === 'ArrowLeft') commit({ ...hsv.value, s: hsv.value.s - step })
    else if (event.key === 'ArrowRight') commit({ ...hsv.value, s: hsv.value.s + step })
    else if (event.key === 'ArrowUp') commit({ ...hsv.value, v: hsv.value.v + step })
    else if (event.key === 'ArrowDown') commit({ ...hsv.value, v: hsv.value.v - step })
    else return
    event.preventDefault()
}

function handleHueKeydown(event: KeyboardEvent) {
    const step = event.shiftKey ? 10 : 1
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') commit({ ...hsv.value, h: hsv.value.h - step })
    else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') commit({ ...hsv.value, h: hsv.value.h + step })
    else if (event.key === 'Home') commit({ ...hsv.value, h: 0 })
    else if (event.key === 'End') commit({ ...hsv.value, h: 359 })
    else return
    event.preventDefault()
}

function handleDocumentPointerDown(event: PointerEvent) {
    const target = event.target as Node
    if (isOpen.value && !triggerRef.value?.contains(target) && !popoverRef.value?.contains(target)) close({ restoreFocus: false })
}

function handleDocumentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') close()
}
if (typeof document !== 'undefined') {
    document.addEventListener('pointerdown', handleDocumentPointerDown)
    document.addEventListener('keydown', handleDocumentKeydown)
}
onBeforeUnmount(() => {
    stopAutoUpdate?.()
    if (typeof document !== 'undefined') {
        document.removeEventListener('pointerdown', handleDocumentPointerDown)
        document.removeEventListener('keydown', handleDocumentKeydown)
    }
})

defineExpose({ close, focus, open, setValue })
</script>

<template>
    <span
        v-bind="mergedRootAttrs"
        data-h0n-component="cell-color-picker"
        class="h-cell-color-picker"
        :class="[
            `h-cell-color-picker--${display}`,
            `h-cell-color-picker--${size}`,
            `h-cell-color-picker--${variant}`,
            { 'h-cell-color-picker--open': isOpen, 'h-cell-color-picker--disabled': disabled }
        ]"
    >
        <input v-if="name" type="hidden" :name="name" :value="currentValue" :disabled="disabled" />
        <button
            v-bind="controlAttrs"
            :id="controlId"
            ref="triggerRef"
            class="h-cell-color-picker__trigger"
            type="button"
            :disabled="disabled"
            aria-haspopup="dialog"
            :aria-expanded="isOpen"
            :aria-controls="isOpen ? popoverId : undefined"
            :aria-label="resolvedAriaLabel"
            @click="toggle"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
        >
            <span v-if="display === 'standard'" class="h-cell-color-picker__label"
                ><slot name="label">{{ label }}</slot></span
            >
            <span class="h-cell-color-picker__value" :class="`h-cell-color-picker__value--swatch-${swatchPosition}`">
                <span class="h-cell-color-picker__code">{{ currentValue }}</span>
                <span class="h-cell-color-picker__swatch" :style="swatchStyle" aria-hidden="true" />
            </span>
        </button>

        <Teleport :to="teleportTo" :disabled="teleportDisabled">
            <Transition name="h-cell-color-picker-popover">
                <div
                    v-if="isOpen"
                    :id="popoverId"
                    ref="popoverRef"
                    class="h-cell-color-picker__popover"
                    :style="[popoverStyle, contextualPopoverStyle]"
                    role="dialog"
                    :aria-label="locale.colorPicker.dialog"
                >
                    <div
                        ref="saturationRef"
                        class="h-cell-color-picker__saturation"
                        :style="{ backgroundColor: hueColor }"
                        role="slider"
                        tabindex="0"
                        :aria-label="locale.colorPicker.saturation"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        :aria-valuenow="Math.round(hsv.s)"
                        :aria-valuetext="`${Math.round(hsv.s)}% saturation, ${Math.round(hsv.v)}% brightness`"
                        @keydown="handleSaturationKeydown"
                        @pointerdown.prevent="handleSaturationPointerDown"
                        @pointermove.prevent="$event.buttons ? updateSaturation($event) : undefined"
                    >
                        <span class="h-cell-color-picker__saturation-marker" :style="saturationMarkerStyle" aria-hidden="true" />
                    </div>
                    <div class="h-cell-color-picker__hue-copy">
                        <span>{{ locale.colorPicker.hue }}</span
                        ><span>{{ Math.round(hsv.h) }}°</span>
                    </div>
                    <div
                        class="h-cell-color-picker__hue"
                        role="slider"
                        tabindex="0"
                        :aria-label="locale.colorPicker.hue"
                        aria-valuemin="0"
                        aria-valuemax="359"
                        :aria-valuenow="Math.round(hsv.h)"
                        @keydown="handleHueKeydown"
                        @pointerdown.prevent="handleHuePointerDown"
                        @pointermove.prevent="$event.buttons ? updateHue($event) : undefined"
                    >
                        <span class="h-cell-color-picker__hue-marker" :style="hueMarkerStyle" aria-hidden="true" />
                    </div>
                    <output class="h-cell-color-picker__output"><span class="h-cell-color-picker__swatch" :style="swatchStyle" aria-hidden="true" />{{ currentValue }}</output>
                </div>
            </Transition>
        </Teleport>
    </span>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-cell-color-picker {
    display: inline-flex;
    font-family: var(--h0n-ui-font-family);
    min-width: 0;

    &__trigger {
        align-items: center;
        background: var(--h-color-picker-background, var(--h0n-ui-color-surface));
        border: 1px solid transparent;
        border-radius: var(--h0n-ui-radius-lg);
        color: var(--h0n-ui-color-text);
        cursor: pointer;
        display: flex;
        font: inherit;
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-medium);
        gap: 16px;
        justify-content: space-between;
        min-width: 0;
        padding-inline: 12px;
        transition:
            background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            box-shadow var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
        width: 100%;

        &:focus-visible {
            box-shadow: var(--h0n-ui-focus-ring);
            outline: none;
        }
    }

    &__value {
        align-items: center;
        display: inline-flex;
        flex: 0 0 auto;
        gap: 10px;
    }
    &__value--swatch-left {
        flex-direction: row-reverse;
    }
    &__code {
        color: var(--h0n-ui-color-muted);
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
        font-variant-numeric: tabular-nums;
        inline-size: 7ch;
        letter-spacing: 0;
        white-space: nowrap;
    }
    &__swatch {
        background: Canvas;
        border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
        border-radius: var(--h0n-ui-radius-round);
        display: inline-block;
        flex: 0 0 auto;
        height: 20px;
        width: 20px;
    }
    &__popover {
        background: var(--h0n-ui-color-surface);
        border-radius: var(--h0n-ui-radius-xl);
        box-shadow: 0 18px 48px color-mix(in srgb, black 28%, transparent);
        display: grid;
        gap: 12px;
        padding: 12px;
        position: fixed;
        width: min(264px, calc(100vw - var(--h0n-ui-overlay-inset) * 2));
        z-index: var(--h0n-ui-layer-popover);
    }
    &__saturation {
        background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent);
        border-radius: var(--h0n-ui-radius-lg);
        cursor: crosshair;
        height: 220px;
        position: relative;
        touch-action: none;
    }
    &__saturation:focus-visible,
    &__hue:focus-visible {
        box-shadow: var(--h0n-ui-focus-ring);
        outline: none;
    }
    &__saturation-marker,
    &__hue-marker {
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        pointer-events: none;
        position: absolute;
        transform: translate(-50%, -50%);
    }
    &__saturation-marker {
        height: 16px;
        top: 50%;
        width: 16px;
    }
    &__hue-copy {
        color: var(--h0n-ui-color-text);
        display: flex;
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-medium);
        justify-content: space-between;
    }
    &__hue {
        background: linear-gradient(to right, #f00 0%, #ff0 16.67%, #0f0 33.33%, #0ff 50%, #00f 66.67%, #f0f 83.33%, #f00 100%);
        border-radius: var(--h0n-ui-radius-round);
        cursor: ew-resize;
        height: 18px;
        position: relative;
        touch-action: none;
    }
    &__hue-marker {
        height: 18px;
        top: 50%;
        width: 18px;
    }
    &__output {
        align-items: center;
        color: var(--h0n-ui-color-muted);
        display: flex;
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-variant-numeric: tabular-nums;
        gap: 8px;
    }
    &__output &__swatch {
        height: 16px;
        width: 16px;
    }

    &--secondary {
        --h-color-picker-background: var(--h0n-ui-color-secondary);
    }
    &--surface {
        --h-color-picker-background: var(--h0n-ui-color-surface);
    }
    &--ghost {
        --h-color-picker-background: transparent;
    }
    &--standard {
        flex: 0 1 320px;
        max-width: 100%;
        width: 320px;
    }
    &--minimal &__trigger {
        gap: 8px;
        width: auto;
    }
    &--sm &__trigger {
        @include mixins.h0n-input-control-size('sm');
    }
    &--sm &__swatch {
        height: 16px;
        width: 16px;
    }
    &--md &__trigger {
        @include mixins.h0n-input-control-size('md');
    }
    &--lg &__trigger {
        @include mixins.h0n-input-control-size('lg');
    }
    &--lg &__swatch {
        height: 24px;
        width: 24px;
    }
    &--disabled {
        opacity: var(--h0n-ui-disabled-opacity);
    }

    @media (hover: hover) and (pointer: fine) {
        &__trigger:hover:not(:disabled) {
            background: var(--h0n-ui-color-surface-hover);
        }
    }
    @media (forced-colors: active) {
        &__trigger,
        &__popover,
        &__saturation,
        &__hue,
        &__swatch {
            border: 1px solid CanvasText;
        }
    }
}

.h-cell-color-picker-popover-enter-active,
.h-cell-color-picker-popover-leave-active {
    transition:
        opacity var(--h0n-ui-duration-fast) ease,
        transform var(--h0n-ui-duration-fast) ease;
}
.h-cell-color-picker-popover-enter-from,
.h-cell-color-picker-popover-leave-to {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
}
</style>
