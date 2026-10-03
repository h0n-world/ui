<script setup lang="ts">
import { cloneVNode, Comment, computed, defineComponent, Fragment, inject, nextTick, onBeforeUnmount, Text, useId, useSlots, useTemplateRef, watch, type VNode } from 'vue'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { h0OverlayContextKey, toH0OverlayZIndex } from '../_shared/Overlay.context'
import { useDismissableLayer } from '../_shared/useDismissableLayer'
import { useFloatingSurface } from '../_shared/useFloatingSurface'
import { toH0CssSize, useH0OptionalProp } from '../_shared/utils'
import type { H0DropdownExpose, H0DropdownProps } from './Dropdown.types'

defineOptions({ name: 'H0Dropdown' })
const props = withDefaults(defineProps<H0DropdownProps>(), {
    modelValue: undefined,
    defaultValue: false,
    disabled: false,
    placement: 'bottom-start',
    offset: 6,
    minWidth: 160,
    maxWidth: 360,
    minHeight: 0,
    maxHeight: 320,
    teleportTo: 'body',
    teleportDisabled: false,
    id: '',
    ariaLabel: ''
})
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; open: []; close: [] }>()
const slots = useSlots()
const generatedId = useId()
const panelId = computed(() => props.id || `h-dropdown-${generatedId}`)
const panelRole = computed(() => (typeof props.contentAttrs?.role === 'string' ? props.contentAttrs.role : 'dialog'))
const triggerId = `${generatedId}-trigger`
const root = useTemplateRef<HTMLElement>('root')
const panel = useTemplateRef<HTMLElement>('panel')
const reference = computed(() => root.value?.firstElementChild as HTMLElement | null)
const state = useH0ControllableState({
    modelValue: useH0OptionalProp('modelValue', () => props.modelValue),
    defaultValue: () => props.defaultValue,
    onUpdate: (value) => emit('update:modelValue', value)
})
const isOpen = computed(() => Boolean(state.value.value && !props.disabled))
const overlay = inject(h0OverlayContextKey, null)
const { floatingStyles, update } = useFloatingSurface({
    open: isOpen,
    reference,
    floating: panel,
    placement: () => props.placement,
    offset: () => props.offset,
    availableHeightProperty: '--dropdown-available-height'
})
const dimensions = computed(() => ({
    '--dropdown-min-width': toH0CssSize(props.minWidth),
    '--dropdown-max-width': toH0CssSize(props.maxWidth),
    '--dropdown-min-height': toH0CssSize(props.minHeight),
    '--dropdown-max-height': toH0CssSize(props.maxHeight),
    ...(overlay && !props.teleportDisabled ? { zIndex: toH0OverlayZIndex(overlay.layer.value, overlay.offset.value + 2) } : {})
}))
let restoreOnClose = true
let focusWasInside = false
let focusBeforeOpen: HTMLElement | null = null

function setOpen(value: boolean, restore = true) {
    if (value && props.disabled) return
    if (state.value.value === value) return
    restoreOnClose = restore
    state.setValue(value)
}
const open = () => setOpen(true)
const close = () => setOpen(false)
const toggle = () => setOpen(!isOpen.value)
defineExpose<H0DropdownExpose>({ open, close, toggle })

// Follow aria-controls links for interactive child surfaces teleported elsewhere.
function inside(target: Node | null, surface = panel.value, visited = new Set<HTMLElement>()): boolean {
    if (!surface || !target || visited.has(surface)) return false
    if (surface.contains(target)) return true
    visited.add(surface)
    return Array.from(surface.querySelectorAll<HTMLElement>('[aria-controls]')).some((control) =>
        (control.getAttribute('aria-controls') || '').split(/\s+/).some((id) => inside(target, surface.ownerDocument.getElementById(id), visited))
    )
}
const layers = computed(() => [root.value, panel.value])
useDismissableLayer({
    open: isOpen,
    layers,
    closeOnEscape: false,
    isInside: (target) => inside(target),
    onDismiss: () => setOpen(false, false),
    onEscape: (event) => {
        const target = event.target as Node
        if (event.defaultPrevented || (!inside(target) && !root.value?.contains(target) && target !== root.value?.ownerDocument.body)) return
        const nestedOpen = Array.from(panel.value?.querySelectorAll<HTMLElement>('[aria-expanded="true"][aria-controls]') ?? []).some(
            (control) => control.contains(target) || (control.getAttribute('aria-controls') || '').split(/\s+/).some((id) => control.ownerDocument.getElementById(id)?.contains(target))
        )
        // Let the child consume Escape while marking it handled for parent overlays.
        event.preventDefault()
        if (nestedOpen) return
        event.stopPropagation()
        close()
    }
})

