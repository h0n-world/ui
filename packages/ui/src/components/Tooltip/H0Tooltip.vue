<script setup lang="ts">
import { computed, onBeforeUnmount, useId, useTemplateRef } from 'vue'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { useFloatingSurface } from '../_shared/useFloatingSurface'
import { useH0OptionalProp } from '../_shared/utils'
import { useH0LocaleSection } from '../_shared/useLocaleSection'
import { defaultH0TooltipLocale } from '../../locale'
import type { H0TooltipProps } from './Tooltip.types'

defineOptions({ name: 'H0Tooltip' })
const props = withDefaults(defineProps<H0TooltipProps>(), { modelValue: undefined, defaultValue: false, content: '', placement: 'top', openDelay: 500, closeDelay: 100, disabled: false, teleportTo: 'body', teleportDisabled: false, id: '' })
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; open: []; close: [] }>()
const locale = useH0LocaleSection('tooltip', defaultH0TooltipLocale)
const trigger = useTemplateRef<HTMLElement>('trigger')
const floating = useTemplateRef<HTMLElement>('floating')
const generated = useId()
const tooltipId = computed(() => props.id || `h-tooltip-${generated}`)
const state = useH0ControllableState({ modelValue: useH0OptionalProp('modelValue', () => props.modelValue), defaultValue: () => props.defaultValue, onUpdate: (value) => emit('update:modelValue', value) })
const isOpen = state.value
let timer: ReturnType<typeof setTimeout> | undefined
function set(open: boolean, delay = 0) {
    clearTimeout(timer)
    if (props.disabled) return
    timer = setTimeout(() => {
        if (state.value.value === open) return
        state.setValue(open)
        if (open) emit('open')
        else emit('close')
    }, Math.max(0, delay))
}
const open = () => set(true, props.openDelay)
const close = () => set(false, props.closeDelay)
function escape(event: KeyboardEvent) { if (event.key === 'Escape') set(false) }
const reference = computed(() => (trigger.value?.firstElementChild as HTMLElement | null) ?? trigger.value)
const { floatingStyles } = useFloatingSurface({ open: state.value, reference, floating, placement: () => props.placement })
const triggerAttrs = () => ({ 'aria-describedby': state.value.value ? tooltipId.value : undefined, onFocus: open, onBlur: close, onPointerenter: open, onPointerleave: close, onKeydown: escape })
onBeforeUnmount(() => clearTimeout(timer))
</script>
<template><span ref="trigger" data-h0n-component="tooltip" class="h-tooltip-trigger" @pointerenter="open" @pointerleave="close" @focus.capture="open" @blur.capture="close" @keydown="escape"><slot name="trigger" :trigger-attrs="triggerAttrs()" :open="isOpen"><slot /></slot></span><Teleport :to="teleportTo" :disabled="teleportDisabled"><Transition name="h-tooltip"><div v-if="isOpen&&!disabled" :id="tooltipId" ref="floating" data-h0n-component="tooltip-content" class="h-tooltip" role="tooltip" :style="floatingStyles"><slot name="content">{{content||locale.label}}</slot></div></Transition></Teleport></template>
<style scoped>.h-tooltip-trigger{display:inline-flex}.h-tooltip{background:var(--h0n-ui-color-text);border-radius:var(--h0n-ui-radius-md);color:var(--h0n-ui-color-surface);font-family:var(--h0n-ui-font-family);font-size:var(--h0n-ui-typography-body-sm-size);max-inline-size:28ch;padding:var(--h0n-ui-spacing-xs) var(--h0n-ui-spacing-sm);pointer-events:none;z-index:var(--h0n-ui-layer-popover)}.h-tooltip-enter-active,.h-tooltip-leave-active{transition:opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),transform var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard)}.h-tooltip-enter-from,.h-tooltip-leave-to{opacity:0;transform:scale(.96)}</style>