const focusableSelector = 'button, a[href], input, select, textarea, [tabindex], [contenteditable="true"]'
function focusable(element: HTMLElement) {
    const style = element.ownerDocument.defaultView?.getComputedStyle(element)
    return (
        element.tabIndex >= 0 &&
        !element.matches(':disabled, [aria-disabled="true"]') &&
        !element.closest('[hidden], [inert], [aria-hidden="true"], fieldset:disabled') &&
        style?.display !== 'none' &&
        style?.visibility !== 'hidden'
    )
}
function onFocusIn(event: FocusEvent) {
    const target = event.target as Node
    if (!root.value?.contains(target) && !inside(target)) setOpen(false, false)
}
// Capture before Vue detaches the ref: a leaving Transition can retain the
// focused DOM node after panel.value has already become null.
watch(
    isOpen,
    (value) => {
        if (!value) focusWasInside = inside(root.value?.ownerDocument.activeElement ?? null)
    },
    { flush: 'sync' }
)
watch(
    () => isOpen.value && Boolean(root.value),
    async (value, previous) => {
        const doc = root.value?.ownerDocument
        if (!doc) return
        if (value) {
            focusBeforeOpen = doc.activeElement as HTMLElement | null
            doc.addEventListener('focusin', onFocusIn)
            emit('open')
            await nextTick()
            if (!isOpen.value || !panel.value) return
            const first = Array.from(panel.value.querySelectorAll<HTMLElement>(focusableSelector)).find(focusable)
            ;(first ?? panel.value).focus({ preventScroll: true })
        } else {
            doc.removeEventListener('focusin', onFocusIn)
            if (previous) emit('close')
            const active = doc.activeElement
            const shouldRestore = restoreOnClose && (focusWasInside || inside(active) || active === doc.body)
            focusWasInside = false
            restoreOnClose = true
            if (shouldRestore)
                await nextTick().then(() => {
                    if (!isOpen.value) (reference.value ?? focusBeforeOpen)?.focus({ preventScroll: true })
                })
        }
    },
    { flush: 'post', immediate: true }
)
watch(
    () => [props.placement, props.offset, props.minWidth, props.maxWidth, props.minHeight, props.maxHeight],
    () => {
        if (isOpen.value) nextTick(update)
    }
)
watch(
    () => props.disabled,
    (value) => {
        if (value) setOpen(false)
    }
)

function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) return
    if (event.key === 'Escape' && isOpen.value) {
        event.preventDefault()
        event.stopPropagation()
        close()
    }
}
function onPanelKeydown(event: KeyboardEvent) {
    onKeydown(event)
    if (event.defaultPrevented || event.key !== 'Tab') return
    const items = Array.from(panel.value?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter(focusable)
    const active = panel.value?.ownerDocument.activeElement
    if (event.shiftKey ? active !== items[0] && active !== panel.value : active !== items.at(-1) && active !== panel.value) return
    event.preventDefault()
    event.stopPropagation()
    const doc = root.value?.ownerDocument
    const trigger = reference.value
    setOpen(false, false)
    if (event.shiftKey) trigger?.focus({ preventScroll: true })
    else if (doc && trigger) {
        const outside = Array.from(doc.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => focusable(element) && !inside(element))
        const index = outside.indexOf(trigger)
        ;(outside[index + 1] ?? trigger).focus({ preventScroll: true })
    }
}
function flatten(nodes: VNode[]): VNode[] {
    return nodes.flatMap((node) => (node.type === Fragment ? flatten(node.children as VNode[]) : node.type === Comment || (node.type === Text && !String(node.children).trim()) ? [] : [node]))
}
function triggerLabelId() {
    return String(flatten(slots.default?.({ open: isOpen.value, close, toggle }) ?? [])[0]?.props?.id ?? triggerId)
}
const Trigger = defineComponent({
    name: 'H0DropdownTrigger',
    setup: () => () => {
        const children = flatten(slots.default?.({ open: isOpen.value, close, toggle }) ?? [])
        if (children.length !== 1 || children[0].type === Text) {
            console.warn('H0Dropdown requires exactly one element or component in its default slot.')
            return null
        }
        const child = children[0]
        const native = typeof child.type === 'string'
        const needsButtonRole = !native || (!['button', 'input', 'select', 'textarea', 'summary'].includes(child.type as string) && !(child.type === 'a' && child.props?.href))
        return cloneVNode(child, {
            id: child.props?.id ?? triggerId,
            'aria-haspopup': props.contentAttrs?.role === 'menu' ? 'menu' : 'dialog',
            'aria-expanded': isOpen.value,
            'aria-controls': isOpen.value ? panelId.value : undefined,
            ...(needsButtonRole ? { role: child.props?.role ?? 'button', tabindex: child.props?.tabindex ?? 0 } : {}),
            ...(props.disabled ? { 'aria-disabled': 'true' } : {}),
            onClick: (event: MouseEvent) => {
                if (!event.defaultPrevented && !(event.currentTarget as HTMLElement).matches(':disabled, [aria-disabled="true"]')) toggle()
            },
            onKeydown: (event: KeyboardEvent) => {
                onKeydown(event)
                if (event.defaultPrevented || props.disabled) return
                const nativeActivation = (event.currentTarget as HTMLElement).matches('button, input, select, textarea, a[href], summary')
                if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    open()
                } else if (!nativeActivation && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault()
                    toggle()
                }
            }
        })
    }
})
onBeforeUnmount(() => {
    const doc = root.value?.ownerDocument
    doc?.removeEventListener('focusin', onFocusIn)
    if (isOpen.value && inside(doc?.activeElement ?? null)) reference.value?.focus({ preventScroll: true })
})
</script>

<template>
    <span ref="root" data-h0n-component="dropdown" class="h-dropdown-trigger"><Trigger /></span>
    <Teleport :to="teleportTo" :disabled="teleportDisabled">
        <Transition name="h-dropdown">
            <div
                v-if="isOpen"
                v-bind="contentAttrs"
                :id="panelId"
                ref="panel"
                data-h0n-component="dropdown-content"
                class="h-dropdown"
                :role="panelRole"
                :aria-label="ariaLabel || undefined"
                :aria-labelledby="ariaLabel ? undefined : triggerLabelId()"
                tabindex="-1"
                :style="[floatingStyles, dimensions]"
                @keydown="onPanelKeydown"
            >
                <slot name="content" :open="isOpen" :close="close" :toggle="toggle" />
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.h-dropdown-trigger {
    display: inline-flex;
    vertical-align: middle;
}
.h-dropdown {
    box-sizing: border-box;
    background: var(--h0n-ui-color-surface);
    color: var(--h0n-ui-color-text);
    border-radius: var(--h0n-ui-radius-lg);
    box-shadow: var(--h0n-ui-shadow-lg);
    font-family: var(--h0n-ui-font-family);
    font-size: var(--h0n-ui-typography-body-size);
    padding: var(--h0n-ui-spacing-sm);
    min-width: min(var(--dropdown-min-width), var(--dropdown-max-width), calc(100vw - 16px));
    max-width: min(var(--dropdown-max-width), calc(100vw - 16px));
    min-height: min(var(--dropdown-min-height), var(--dropdown-max-height), var(--dropdown-available-height, calc(100dvh - 16px)));
    max-height: min(var(--dropdown-max-height), var(--dropdown-available-height, calc(100dvh - 16px)));
    overflow: auto;
    overscroll-behavior: contain;
    z-index: var(--h0n-ui-layer-popover);
}
.h-dropdown:focus-visible {
    outline: 2px solid var(--h0n-ui-color-primary);
    outline-offset: 2px;
}
.h-dropdown-enter-active,
.h-dropdown-leave-active {
    transition:
        opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
        transform var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
}
.h-dropdown-enter-from,
.h-dropdown-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
@media (forced-colors: active) {
    .h-dropdown {
        border-color: CanvasText;
    }
}
</style>
